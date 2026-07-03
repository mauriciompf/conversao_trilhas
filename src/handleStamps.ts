export function handleStamps() {
  const pTags = document.querySelectorAll(
    "p",
  ) as NodeListOf<HTMLParagraphElement>;

  const stampPattern = /^\$([^\$]*)\$/i;
  const startStampPattern = /^\$0([^$]*)\$/i;
  const endStampPattern = /^\$1([^$]*)\$/i;

  let startIndex = -1;
  let currentClassName = "";

  pTags.forEach((pTag, index) => {
    const text = pTag.textContent.trim();

    if (
      !startStampPattern.test(text) &&
      !endStampPattern.test(text) &&
      stampPattern.test(text)
    ) {
      const className = pTag.textContent.match(stampPattern)![1];

      // Add stamp to className element
      pTag.className = className;

      // Remove stamp text
      pTag.innerHTML = pTag.innerHTML.replace(/\$(.*?)\$/i, "");
    }

    // Check for start stamp
    if (startStampPattern.test(text)) {
      currentClassName = text.match(startStampPattern)![1];
      startIndex = index;
      // Remove the stamp text
      pTag.innerHTML = pTag.innerHTML.replace(/\$0(.*?)\$/i, "");
    }

    // Check for end stamp
    if (endStampPattern.test(text) && startIndex !== -1) {
      // Remove the stamp text
      pTag.innerHTML = pTag.innerHTML.replace(/\$1(.*?)\$/i, "");

      // Get the parent of the first paragraph
      const parent = pTags[startIndex].parentNode;

      // Create wrapper div with the class name
      const wrapper = document.createElement("div");
      wrapper.className = currentClassName;

      // Get all paragraphs from start to end (inclusive)
      const paragraphsToWrap: HTMLParagraphElement[] = [];
      for (let i = startIndex; i <= index; i++) {
        paragraphsToWrap.push(pTags[i]);
      }

      // Wrap them
      if (parent) {
        parent.insertBefore(wrapper, pTags[startIndex]);
        paragraphsToWrap.forEach((p) => wrapper.appendChild(p));
      }

      // Reset for next group
      startIndex = -1;
      currentClassName = "";
    }
  });
}
