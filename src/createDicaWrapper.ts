import { URLRegex } from "./data";

export function createDicaWrapper(
  prevElem: HTMLElement,
  fileName: HTMLElement,
  commentText: string,
  placeholder?: HTMLElement,
) {
  const wrapper = document.createElement("div") as HTMLDivElement;
  wrapper.className = "dica-leitura";
  const img = document.createElement("img") as HTMLImageElement;
  img.src = "../img/ico/dica_d_outline.svg";
  img.alt = "Dica de Leitura";

  // Wrap prev + link to local file
  if (placeholder) {
    placeholder.parentNode?.insertBefore(wrapper, placeholder);
  } else {
    prevElem.parentNode?.insertBefore(wrapper, prevElem);
  }

  const a = document.createElement("a") as HTMLAnchorElement;
  const commentTextFormmated = commentText.replace("↑", "").trim();
  const commentTextLink = "materiais/" + commentTextFormmated;
  a.href = commentTextLink;

  // GDOC links
  const gDocRegex = /673|21|231|89|521/g;
  if (commentText.match(gDocRegex)) {
    a.removeAttribute("href");
    a.setAttribute(
      "data-gdoc",
      commentText.match(gDocRegex)!.filter((e) => e.match(/\d+/))![0],
    ); // Set code exclude texts
  }

  // Hyperlinks
  if (commentText.match(URLRegex)) {
    a.href = commentTextFormmated;
  }

  a.target = "_blank";
  a.className = "content-link flex-c";

  const i = document.createElement("i");
  i.className = "material-icons";
  i.textContent = "description";

  const span = document.createElement("span") as HTMLSpanElement;
  span.appendChild(fileName);
  fileName.replaceWith(...fileName.childNodes); // Remove 'p' tag (unwrap)

  a.append(i, span);

  if (placeholder) {
    wrapper.append(img, placeholder, a);
  } else {
    wrapper.append(img, prevElem, a);
  }
}
