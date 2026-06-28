export function replaceTableTags(table: HTMLTableElement) {
  const content = table.querySelector(
    "tbody > tr:nth-child(2) > td",
  ) as HTMLElement; // Get only table data content, skip section titles (apresentacao, etapas...)

  const section = document.createElement("div");
  section.className = "contentWrapper";

  // Move all content from the 'td' element to the new 'div' element
  while (content.firstChild) section.appendChild(content.firstChild);
  content.replaceWith(section);

  // Remove the outer 'table' tags from the new table structure
  table.outerHTML = table.outerHTML
    .replaceAll(/^<table>/g, "")
    .replaceAll(/<\/table>$/g, "");
}
