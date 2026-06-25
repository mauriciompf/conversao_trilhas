import JSZip from "jszip";
import { buildHTMLContent } from "./buildHTMLContent";
import { getMetaData } from "./getMetadata";
import { fileNameConverter } from "./fileNameConverter";
import { contentHost } from "./main";

export async function generateZip() {
  const titleSections: string[] = [];

  const contentTables = contentHost.querySelectorAll(
    ".content-text > table",
  ) as NodeListOf<HTMLTableElement>;

  [...contentTables]
    .filter((_, index) => index > 0) // Skip 'metadata' table
    .forEach((table) => {
      const content = table.querySelector(
        "tbody > tr:nth-child(1) > td",
      ) as HTMLElement;

      titleSections.push(content.innerText);
    });

  const zip = new JSZip();

  const { titleName, code } = getMetaData();

  try {
    // adjustIframes();

    zip.folder("materiais"); // materiais/...

    const responseCss = await fetch("/placeholder_4etapas/css/style.css");
    if (!responseCss) throw new Error("Failed to fetch 'style.css'");
    const cssText = await responseCss.text();
    zip.file("css/style.css", cssText); // css/...

    // Apres + etapas 3
    if (
      /APRESENTA[CÇ][AÃ]O/i.test(titleSections[0]) &&
      /ETAPA (3|iii)/i.test(titleSections[titleSections.length - 1])
    ) {
      await buildHTMLContent(
        zip,
        ["inicio", "apresentacao", "etapa_i", "etapa_ii", "etapa_iii"],
        "placeholder_3etapas",
      );
    }

    // Apres + etapas 4
    if (
      /APRESENTA[CÇ][AÃ]O/i.test(titleSections[0]) &&
      /ETAPA (4|iv)/i.test(titleSections[titleSections.length - 1])
    ) {
      await buildHTMLContent(
        zip,
        [
          "inicio",
          "apresentacao",
          "etapa_i",
          "etapa_ii",
          "etapa_iii",
          "etapa_iv",
        ],
        "placeholder_4etapas",
      );
    }

    // Apres + unidade 3
    // if (
    //   /APRESENTA[CÇ][AÃ]O/i.test(titleSections[0]) &&
    //   /UNIDADE (3|iii)/i.test(titleSections[titleSections.length - 1])
    // ) {
    //   await buildHTMLContent(
    //     zip,
    //     ["inicio", "apresentacao", "unidade1", "unidade2", "unidade3"],
    //     "placeholder_3unidades",
    //   );
    // }

    // !Apres + unidade 4

    // Etapa 1...etapa 4
    if (
      /ETAPA (1|i)/i.test(titleSections[0]) &&
      /ETAPA (4|iv)/i.test(titleSections[titleSections.length - 1])
    ) {
      await buildHTMLContent(
        zip,
        ["inicio", "etapa_i", "etapa_ii", "etapa_iii", "etapa_iv"],
        "placeholder_etapas",
      );
    }

    // Etapa Única
    if (/[UÚ]NICA/i.test(titleSections[0])) {
      await buildHTMLContent(
        zip,
        ["inicio", "objetos", "unidade1", "videos"],
        "placeholder_etapa_unica",
      );
    }

    const generateZipAsBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(generateZipAsBlob);
    const link = document.createElement("a") as HTMLAnchorElement;
    link.href = url;
    link.download = `${fileNameConverter(code + titleName, "short")}.zip`;
    link.click();

    link.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to generate zip: ", error);
  }
}
