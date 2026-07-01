import { createDicaWrapper } from "./createDicaWrapper";

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

    if (!fileNameWrapElem) return;

    const previousFileNameWrap =
      fileNameWrapElem.previousElementSibling as HTMLElement;

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
