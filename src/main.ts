import { processHTML } from "./processHTML";

export const contentHost = document.querySelector(
  ".content-text",
) as HTMLDivElement;

export const templateFile =
  "/docs/Prática Pedagógica Interdisciplinar Conceitos da Geografia (178524).docx";

const fileInput = document.querySelector(
  "input[type='file']",
) as HTMLInputElement;

fileInput.addEventListener("change", () => {
  if (fileInput.value !== "") processHTML();
});
