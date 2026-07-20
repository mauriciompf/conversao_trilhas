import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";
import { getMetaData } from "../parsers";
import { BASE64_PATTERN, SECTION_NAME_DEFAULT_LIST } from "../definitions";

export async function buildHTMLContent(
  zip: any,
  sectionNames: string[],
  id_name: string,
) {
  const titles = document.querySelectorAll(
    ".contentWrapper",
  ) as NodeListOf<HTMLElement>;

  // Seção: templates direcionados como arquivos a serem gerados
  // Título: etapa/unidade do conteúdo

  let globalImageCounter = 0;

  const sectionNameContent = sectionNames.filter(
    (section) => !SECTION_NAME_DEFAULT_LIST.includes(section),
  );

  const sectionNameDefaultArray = sectionNames.filter((section) =>
    SECTION_NAME_DEFAULT_LIST.includes(section),
  );

  // Ajusta e separa cada seção (etapa/unidade) em um arquivo separado
  // Cada arquivo tem seu template próprio a partir do modelo estabelecido
  // Pode-se modificar seu conteúdo pós baixado
  try {
    for (const [index, sectionName] of sectionNameContent.entries()) {
      if (titles.length !== sectionNameContent.length) {
        throw new Error(
          `Number of titles (${titles.length}) doesn't match number of sections (${sectionNameContent.length}), id_name: ${id_name}.`,
        );
      }

      const { titleName } = getMetaData();

      const response = await fetch(`/${id_name}/${sectionName.trim()}.html`);
      if (!response) throw new Error("Failed to fetch.");

      const contentString = (await response.text()).replaceAll(
        "templateCode",
        titleName,
      );

      const parser = new DOMParser();
      const contentHTML = parser.parseFromString(contentString, "text/html");

      const contentText = contentHTML.querySelector(
        ".content-text",
      ) as HTMLDivElement;

      contentText.innerHTML = "";

      const sectionElem = titles[index];

      sectionElem.childNodes.forEach((childNode) => {
        const clonedNode = childNode.cloneNode(true);
        contentText.appendChild(clonedNode);
      });

      const contentImgs = contentHTML.querySelectorAll(
        ".img",
      ) as NodeListOf<HTMLImageElement>;

      contentImgs.forEach((img) => {
        const base64DataUri = img.src;
        const extension = base64DataUri.match(BASE64_PATTERN)?.[1] || "png";

        globalImageCounter++;
        img.src = `./imgs/image_${globalImageCounter}.${extension}`;
      });

      const HTMLString = contentHTML
        .querySelector("html")
        ?.outerHTML.replaceAll(
          new RegExp(" ?lazyloaded ?| ?lazyloading ?", "gi"),
          "lazyload",
        ) as string;

      const HTMLFormatted = await prettier.format(HTMLString, {
        parser: "html",
        tabWidth: 2,
        plugins: [parserHtml],
      });

      zip.file(`${sectionName}.html`, HTMLFormatted);
    }

    // ETAPA ÚNICA -> Cópia sem a separação entre arquivos
    for (const sectionName of sectionNameDefaultArray) {
      const { titleName } = getMetaData();

      const response = await fetch(`/${id_name}/${sectionName.trim()}.html`);
      if (!response) throw new Error("Failed to fetch.");

      const contentString = (await response.text()).replaceAll(
        "templateCode",
        titleName,
      );
      const parser = new DOMParser();
      const contentHTML = parser.parseFromString(contentString, "text/html");

      const contentImgs = contentHTML.querySelectorAll(
        ".img",
      ) as NodeListOf<HTMLImageElement>;

      contentImgs.forEach((img) => {
        const base64DataUri = img.src;
        const extension = base64DataUri.match(BASE64_PATTERN)?.[1] || "png";

        globalImageCounter++;
        img.src = `./imgs/image_${globalImageCounter}.${extension}`;
      });

      const HTMLString = contentHTML
        .querySelector("html")
        ?.outerHTML.replaceAll(
          new RegExp(" ?lazyloaded ?| ?lazyloading ?", "gi"),
          "lazyload",
        ) as string;

      const HTMLFormatted = await prettier.format(HTMLString, {
        parser: "html",
        tabWidth: 2,
        plugins: [parserHtml],
      });

      zip.file(`${sectionName}.html`, HTMLFormatted);
    }
  } catch (error) {
    console.error("Failed to build HTML content: ", error);
  }
}
