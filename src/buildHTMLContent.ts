import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";
import { getMetaData } from "./getMetadata";

export async function buildHTMLContent(zip: any, fileNames: string[]) {
  const sections = document.querySelectorAll(
    ".contentWrapper",
  ) as NodeListOf<HTMLElement>;

  try {
    if (sections.length !== fileNames.length) {
      throw new Error(
        `Number of sections (${sections.length}) doesn't match number of files (${fileNames.length}).`,
      );
    }

    for (let i = 0; i < sections.length; i++) {
      const filename = fileNames[i];
      const section = sections[i];
      const { titleName } = getMetaData();

      // Fetch .html from /public
      const response = await fetch(
        `/placeholder_4etapas/${filename.trim()}.html`,
      );
      if (!response) throw new Error("Failed to fetch.");

      // Get HTML as string and add title name
      const contentString = (await response.text()).replaceAll(
        "templateCode",
        titleName,
      );

      // Converter string to HTML
      const parser = new DOMParser();
      const contentHTML = parser.parseFromString(contentString, "text/html");

      const contentText = contentHTML.querySelector(
        ".content-text",
      ) as HTMLDivElement;

      section.childNodes.forEach((childNode) => {
        const clonedNode = childNode.cloneNode(true); // Clone all child nodes from each section
        contentText.appendChild(clonedNode); // Append all child node into the 'contentText' div
      });

      const HTMLString = contentHTML.querySelector("html")?.outerHTML as string; // Whole content string

      // Prettier formatted
      const HTMLFormatted = await prettier.format(HTMLString, {
        parser: "html",
        tabWidth: 2,
        plugins: [parserHtml],
      });

      // Add to zip config with the corresponding filename
      zip.file(`${filename}.html`, HTMLFormatted);
    }
  } catch (error) {
    console.error("Failed to build HTML content: ", error);
  }
}
