import {
  DEFAULT_STAMP_PATTERN,
  START_STAMP_PATTERN,
  END_STAMP_PATTERN,
} from "../definitions";

export function handleStamps() {
  const tags = document.querySelectorAll(
    "p, img, ul, ol",
  ) as NodeListOf<HTMLParagraphElement>;

  let startIndex: number = -1;
  let currentClassName: string = "";

  tags.forEach((tag, index) => {
    const tagTextContent = tag.textContent.trim();

    const defaultStampMatch = tagTextContent.match(
      DEFAULT_STAMP_PATTERN,
    ) as string[];
    const startStampMatch = tagTextContent.match(
      START_STAMP_PATTERN,
    ) as string[];
    const endStampMatch = tagTextContent.match(END_STAMP_PATTERN) as string[];

    if (defaultStampMatch && !endStampMatch && !startStampMatch) {
      const defaultStampName: string = defaultStampMatch[1];
      const tagWithoutDefaultStamp = tag.innerHTML.replace(
        defaultStampMatch[0],
        "",
      );

      tag.innerHTML = tagWithoutDefaultStamp;

      const wrapper = document.createElement("div");
      wrapper.classList.add(defaultStampName);

      const parent = tag.parentNode;

      if (parent) {
        parent.insertBefore(wrapper, tag);
        wrapper.appendChild(tag);
      }
    }

    if (startStampMatch) {
      const startStampName: string = startStampMatch[1];
      const tagWithoutStartStamp = tag.innerHTML.replace(
        startStampMatch[0],
        "",
      );

      tag.innerHTML = tagWithoutStartStamp;
      currentClassName = startStampName;
      startIndex = index;
    }

    if (endStampMatch && startIndex !== -1) {
      const tagWithoutEndStamp = tag.innerHTML.replace(endStampMatch[0], "");

      tag.innerHTML = tagWithoutEndStamp;
      const lastParagraphIndex = index;

      const firstStampParagraph = tags[startIndex] as HTMLElement;
      const firstStampParagraphParent =
        firstStampParagraph.parentNode as HTMLElement;

      if (!firstStampParagraph && !firstStampParagraphParent) return;

      const stampWrapper = document.createElement("div") as HTMLElement;
      stampWrapper.classList.add(currentClassName);

      const paragraphsToWrap: HTMLParagraphElement[] = [];
      for (let i = startIndex; i <= lastParagraphIndex; i++)
        paragraphsToWrap.push(tags[i]);

      firstStampParagraphParent.insertBefore(stampWrapper, firstStampParagraph);
      paragraphsToWrap.forEach((paragraph) =>
        stampWrapper.appendChild(paragraph),
      );

      startIndex = -1;
      currentClassName = "";
    }
  });
}
