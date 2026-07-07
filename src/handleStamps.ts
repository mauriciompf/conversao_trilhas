import {
  DEFAULT_STAMP_PATTERN,
  END_STAMP_PATTERN,
  START_STAMP_PATTERN,
} from "./regexConstants";

export function handleStamps() {
  const pTags = document.querySelectorAll(
    "p",
  ) as NodeListOf<HTMLParagraphElement>;

  let startIndex: number = -1;
  let currentClassName: string = "";

  pTags.forEach((pTag, index) => {
    const pTagTextContent = pTag.textContent.trim();

    const defaultStampMatch = pTagTextContent.match(
      DEFAULT_STAMP_PATTERN,
    ) as string[];
    const startStampMatch = pTagTextContent.match(
      START_STAMP_PATTERN,
    ) as string[];
    const endStampMatch = pTagTextContent.match(END_STAMP_PATTERN) as string[];

    if (defaultStampMatch && !endStampMatch) {
      const defaultStampName: string = defaultStampMatch[1];
      const pTagWithoutDefaultStamp = pTag.innerHTML.replace(
        defaultStampMatch[0],
        "",
      );

      pTag.innerHTML = pTagWithoutDefaultStamp;
      pTag.classList.add(defaultStampName);
    }

    if (startStampMatch) {
      const startStampName: string = startStampMatch[1];
      const pTagWithoutStartStamp = pTag.innerHTML.replace(
        startStampMatch[0],
        "",
      );

      pTag.innerHTML = pTagWithoutStartStamp;
      currentClassName = startStampName;
      startIndex = index;
    }

    if (endStampMatch && startIndex !== -1) {
      const pTagWithoutEndStamp = pTag.innerHTML.replace(endStampMatch[0], "");

      pTag.innerHTML = pTagWithoutEndStamp;
      const lastParagraphIndex = index;

      const firstStampParagraph = pTags[startIndex] as HTMLElement;
      const firstStampParagraphParent =
        firstStampParagraph.parentNode as HTMLElement;

      if (!firstStampParagraph && !firstStampParagraphParent) return;

      const stampWrapper = document.createElement("div") as HTMLElement;
      stampWrapper.classList.add(currentClassName);

      const paragraphsToWrap: HTMLParagraphElement[] = [];
      for (let i = startIndex; i <= lastParagraphIndex; i++)
        paragraphsToWrap.push(pTags[i]);

      firstStampParagraphParent.insertBefore(stampWrapper, firstStampParagraph);
      paragraphsToWrap.forEach((paragraph) =>
        stampWrapper.appendChild(paragraph),
      );

      startIndex = -1;
      currentClassName = "";
    }
  });
}
