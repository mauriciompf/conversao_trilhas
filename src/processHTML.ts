import { docToHTML } from "./docToHTML";
import { contentHost, templateFile } from "./main";

export async function processHTML() {
  const sections: HTMLElement[] = [];

  await docToHTML(contentHost, templateFile);

  // Change table sections to div sections
  const contentTables = contentHost.querySelectorAll(
    ".content-text > table",
  ) as NodeListOf<HTMLTableElement>;

  contentTables.forEach((table) => {
    let content = table.querySelector(
      "tbody > tr:nth-child(2) > td",
    ) as HTMLElement;

    const section = document.createElement("div");

    while (content.firstChild) {
      section.appendChild(content.firstChild);
    }

    content.replaceWith(section);

    sections.push(section);
  });
}
