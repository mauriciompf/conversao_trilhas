export function addTypeRowToMetadataTable() {
  const contentTitles = document.querySelectorAll(
    ".content-text > .titulo-secao",
  ) as NodeListOf<HTMLTableElement>;

  // Add 'TYPE' in metada table
  const typeRow = document.createElement("tr") as HTMLElement;
  const typeTitle = document.createElement("td") as HTMLElement;
  typeTitle.textContent = "Modelo";
  typeTitle.style.fontWeight = "700";

  const typeName = document.createElement("td") as HTMLElement;
  typeName.style.fontWeight = "700";

  const titleSections: string[] = [];

  contentTitles.forEach((title) => titleSections.push(title.innerText));

  if (
    /APRESENTA[CÇ][AÃ]O/i.test(titleSections[0]) &&
    /ETAPA (4|iv)/i.test(titleSections[titleSections.length - 1])
  ) {
    typeName.textContent = "Apresentação + 4 etapas";
  }

  if (
    /APRESENTA[CÇ][AÃ]O/i.test(titleSections[0]) &&
    /ETAPA (3|iii)/i.test(titleSections[titleSections.length - 1])
  ) {
    typeName.textContent = "Apresentação + 3 etapas";
  }

  if (
    /ETAPA (1|i)/i.test(titleSections[0]) &&
    /ETAPA (4|iv)/i.test(titleSections[titleSections.length - 1])
  ) {
    typeName.textContent = "4 Etapas (sem apresentação)";
  }

  if (/[UÚ]NICA/i.test(titleSections[0])) {
    typeName.textContent = "Etapa Única";
  }

  typeRow?.append(typeTitle, typeName);

  document
    .querySelectorAll("table")[0]
    .querySelector("tbody")
    ?.appendChild(typeRow);
}
