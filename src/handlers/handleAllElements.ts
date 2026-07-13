export function handleAllElements() {
  const elements = document.querySelectorAll("*") as NodeListOf<HTMLElement>;
  const excludedTags = [
    "IMG",
    "INPUT",
    "BR",
    "HR",
    "META",
    "LINK",
    "SCRIPT",
    "IFRAME",
    "TD",
    "TH",
    "A",
  ];

  const textsToRemove = [
    "ponto",
    "Bons estudos!",
    "Bons estudos",
    "BONS ESTUDOS E ATÉ A PRÓXIMA!",
    "BONS ESTUDOS E ATÉ A PRÓXIMA",
    "Bom trabalho!",
    "Bom trabalho",
    "Bom trabalho e até a próxima!",
    "Bom trabalho e até a próxima",
  ];

  elements.forEach((element) => {
    // Remove selected texts
    textsToRemove.forEach(
      (text) =>
        element.textContent.trim().toLowerCase() ===
          text.trim().toLowerCase() && element.remove(),
    );

    if (
      !excludedTags.includes(element.tagName) &&
      element.textContent === "" &&
      element.children.length === 0
    ) {
      // Remove empty tags
      element.remove();
    }

    if (
      element.parentNode &&
      !excludedTags.includes(element.tagName) &&
      element.textContent.trim() === "" &&
      element.children.length === 0
    ) {
      // Replace with space
      const textNode = document.createTextNode(" ");
      element.parentNode.replaceChild(textNode, element);
    }
  });

  // Emphasize section title
  const contentTitles = document.querySelectorAll(
    ".content-text > .titulo-secao",
  ) as NodeListOf<HTMLTableElement>;

  contentTitles.forEach((title) => title.classList.add("titulo"));
}
