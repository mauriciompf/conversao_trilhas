import { URLRegex } from "./data";

export function handleHyperLinks() {
  const pTags = document.querySelectorAll(
    "p",
  ) as NodeListOf<HTMLParagraphElement>;

  const hyperLinkElems = [...pTags].filter((pTag) =>
    URLRegex.test(pTag.innerText),
  );

  hyperLinkElems.forEach((hyperLinkElem) => {
    const text = hyperLinkElem.innerHTML.replace(URLRegex, "").replace(":", "");
    const hyperLink = hyperLinkElem.innerHTML.match(URLRegex)![0];

    const a = document.createElement("a") as HTMLAnchorElement;
    a.href = hyperLink;
    a.className = "humanas";
    a.setAttribute("target", "_blank");
    a.innerHTML = text;

    hyperLinkElem.textContent = "";
    hyperLinkElem.appendChild(a);
  });
}
