import { urlPattern } from "./regexConstants";

export function handleHyperLinks() {
  const pTags = document.querySelectorAll(
    "p",
  ) as NodeListOf<HTMLParagraphElement>;

  const hyperLinkElems = [...pTags].filter(
    (pTag) => urlPattern.test(pTag.innerHTML), // Get all anchors with a URL pattern
  );

  hyperLinkElems.forEach((hyperLinkElem) => {
    const text = hyperLinkElem.innerText.replace(urlPattern, "");
    const hyperLink = hyperLinkElem.innerHTML.match(urlPattern)![0];

    const a = document.createElement("a") as HTMLAnchorElement;
    a.href = hyperLink;
    a.className = "humanas";
    a.setAttribute("target", "_blank");
    a.textContent = text;

    hyperLinkElem.textContent = "";
    hyperLinkElem.appendChild(a);
  });
}
