import { createDicaWrapper } from "../parsers/createDicaWrapper";
import { VIMEO_PATTERN } from "../definitions";

export function handleLocalFile() {
  const supComments = document.querySelectorAll(
    "sup.file",
  ) as NodeListOf<HTMLElement>;
  const commentTextsElem = document.querySelectorAll(
    "dd",
  ) as NodeListOf<HTMLElement>;

  if (commentTextsElem.length !== supComments.length) {
    throw new Error(
      `documentError: Number of comments (${commentTextsElem.length}) doesn't match number of anchor elements (${supComments.length}).`,
    );
  }

  supComments.forEach((supComment, index) => {
    const fileNameWrapElem = supComment.closest("P") as HTMLElement;
    const commentTexts = commentTextsElem[index].innerText;

    // Comment contains vimeo videos
    if (commentTexts.match(VIMEO_PATTERN)) {
      supComment.remove();

      const newText = document.createElement("p") as HTMLParagraphElement;
      newText.innerHTML = commentTexts.replace("↑", "").trim();
      fileNameWrapElem.after(newText);

      return;
    }

    if (!fileNameWrapElem) return;

    let previousFileNameWrap =
      fileNameWrapElem.previousElementSibling as HTMLElement;

    // If the fileNameWrapElem is too long, replace it with "Disponível aqui" and move the original filename to a new paragraph above it
    if (fileNameWrapElem.textContent?.trim().length > 120) {
      supComment.remove();

      // Store the filename before modifying
      const originalFileName = fileNameWrapElem.innerHTML;

      const newPrev = document.createElement("p");
      newPrev.innerHTML = originalFileName;
      fileNameWrapElem.parentNode!.insertBefore(newPrev, fileNameWrapElem);

      fileNameWrapElem.textContent = "Disponível aqui";

      previousFileNameWrap = newPrev;
    }

    if (!previousFileNameWrap) return;

    if (fileNameWrapElem.closest(".dica-leitura")) return; // Skip if already inside a 'dica-leitura' wrapper

    // Wrap (paragraph + local file link) elements if previous element local file link is a 'p' or 'ul' element
    if (
      previousFileNameWrap.tagName === "P" ||
      previousFileNameWrap.tagName === "UL"
    ) {
      createDicaWrapper(previousFileNameWrap, fileNameWrapElem, commentTexts);
    }

    // if previous element local file link is not 'p' element and is a 'dica-leitura' wrapper
    if (
      previousFileNameWrap.tagName !== "P" &&
      previousFileNameWrap.classList.contains("dica-leitura")
    ) {
      const placeholder = document.createElement("p");
      fileNameWrapElem.parentNode!.insertBefore(placeholder, fileNameWrapElem);

      createDicaWrapper(
        previousFileNameWrap,
        fileNameWrapElem,
        commentTexts,
        placeholder,
      );
    }

    supComment.remove();
  });
}
