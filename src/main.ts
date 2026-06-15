import { handleLocalFile } from "./handleLocalFile";
import { processHTML } from "./processHTML";

export const contentHost = document.querySelector(
  ".content-text",
) as HTMLDivElement;

export const templateFile =
  "/docs/26 Estágio Supervisionado Educação Infantil (162478).docx";

await processHTML();

handleLocalFile();
