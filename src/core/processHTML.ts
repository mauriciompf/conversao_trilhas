import { contentHost } from ".";
import { CODE_PATTERN } from "../definitions";
import { saveAs } from "../generators";
import {
  handleTitles,
  handleTables,
  handleSections,
  handleLocalFile,
  handleHyperLinks,
  handleAllElements,
  handleFakeTables,
  handleImages,
  handleMetaDataTable,
  handleStamps,
  handleTexts,
} from "../handlers";
import { handleEmptySections } from "../handlers/handleEmptySections";
import { handleVideos } from "../handlers/handleVideos";
import { formatFileName, getMetaData } from "../parsers";
import { assemblyLocalFiles } from "../parsers/assemblyLocalFiles";
import { convertSingleItemOlToUl } from "../parsers/convertSingleItemOlToUl";
// import { tableToJson } from "../transformers";

export async function processHTML() {
  saveAs();

  handleEmptySections();
  handleTitles();
  handleTables();
  handleSections();
  handleLocalFile();
  handleVideos();
  handleHyperLinks();
  handleAllElements();
  handleFakeTables();
  handleImages();
  assemblyLocalFiles();
  handleMetaDataTable();
  handleStamps();
  convertSingleItemOlToUl();
  handleTexts();

  /*
    ! AVISO
    - ADICIONAR LOCALSTORAGE NO NOME DA PASTA (SALVAR O NOME DA PASTA)
  */

  const gotoTop = document.querySelector(".gotoTop") as HTMLButtonElement;

  window.addEventListener("scroll", () => {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      gotoTop.parentElement!.classList.remove("hidden");
    } else {
      gotoTop.parentElement!.classList.add("hidden");
    }
  });

  gotoTop.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });

  const modeloInput = document.querySelector("#modelo") as HTMLInputElement;
  const codDisciplinaInput = document.querySelector(
    "#codDisciplina",
  ) as HTMLInputElement;
  const nameDisciplinaInput = document.querySelector(
    "#nameDisciplina",
  ) as HTMLInputElement;
  const folderNameInput = document.querySelector(
    "#folderName",
  ) as HTMLInputElement;

  const { code, titleName, type } = getMetaData();

  modeloInput.value = type; // MODELO
  codDisciplinaInput.value = code; // CÓDIGO
  nameDisciplinaInput.value = titleName; // NOME DA DISCIPLINA

  const folderFull = localStorage.getItem("fileName")!;
  const folderCode = folderFull.trim()?.match(CODE_PATTERN)![0];
  const folderName = folderFull.replace(CODE_PATTERN, "");
  folderNameInput.value = formatFileName(folderCode + folderName, "short"); // NOME DA PASTA
}
