import { docToHTML } from "./docToHTML";
import { processHTML } from "./processHTML";
import { dataURLtoFile, fileToDataURL } from "../utils";
import { docPattern } from "../definitions";
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

  // Check size (5MB)
  const sizeLimit = 5 * 1000;
  // const isLimitReached = file.size > sizeLimit;

  try {
    if (!file.name.match(docPattern)) throw new Error("Extension not valid.");

    // Store file as binary data and file name
    const dataURL = await fileToDataURL(file); // Convert to base64

    console.log("file.size", file.size);
    console.log("sizeLimit", sizeLimit);

    localStorage.setItem("fileDataURL", dataURL);
    localStorage.setItem("fileName", file.name);

    // if (!isLimitReached) {
    //   localStorage.setItem("fileDataURL", dataURL);
    //   localStorage.setItem("fileName", file.name);
    // } else {
    //   console.warn(
    //     `O Documento ultrassou o limite de tamanho estabelecido e não será salvo no navegador. (${sizeLimit / 1000}MB)`,
    //   );
    // }

    await docToHTML(file); // Convert doc file to HTML
    await processHTML(); // Edited HTML

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
