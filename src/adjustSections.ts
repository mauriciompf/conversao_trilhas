import { contentHost } from "./main";

export function adjustSections() {
  const contentTables = contentHost.querySelectorAll(
    ".content-text > table",
  ) as NodeListOf<HTMLTableElement>;

  // Change table element to div element
  [...contentTables]
    .filter((_, index) => index > 0) // Skip 'metadata' table
    .forEach((table) => {
      //  tr:nth-child(2) => Get only table row content, skip title (apresentacao, etapas...)
      const content = table.querySelector(
        "tbody > tr:nth-child(2) > td",
      ) as HTMLElement;

      const section = document.createElement("div");
      section.className = "contentWrapper";

      while (content.firstChild) section.appendChild(content.firstChild); // Append all content into the section div
      content.replaceWith(section); // Replace 'td' element to 'div' element - section 'contentWrapper'
    });
}
