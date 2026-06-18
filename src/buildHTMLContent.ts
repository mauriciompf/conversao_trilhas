import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";
import { getMetaData } from "./getMetadata";

export async function buildHTMLContent(zip: any, fileNames: string[]) {
  const sections = document.querySelectorAll(
    ".contentWrapper",
  ) as NodeListOf<HTMLElement>;

  if (sections.length !== fileNames.length) {
    throw new Error(
      `Number of sections (${sections.length}) doesn't match number of files (${fileNames.length})`,
    );
  }

  for (let i = 0; i < Math.min(sections.length, fileNames.length); i++) {
    const filename = fileNames[i];
    const section = sections[i];
    const { titleName } = getMetaData();

    // Fetch .html
    const response = await fetch(`/${filename}.html`);
    if (!response) throw new Error("Failed to fetch");

    const contentString = (await response.text()).replaceAll(
      "templateCode",
      titleName,
    );

    // Converter to HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentString, "text/html");

    // Add contentWrapper (section) to html template
    const contentWrapper = doc.querySelector(".content-text") as HTMLDivElement;

    // Process iframes in this specific section
    const iframeEmbeds = section.querySelectorAll(
      "iframe",
    ) as NodeListOf<HTMLIFrameElement>;

    iframeEmbeds.forEach((iframe) => {
      if (
        iframe.className === " lazyloading" ||
        iframe.className === " lazyloaded"
      ) {
        iframe.className = "lazyload";
      }
    });

    // Clone and append all child nodes from this section
    section.childNodes.forEach((childNode) => {
      const clonedNode = childNode.cloneNode(true);
      contentWrapper.appendChild(clonedNode);
    });

    const HTMLString = doc.querySelector("html")?.outerHTML as string; // Whole content

    // Prettier formatted
    const HTMLFormatted = await prettier.format(HTMLString, {
      parser: "html",
      tabWidth: 2,
      plugins: [parserHtml],
    });

    // Add to zip config with the corresponding filename
    zip.file(`${filename}.html`, HTMLFormatted);
  }
}
