import { contentHost } from "./main";

export function adjustSections() {
  const sections: HTMLElement[] = [];

  const contentTables = contentHost.querySelectorAll(
    ".content-text > table",
  ) as NodeListOf<HTMLTableElement>;

  // Change table sections to div sections
  [...contentTables]
    .filter((_, index) => index > 0)
    .forEach((table) => {
      let content = table.querySelector(
        "tbody > tr:nth-child(2) > td",
      ) as HTMLElement;

      const section = document.createElement("div");
      section.className = "contentWrapper";

      while (content.firstChild) {
        section.appendChild(content.firstChild);
      }

      content.replaceWith(section);

      sections.push(section);
    });
}
