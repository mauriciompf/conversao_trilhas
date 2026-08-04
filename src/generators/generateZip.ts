import JSZip from "jszip";
import { formatFileName, getMetaData } from "../parsers";
import { contentHost } from "../core";
import { buildHTMLContent } from "../transformers";
import {
  BASE64_PATTERN,
  TYPE_CONFIGS,
  UNICA_PATTERN,
  type TypeConfigs,
} from "../definitions";

export async function generateZip() {
  const contentTitles = contentHost.querySelectorAll(
    ".content-text > .titulo-secao",
  ) as NodeListOf<HTMLTableElement>;

  const contentImgs = contentHost.querySelectorAll(
    ".img",
  ) as NodeListOf<HTMLImageElement>;

  const { titleName, code } = getMetaData();
  const sectionTitles: string[] = [];
  const zip = new JSZip();

  contentTitles.forEach((title) => sectionTitles.push(title.innerText));

  try {
    contentImgs.forEach((img, index) => {
      const base64DataUri = img.src;

      const extension = base64DataUri.match(BASE64_PATTERN)?.[1] || "png";
      const cleanBase64 = base64DataUri.replace(BASE64_PATTERN, "");

      zip.file(`imgs/image_${index + 1}.${extension}`, cleanBase64, {
        base64: true,
      });
    });

    zip.folder("materiais");

    const responseCss = await fetch("./global.css");
    if (!responseCss) throw new Error("Failed to fetch './global.css'.");
    const cssText = await responseCss.text();
    zip.file("css/style.css", cssText);

    const firstTitleSection = sectionTitles[0];
    const lastTitleSection = sectionTitles.at(-1) || "";

    const matchingType: TypeConfigs | undefined = TYPE_CONFIGS.find(
      ({ pattern }) => {
        const matchingFirstAndLastSection =
          pattern.first.test(firstTitleSection) &&
          pattern.last.test(lastTitleSection);

        return matchingFirstAndLastSection;
      },
    );

    if (!firstTitleSection || UNICA_PATTERN.test(firstTitleSection)) {
      await buildHTMLContent(
        zip,
        ["inicio", "objetos", "unidade1", "videos"],
        "placeholder_etapa_unica",
      );
    } else if (matchingType) {
      await buildHTMLContent(zip, matchingType.sections, matchingType.id_name);
    } else {
      throw new Error("Content structure not recognized.");
    }

    const generateZipAsBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(generateZipAsBlob);
    const link = document.createElement("a") as HTMLAnchorElement;
    link.href = url;
    link.download = `${formatFileName(code + titleName, "short")}.zip`;
    link.click();

    link.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to generate zip: ", error);
  }
}
