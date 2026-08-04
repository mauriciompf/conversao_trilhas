import { docToHTML } from "./docToHTML";
import { processHTML } from "./processHTML";
import { dataURLtoFile, fileToDataURL } from "../utils";
import { DOC_PATTERN } from "../definitions";
import { generateZip } from "../generators";

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

const downloadBtn = document.querySelector(".downloadBtn") as HTMLButtonElement;

window.addEventListener("load", async () => {
  const storedDataURL = localStorage.getItem("fileDataURL");
  const storedFileName = localStorage.getItem("fileName");

  if (storedDataURL && storedFileName) {
    const file = dataURLtoFile(storedDataURL, storedFileName);
    await docToHTML(file);
    await processHTML();

    removeFileBtn.classList.remove("opacity-50");
    downloadBtn.classList.remove("opacity-50");
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

    removeFileBtn.classList.remove("opacity-50");
    downloadBtn.classList.remove("opacity-50");
  } catch (err) {
    console.error("Failed to store or process file,", err);
  }
});

removeFileBtn.addEventListener("click", () => {
  localStorage.removeItem("fileDataURL");
  localStorage.removeItem("fileName");

  fileInput.value = "";
  contentHost.innerHTML = "";

  removeFileBtn.classList.add("opacity-50");
  downloadBtn.classList.remove("opacity-50");
});

downloadBtn.addEventListener("click", () => {
  if (fileInput.value) generateZip();
});
