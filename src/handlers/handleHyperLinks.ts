import { URL_PATTERN_GLOBAL, URL_PATTERN } from "../definitions";

export function handleHyperLinks() {
  const pTags = document.querySelectorAll(
    "p",
  ) as NodeListOf<HTMLParagraphElement>;

  const hyperLinkElems = [...pTags].filter(
    (pTag) => URL_PATTERN.test(pTag.innerHTML), // Get all anchors with a URL pattern
  );

  hyperLinkElems.forEach((hyperLinkElem) => {
    let text = hyperLinkElem.innerHTML.replace(URL_PATTERN_GLOBAL, "");
    const hyperLink = hyperLinkElem.innerHTML.match(URL_PATTERN)![0];

    if (!text) {
      const prevElem = hyperLinkElem.previousElementSibling as HTMLElement;

      if (prevElem) {
        text = prevElem.innerHTML;

        prevElem.remove();
      }
    }

    const wrapper = document.createElement("div") as HTMLDivElement;
    wrapper.className = "dica-leitura";
    const img = document.createElement("img") as HTMLImageElement;
    img.src = "../img/ico/dica_d_outline.svg";
    img.alt = "Dica de Leitura";

    const textElement = document.createElement("p") as HTMLParagraphElement;
    textElement.innerHTML = text;

    const linkElement = document.createElement("a") as HTMLAnchorElement;
    linkElement.target = "_blank";
    linkElement.className = "content-link flex-c";
    linkElement.href = hyperLink;

    wrapper.append(img, textElement, linkElement);

    const i = document.createElement("i");
    i.className = "material-icons";
    i.textContent = "link";

    const span = document.createElement("span") as HTMLSpanElement;
    // Text to long
    // if (text.trim().length > 120) {
    // }

    span.innerHTML = "Disponível aqui";

    linkElement.append(i, span);

    hyperLinkElem.parentNode!.insertBefore(wrapper, hyperLinkElem);
    hyperLinkElem.remove();

    // const a = document.createElement("a") as HTMLAnchorElement;
    // a.href = hyperLink;
    // a.className = "humanas";
    // a.setAttribute("target", "_blank");
    // a.textContent = text;

    // hyperLinkElem.textContent = "";
    // hyperLinkElem.appendChild(a);
  });
}
