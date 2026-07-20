import { contentHost } from "../core";

// Ao converter o documento, os títulos (Adicionados dentro do documento) saem do padrão de estilo da trilha
// Sendo títulos de seção (apresentacao, etapas, unidades) diferentes dos títulos de trilhas

export function normalizeDocHeadings() {
  const headings = contentHost.querySelectorAll(
    "h1, h2, h3",
  ) as NodeListOf<HTMLElement>;

  const existingHeadings = [...headings].filter((heading) => heading !== null);

  existingHeadings.forEach((headingElement) => {
    const newTitleElement = document.createElement("p") as HTMLParagraphElement;
    newTitleElement.classList.add("titulo-secao");
    newTitleElement.innerHTML = headingElement.innerHTML;
    headingElement.replaceWith(newTitleElement);
  });
}
