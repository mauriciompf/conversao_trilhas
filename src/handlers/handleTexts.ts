import { contentHost } from "../core";

export function handleTexts() {
  const pTags = contentHost.querySelectorAll(
    "p",
  ) as NodeListOf<HTMLParagraphElement>;
  const brTag = document.querySelector("br") as HTMLBRElement;

  pTags.forEach((pTag) => {
    const hasBrTag = pTag.contains(brTag);

    if (hasBrTag) {
      brTag.remove();
    }
  });
}
