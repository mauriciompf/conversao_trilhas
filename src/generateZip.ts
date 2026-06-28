import JSZip from "jszip";
import { buildHTMLContent } from "./buildHTMLContent";
import { getMetaData } from "./getMetadata";
import { fileNameConverter } from "./fileNameConverter";
import { contentHost } from "./main";

export async function generateZip() {
  const zip = new JSZip();
  const { titleName, code } = getMetaData();
  const sectionTitles: string[] = [];
  const contentTitles = contentHost.querySelectorAll(
    ".content-text > .titulo-secao",
  ) as NodeListOf<HTMLTableElement>;

  contentTitles.forEach((title) => sectionTitles.push(title.innerText)); // Get all section titles from the content host

  try {
    zip.folder("materiais"); // Add folder /materiais

    // Fetch /style.css
    const responseCss = await fetch("/placeholder_4etapas/css/style.css"); // ! Adjust path (remove '/placeholder_4etapas' if needed) to maintain a default style.css for all zip files
    if (!responseCss) throw new Error("Failed to fetch 'style.css'");
    const cssText = await responseCss.text();
    zip.file("css/style.css", cssText); // Add folder /css and file style.css

    const firstTitleSection = sectionTitles[0];
    const lastTitleSection = sectionTitles.at(-1) || "";

    // ** GET FIRST AND LAST TITLE SECTIONS TO DETERMINE CONTENT STRUCTURE **

    // Etapa Única
    if (/[UÚ]NICA/i.test(firstTitleSection)) {
      await buildHTMLContent(
        zip,
        ["inicio", "objetos", "unidade1", "videos"],
        "placeholder_etapa_unica",
      );
    } else if (
      // Apresentação + 3 etapas
      /APRESENTA[CÇ][AÃ]O/i.test(firstTitleSection) &&
      /ETAPA (3|iii)/i.test(lastTitleSection)
    ) {
      await buildHTMLContent(
        zip,
        ["inicio", "apresentacao", "etapa_i", "etapa_ii", "etapa_iii"],
        "placeholder_3etapas",
      );
    } else if (
      // Apresentação + 4 etapas
      /APRESENTA[CÇ][AÃ]O/i.test(firstTitleSection) &&
      /ETAPA (4|iv)/i.test(lastTitleSection)
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
    } else if (
      // Etapas sem apresentação
      /ETAPA (1|i)/i.test(firstTitleSection) &&
      /ETAPA (4|iv)/i.test(lastTitleSection)
    ) {
      await buildHTMLContent(
        zip,
        ["inicio", "etapa_i", "etapa_ii", "etapa_iii", "etapa_iv"],
        "placeholder_etapas",
      );
    } else {
      throw new Error("Content structure not recognized.");
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
