import { docToHTML } from "./docToHTML";
import { handleLocalFile } from "./handleLocalFile";
import { contentHost, templateFile } from "./main";

export async function processHTML() {
  const sections: HTMLElement[] = [];

  await docToHTML(contentHost, templateFile);

  // Change table sections to div sections
  const contentTables = contentHost.querySelectorAll(
    ".content-text > table",
  ) as NodeListOf<HTMLTableElement>;

  contentTables.forEach((table) => {
    let content = table.querySelector(
      "tbody > tr:nth-child(2) > td",
    ) as HTMLElement;

    const section = document.createElement("div");

    while (content.firstChild) {
      section.appendChild(content.firstChild);
    }

    content.replaceWith(section);

    sections.push(section);
  });

  handleLocalFile();

  const dicaLeituraDivs = document.querySelectorAll(
    ".dica-leitura",
  ) as NodeListOf<HTMLDivElement>;

  dicaLeituraDivs.forEach((div) => {
    const previousDicaLeituraDiv = div.previousElementSibling as HTMLDivElement;

    if (
      previousDicaLeituraDiv &&
      previousDicaLeituraDiv.classList.contains("dica-leitura")
    ) {
      const wrapper = document.createElement("div") as HTMLDivElement;
      wrapper.className = "dica-leitura";
      const img = document.createElement("img") as HTMLImageElement;
      img.src = "../img/ico/dica_d_outline.svg";
      img.alt = "Dica de Leitura";

      div.removeChild(div.querySelector("img")!);
      previousDicaLeituraDiv.removeChild(
        previousDicaLeituraDiv.querySelector("img")!,
      );

      previousDicaLeituraDiv.parentNode?.insertBefore(
        wrapper,
        previousDicaLeituraDiv,
      );

      wrapper.append(img, previousDicaLeituraDiv, div);

      previousDicaLeituraDiv.replaceWith(...previousDicaLeituraDiv.childNodes);
      div.replaceWith(...div.childNodes);
    }
  });
}
