import { docToHTML } from "./docToHTML";
import { processHTML } from "./processHTML";
import { saveAs } from "./saveAs";

export const contentHost = document.querySelector(
  ".content-text",
) as HTMLDivElement;

export const templateFile =
  "/docs/Prática Pedagógica Interdisciplinar Conceitos da Geografia (178524).docx";

const fileInput = document.querySelector(
  "input[type='file']",
) as HTMLInputElement;

fileInput.addEventListener("change", async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0]; // Get file input

  if (file) {
    await docToHTML(file); // Convert doc file to HTML
    await processHTML(); // Edited HTML
    await saveAs(); // Ctrl + s => save as .zip (wrap content)
  }
});
