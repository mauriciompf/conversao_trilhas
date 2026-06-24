import { gDocPattern, urlPattern } from "./regexConstants";

export function createDicaWrapper(
  prevElem: HTMLElement,
  fileNameWrapperElem: HTMLElement,
  commentText: string,
  placeholder?: HTMLElement,
) {
  const wrapper = document.createElement("div") as HTMLDivElement;
  wrapper.className = "dica-leitura";
  const img = document.createElement("img") as HTMLImageElement;
  img.src = "../img/ico/dica_d_outline.svg";
  img.alt = "Dica de Leitura";

  // Wrap local file link and prev element
  if (placeholder) {
    placeholder.parentNode?.insertBefore(wrapper, placeholder);
  } else {
    prevElem.parentNode?.insertBefore(wrapper, prevElem);
  }

  const linkElement = document.createElement("a") as HTMLAnchorElement;
  const commentTextFormmated = commentText.replace("↑", "").trim();
  const commentTextLink = "materiais/" + commentTextFormmated;
  linkElement.href = commentTextLink;

  // Comment contains GDOC
  if (commentText.match(gDocPattern)) {
    linkElement.removeAttribute("href");
    linkElement.setAttribute(
      "data-gdoc",
      commentText.match(gDocPattern)!.filter((e) => e.match(/\d+/))![0],
    ); // Set code and exclude texts
  }

  // Comment contains only hyperLink
  if (commentText.match(urlPattern)) linkElement.href = commentTextFormmated;

  linkElement.target = "_blank";
  linkElement.className = "content-link flex-c";

  const i = document.createElement("i");
  i.className = "material-icons";
  i.textContent = "description";

  const span = document.createElement("span") as HTMLSpanElement;
  span.appendChild(fileNameWrapperElem);

  fileNameWrapperElem.replaceWith(...fileNameWrapperElem.childNodes); // Replace parent element to child nodes (unwrap)

  linkElement.append(i, span);

  if (placeholder) {
    wrapper.append(img, placeholder, linkElement);
  } else {
    wrapper.append(img, prevElem, linkElement);
  }
}
