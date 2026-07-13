import { TYPE_CONFIGS, UNICA_PATTERN } from "../definitions";

export function handleMetaDataTable() {
  const contentTitles = document.querySelectorAll(
    ".content-text > .titulo-secao",
  ) as NodeListOf<HTMLTableElement>;
  const titleNameSections: string[] = [];

  const typeRow = document.createElement("tr") as HTMLElement;
  const typeHeading = document.createElement("td") as HTMLElement;
  typeHeading.textContent = "Modelo";
  typeHeading.style.fontWeight = "700";

  const typeName = document.createElement("td") as HTMLElement;
  typeName.style.fontWeight = "700";

  contentTitles.forEach((title) => {
    const titleText = title.textContent;
    titleNameSections.push(titleText);
  });

  const firstTitleName = titleNameSections[0];
  const lastTitleName = titleNameSections[titleNameSections.length - 1];

  const matchingType = TYPE_CONFIGS.find(({ pattern }) => {
    const matchingFirstAndLastSection =
      pattern.first.test(firstTitleName) && pattern.last.test(lastTitleName);

    return matchingFirstAndLastSection;
  });

  if (matchingType) {
    typeName.textContent = matchingType.label;
  } else if (UNICA_PATTERN.test(firstTitleName)) {
    typeName.textContent = "Etapa Única";
  }

  typeRow.append(typeHeading, typeName);

  const firstTable = document.querySelectorAll("table")[0] as HTMLTableElement;
  const tbody = firstTable.querySelector("tbody") as HTMLElement;
  tbody.appendChild(typeRow);
}
