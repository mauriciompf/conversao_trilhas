import { processHTML } from "./processHTML";

export const contentHost = document.querySelector(
  ".content-text",
) as HTMLDivElement;

export const templateFile =
  "/docs/26 Estágio Supervisionado Educação Infantil (162478).docx";

await processHTML();

const popUp = document.querySelector(".retorno") as HTMLElement;
if (popUp) {
  document.querySelector(".retorno")!.remove();
}
