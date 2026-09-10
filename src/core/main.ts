import { docToHTML } from "./docToHTML";
import { processHTML } from "./processHTML";
import { dataURLtoFile, fileToDataURL } from "../utils";
import { DOC_PATTERN } from "../definitions";
import { generateZip } from "../generators";
import { formatFileName, getMetaData } from "../parsers";

// 'contentHost' => Tudo que está dentro conteúdo do host
// Removendo os elementos de configuração => /Adicionar Arquivo/Excluir Arquivo Atual/Etc...

export const contentHost = document.querySelector(
  ".content-text",
) as HTMLDivElement;

const fileInput = document.querySelector(
  "input[type='file']",
) as HTMLInputElement;

const removeFileBtn = document.querySelector(
  ".removeFileBtn",
) as HTMLButtonElement;

const inputDataElem = document.querySelector(".inputData") as HTMLFormElement;

const configElemWrapper = document.querySelector(".config") as HTMLElement;

const downloadBtn = document.querySelector(".downloadBtn") as HTMLButtonElement;

window.addEventListener("load", async () => {
  const storedDataURL = localStorage.getItem("fileDataURL");
  const storedFileName = localStorage.getItem("fileName");

  if (storedDataURL && storedFileName) {
    const file = dataURLtoFile(storedDataURL, storedFileName);
    await docToHTML(file);
    await processHTML();

    if (removeFileBtn && downloadBtn) {
      configElemWrapper.classList.remove("grid", "h-screen", "items-center");
      inputDataElem.classList.remove("hidden");
      removeFileBtn.classList.remove("opacity-50");
      downloadBtn.classList.remove("opacity-50");

      removeFileBtn.classList.remove("cursor-not-allowed");
      downloadBtn.classList.remove("cursor-not-allowed");
      removeFileBtn.classList.add("cursor-pointer");
      downloadBtn.classList.add("cursor-pointer");

      removeFileBtn.disabled = false;
      downloadBtn.disabled = false;
    }
  }
});

fileInput.addEventListener("change", async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  try {
    if (!file.name.match(DOC_PATTERN)) throw new Error("Extension not valid.");

    const dataURL = await fileToDataURL(file);

    localStorage.setItem("fileDataURL", dataURL);
    localStorage.setItem("fileName", file.name);

    await docToHTML(file);
    await processHTML();

    if (removeFileBtn && downloadBtn) {
      configElemWrapper.classList.remove("grid", "h-screen", "items-center");
      inputDataElem.classList.remove("hidden");
      removeFileBtn.classList.remove("opacity-50");
      downloadBtn.classList.remove("opacity-50");

      removeFileBtn.classList.remove("cursor-not-allowed");
      downloadBtn.classList.remove("cursor-not-allowed");
      removeFileBtn.classList.add("cursor-pointer");
      downloadBtn.classList.add("cursor-pointer");

      removeFileBtn.disabled = false;
      downloadBtn.disabled = false;
    }
  } catch (err) {
    console.error("Failed to store or process file,", err);
  }
});

if (removeFileBtn && downloadBtn) {
  removeFileBtn.addEventListener("click", () => {
    localStorage.removeItem("name");

    configElemWrapper.classList.add("grid", "h-screen", "items-center");
    localStorage.removeItem("fileDataURL");
    localStorage.removeItem("fileName");

    fileInput.value = "";
    contentHost.innerHTML = "";

    inputDataElem.classList.add("hidden");

    removeFileBtn.classList.add("opacity-50");
    downloadBtn.classList.add("opacity-50");
    removeFileBtn.classList.add("cursor-not-allowed");
    downloadBtn.classList.add("cursor-not-allowed");
    removeFileBtn.classList.remove("cursor-pointer");
    downloadBtn.classList.remove("cursor-pointer");
    removeFileBtn.disabled = true;
    downloadBtn.disabled = true;
  });

  downloadBtn.addEventListener("click", () => {
    if (fileInput.value) generateZip();
  });
}
