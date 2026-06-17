import { docToHTML } from "./docToHTML";
import { handleAllElements } from "./handleAllElements";
import { handleHyperLinks } from "./handleHyperLink";
import { handleLocalFile } from "./handleLocalFile";
import { handleTable } from "./handleTable";
import { handleVimeoVideo } from "./handleVimeoVideo";
import { handleYTVideo } from "./handleYTVideo";
import { contentHost, templateFile } from "./main";

export async function processHTML() {
  const sections: HTMLElement[] = [];

  await docToHTML(contentHost, templateFile);

  // Change table sections to div sections
  const contentTables = contentHost.querySelectorAll(
    ".content-text > table",
  ) as NodeListOf<HTMLTableElement>;

  [...contentTables]
    .filter((_, index) => index > 0)
    .forEach((table) => {
      let content = table.querySelector(
        "tbody > tr:nth-child(2) > td",
      ) as HTMLElement;

      const section = document.createElement("div");
      section.className = "contentWrapper";

      while (content.firstChild) {
        section.appendChild(content.firstChild);
      }

      content.replaceWith(section);

      sections.push(section);
    });

  handleLocalFile();

  handleVimeoVideo();

  handleYTVideo();

  handleHyperLinks();

  handleTable();

  const contentWrapper = document.querySelectorAll(
    ".contentWrapper",
  ) as NodeListOf<HTMLElement>;

  contentWrapper.forEach((section) => {
    const headings = {
      h1: section.querySelector("h1") as HTMLHeadingElement,
      h2: section.querySelector("h2") as HTMLHeadingElement,
      h3: section.querySelector("h3") as HTMLHeadingElement,
    };
    const existingHeadings = Object.entries(headings);

    existingHeadings
      .filter(([_, element]) => element !== null)
      .forEach(([tagName, element]) => {
        const replacedHTML = element.outerHTML
          .replace(`<${tagName}>`, "<p class='titulo-secao'>")
          .replace(`</${tagName}>`, "</p>");

        element.outerHTML = replacedHTML;
      });

    const tables = section.querySelectorAll(
      "table",
    ) as NodeListOf<HTMLTableElement>;

    const fakeTables = [...tables].filter((table) => table.rows.length <= 3);

    fakeTables.forEach((table) => {
      const isNested =
        table.querySelector(".dica-leitura") || table.querySelector(".video");

      if (isNested) {
        const replacedHTML = table.outerHTML
          .replace(/^<table>/g, "")
          .replace(/<\/table>$/g, "");
        table.outerHTML = replacedHTML;
      }

      const replacedHTML = table.outerHTML
        .replace(/^<table>/g, "<div class='outline-colorido'>")
        .replace(/<\/table>$/g, "</div>");
      table.outerHTML = replacedHTML;
    });
  });

  const pTags = document.querySelectorAll(
    "p",
  ) as NodeListOf<HTMLParagraphElement>;

  const titles = [...pTags].filter(
    (pTag) =>
      pTag.querySelector("strong") &&
      pTag.textContent.length < 70 &&
      !pTag.hasAttribute("class"),
  );

  titles.forEach((title) => {
    title.className = "titulo-secao";
  });

  handleAllElements();

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

  document.querySelectorAll("p").forEach((element) => {
    if (element.textContent === "ponto") element.remove();
  });
}
