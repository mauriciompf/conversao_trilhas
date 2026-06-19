export function handleTitles() {
  const contentWrapper = document.querySelectorAll(
    ".contentWrapper",
  ) as NodeListOf<HTMLElement>;
  const pTags = document.querySelectorAll(
    "p",
  ) as NodeListOf<HTMLParagraphElement>;

  contentWrapper.forEach((section) => {
    const headings = {
      h1: section.querySelector("h1") as HTMLHeadingElement,
      h2: section.querySelector("h2") as HTMLHeadingElement,
      h3: section.querySelector("h3") as HTMLHeadingElement,
    };
    const existingHeadings = Object.entries(headings);

    // Replace every heading by paragraph with class 'titulo-secao' (title)
    existingHeadings
      .filter(([_, heading]) => heading !== null)
      .forEach(([tagName, heading]) => {
        const replacedHTML = heading.outerHTML
          .replace(`<${tagName}>`, "<p class='titulo-secao'>")
          .replace(`</${tagName}>`, "</p>");
        heading.outerHTML = replacedHTML;
      });
  });

  const titles = [...pTags].filter((pTag) => {
    const titleConditions =
      pTag.querySelector("strong") &&
      pTag.textContent.length < 80 &&
      !pTag.hasAttribute("class");

    return titleConditions;
  });

  titles.forEach((title) => (title.className = "titulo-secao")); // Add class 'titulo-secao' (title)
}
