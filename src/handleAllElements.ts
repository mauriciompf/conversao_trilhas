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
  ];
  const textsToRemove = [
    "ponto",
    "Bons estudos!",
    "Bons estudos",
    "BONS ESTUDOS E ATÉ A PRÓXIMA!",
  ];

  elements.forEach((element) => {
    // Remove selected texts
    textsToRemove.forEach(
      (text) =>
        element.textContent.trim().toLowerCase() ===
          text.trim().toLowerCase() && element.remove(),
    );

    // ! Remove empty tags
    if (
      !excludedTags.includes(element.tagName) &&
      element.textContent.trim() === "" &&
      element.children.length === 0
    ) {
      element.remove();
    }
  });
}
