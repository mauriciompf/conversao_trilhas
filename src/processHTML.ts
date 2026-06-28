import { adjustComments } from "./adjustComments";
import { adjustSections } from "./adjustSections";
import { assemblyLocalFiles } from "./assemblyLocalFiles";
import { handleAllElements } from "./handleAllElements";
import { handleFakeTables } from "./handleFakeTables";
import { handleHyperLinks } from "./handleHyperLinks";
import { handleLocalFile } from "./handleLocalFile";
import { handleTables } from "./handleTables";
import { handleTitles } from "./handleTitles";
import { handleVimeoVideo } from "./handleVimeoVideo";
import { handleYTVideo } from "./handleYTVideo";
import { saveAs } from "./saveAs";

export async function processHTML() {
  saveAs(); // Ctrl + s => save as .zip (wrap content)

  handleTitles();
  adjustComments();
  handleTables();
  adjustSections();
  handleLocalFile();
  handleVimeoVideo();
  handleYTVideo();
  handleHyperLinks();
  handleAllElements();
  handleFakeTables();
  assemblyLocalFiles();

  const contentTitles = document.querySelectorAll(
    ".content-text > .titulo-secao",
  ) as NodeListOf<HTMLTableElement>;

  // Add 'TYPE' in metada table
  const typeRow = document.createElement("tr") as HTMLElement;
  const typeTitle = document.createElement("td") as HTMLElement;
  typeTitle.textContent = "Modelo";
  const typeName = document.createElement("td") as HTMLElement;
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
    typeName.textContent = "4 Etapas";
  }

  if (/[UÚ]NICA/i.test(titleSections[0])) {
    typeName.textContent = "Etapa Única";
  }

  typeRow?.append(typeTitle, typeName);

  document
    .querySelectorAll("table")[0]
    .querySelector("tbody")
    ?.appendChild(typeRow);

  contentTitles.forEach((title) => {
    title.classList.add("titulo");
  });
}
