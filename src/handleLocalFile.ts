import { createDicaWrapper } from "./createDicaWrapper";

export function handleLocalFile() {
  const supComments = document.querySelectorAll(
    "sup.file",
  ) as NodeListOf<HTMLElement>;
  const commentTexts = document.querySelectorAll(
    "dd",
  ) as NodeListOf<HTMLElement>;

  supComments.forEach((supComment, index) => {
    const fileNameWrap = supComment.closest("P") as HTMLElement;

    if (!fileNameWrap) return;

    const previousFileNameWrap =
      fileNameWrap.previousElementSibling as HTMLElement;

    if (!previousFileNameWrap && fileNameWrap.closest(".dica-leitura")) return; // Skip if already inside a dica-leitura wrapper

    // Wrap (paragraph + file link) elements if previous element file link is 'p' tag
    if (previousFileNameWrap.tagName === "P") {
      createDicaWrapper(
        previousFileNameWrap,
        fileNameWrap,
        commentTexts[index].innerText,
      );
    }

    // if previous element file link is not 'p' tag and is 'dica-leitura' wrapper
    if (
      previousFileNameWrap.tagName !== "P" &&
      previousFileNameWrap.classList.contains("dica-leitura")
    ) {
      const placeholder = document.createElement("p");
      fileNameWrap.parentNode!.insertBefore(placeholder, fileNameWrap);

      createDicaWrapper(
        previousFileNameWrap,
        fileNameWrap,
        commentTexts[index].innerText,
        placeholder,
      );
    }

    supComment.remove();
  });
}
