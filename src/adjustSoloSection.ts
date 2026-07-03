export function adjustSoloSection() {
  const firstParagraph = document.querySelector("p") as HTMLParagraphElement;

  if (firstParagraph && !firstParagraph.hasAttribute("class")) {
    firstParagraph.remove();

    const tbody = document.querySelector(
      "table:nth-of-type(2) > tbody",
    ) as HTMLElement;

    const tr = document.createElement("tr") as HTMLElement;
    const td = document.createElement("td") as HTMLElement;
    const p = document.createElement("p") as HTMLElement;
    p.classList.add("titulo-secao");

    p.textContent = firstParagraph?.textContent;
    td.appendChild(p);
    tr.appendChild(td);
    tbody.prepend(tr);
  }
}
