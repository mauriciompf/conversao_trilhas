import { youtubePattern } from "../definitions";

export function handleYTVideo() {
  const pTags = document.querySelectorAll(
    "p",
  ) as NodeListOf<HTMLParagraphElement>;

  const YTLinksElems = [...pTags].filter((pTag) =>
    youtubePattern.test(pTag.innerHTML),
  );

  YTLinksElems.forEach((linkElem) => {
    let link = linkElem.innerHTML.match(youtubePattern)![0];
    let text = linkElem.innerText;

    if (youtubePattern.test(text)) {
      const prevElem = linkElem.previousElementSibling as HTMLElement;

      if (!prevElem) return;

      text = prevElem.innerHTML;
      prevElem.remove();
    }

    // Add protocol http
    if (!link.startsWith("https://")) link = "http://" + link;

    const url = new URL(link);
    const linkFormmated =
      "https://www.youtube.com/embed/" +
      url.searchParams.get("v") +
      "?rel=0&amp;showinfo=0&amp;disablekb=1&amp;modestbranding=1&amp;allowfullscreen=1";

    const wrapper = document.createElement("div") as HTMLDivElement;
    wrapper.className = "outline-colorido";
    wrapper.ariaLabel = "video do youtube";

    if (/Cápsula do Conhecimento/gi.test(text)) {
      wrapper.className = "capsula-conhecimento";
      wrapper.ariaLabel = "Capsula de conhecimento";
      const img = document.createElement("img") as HTMLImageElement;
      img.src = "../img/ico/capsula.svg";
      img.alt = "Cápsula de conhecimento";

      wrapper.appendChild(img);
    }

    const textElement = document.createElement("p") as HTMLParagraphElement;

    if (text.match(youtubePattern)) {
      textElement.innerHTML = text.replace(youtubePattern, "").trim();
    } else {
      textElement.innerHTML = text;
    }

    const divVideo = document.createElement("div") as HTMLDivElement;
    divVideo.className = "video";

    const divLargeVideo = document.createElement("div") as HTMLDivElement;
    divLargeVideo.className = "video-large";

    const iframe = document.createElement("iframe") as HTMLIFrameElement;
    iframe.className = "lazyload";
    iframe.title = "Video do youtube";
    iframe.width = "1280";
    iframe.height = "720";
    iframe.setAttribute("data-src", linkFormmated);
    iframe.setAttribute("allowfullscreen", "true");

    linkElem.parentNode!.insertBefore(wrapper, linkElem);

    divVideo.appendChild(divLargeVideo);
    divLargeVideo.appendChild(iframe);
    wrapper.append(textElement, divVideo);

    linkElem.remove();
  });
}
