import { STRONG_ELEMENT_PATTERN } from "../definitions";

// A conversão não identifica se tal paragrafo é ou não um titulo de trilha (titulo-secao)
// Nem todo paragrafo pode ser um título de trilha

export function applyTitleClassToParagraphs() {
  const pTags = document.querySelectorAll(
    "p",
  ) as NodeListOf<HTMLParagraphElement>;

  const TITLE_TEXT_MAX_LENGTH = 70;

  const titles = [...pTags].filter((pTag) => {
    const pTagInnerHTML = pTag.innerHTML.trim();
    const pTagTextContent = pTag.textContent.trim();
    const isStrongTitle = STRONG_ELEMENT_PATTERN.test(pTagInnerHTML);
    const isTextLimitLength = pTagTextContent.length <= TITLE_TEXT_MAX_LENGTH;
    const hasClassAttribute = pTag.hasAttribute("class");
    const hasBrElement = pTag.querySelector("br");

    const titleConditions =
      isStrongTitle && isTextLimitLength && !hasClassAttribute && !hasBrElement;

    return titleConditions;
  });

  titles.forEach((title) => (title.className = "titulo-secao"));
}
