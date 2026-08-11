import { EXCLUDED_TAGS, TEXTS_TO_REMOVE } from "../definitions";

export function handleAllElements() {
  const elements = document.querySelectorAll("*") as NodeListOf<HTMLElement>;

  const contentTitles = document.querySelectorAll(
    ".content-text > .titulo-secao",
  ) as NodeListOf<HTMLTableElement>;

  contentTitles.forEach((title) => title.classList.add("titulo")); // Emphasize section title

  elements.forEach((element) => {
    TEXTS_TO_REMOVE.forEach(
      (text) =>
        element.textContent.trim().toLowerCase() ===
          text.trim().toLowerCase() && element.remove(), // Remove selected texts
    );

    if (
      !EXCLUDED_TAGS.includes(element.tagName) &&
      element.textContent === "" &&
      element.children.length === 0
    ) {
      element.remove(); // Remove empty tags
    }

    if (
      element.parentNode &&
      !EXCLUDED_TAGS.includes(element.tagName) &&
      element.textContent.trim() === "" &&
      element.children.length === 0
    ) {
      const textNode = document.createTextNode(" ");
      element.parentNode.replaceChild(textNode, element); // Replace with space
    }

    // Títulos atrás do outro

    if (
      element.tagName === "P" &&
      element.classList.contains("titulo") &&
      element.previousElementSibling?.tagName === "P" &&
      element.previousElementSibling.classList.contains("titulo")
    ) {
      element.previousElementSibling.remove();
    }
  });
}
