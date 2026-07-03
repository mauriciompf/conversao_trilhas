import { contentHost } from "./main";

export function handleTitles() {
  const existingHeadings = contentHost.querySelectorAll(
    "h1, h2, h3",
  ) as NodeListOf<HTMLElement>;
  const pTags = document.querySelectorAll(
    "p",
  ) as NodeListOf<HTMLParagraphElement>;

  // Replace every heading with a paragraph of class 'titulo-secao' (title)
  [...existingHeadings]
    .filter((heading) => heading !== null)
    .forEach((heading) => {
      const p = document.createElement("p");
      p.className = "titulo-secao";
      p.innerHTML = heading.innerHTML;
      heading.replaceWith(p);
    });

  // Add class 'titulo-secao' (title)
  const titles = [...pTags].filter((pTag) => {
    const innerHTML = pTag.innerHTML.trim();
    const isStrongTitle = /^.{0,3}<strong>.*<\/strong>.{0,2}$/i.test(innerHTML);

    const titleConditions =
      isStrongTitle &&
      pTag.textContent.length < 70 &&
      !pTag.hasAttribute("class") &&
      !pTag.querySelector("br");

    return titleConditions;
  });

  titles.forEach((title) => (title.className = "titulo-secao"));
}
