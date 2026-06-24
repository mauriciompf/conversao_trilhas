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

    // Replace every heading with a paragraph of class 'titulo-secao' (title)
    existingHeadings
      .filter(([_, heading]) => heading !== null)
      .forEach(([_, heading]) => {
        const p = document.createElement("p");
        p.className = "titulo-secao";
        p.innerHTML = heading.innerHTML;
        heading.replaceWith(p);
      });
  });

  const titles = [...pTags].filter((pTag) => {
    const hasStrongDirectChild = [...pTag.children].some(
      (child) => child.tagName === "STRONG",
    );

    const titleConditions =
      hasStrongDirectChild &&
      pTag.textContent.length < 70 &&
      !pTag.hasAttribute("class");

    return titleConditions;
  });

  titles.forEach((title) => (title.className = "titulo-secao")); // Add class 'titulo-secao' (title)
}
