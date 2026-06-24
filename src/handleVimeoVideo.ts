import { vimeoPattern } from "./regexConstants";

export function handleVimeoVideo() {
  const pTags = document.querySelectorAll(
    "p",
  ) as NodeListOf<HTMLParagraphElement>;

  const pTagVimeoElems = [...pTags].filter((pTag) =>
    vimeoPattern.test(pTag.innerHTML),
  );

  [...pTagVimeoElems].forEach((element) => {
    // console.log(element.outerHTML);
    const text = element.innerText;
    let vimeoLink = "";

    if (element.innerHTML.match(vimeoPattern)) {
      vimeoLink =
        "https://player.vimeo.com/video/" +
        element.innerHTML
          .match(/\.com\/([^?]+)/gi)![0]
          .replace(".com/", "")
          .replace("/", "?h=");
    }

    const videoWrapper = document.createElement("div") as HTMLElement;
    videoWrapper.ariaLabel = "Vídeo da Disciplina";

    const videoLargeDiv = document.createElement("div") as HTMLDivElement;
    videoLargeDiv.className = "video-large";

    const textElement = document.createElement("p") as HTMLParagraphElement;
    textElement.innerHTML = text;
    videoWrapper.appendChild(textElement);

    const iframe = document.createElement("iframe") as HTMLIFrameElement;
    iframe.className = "lazyload";
    iframe.title = "Vídeo da Disciplina";
    iframe.width = "1280";
    iframe.height = "720";
    iframe.setAttribute("data-src", vimeoLink);
    iframe.setAttribute("allowfullscreen", "true");
    videoLargeDiv.appendChild(iframe);
    videoWrapper.appendChild(videoLargeDiv);

    element.parentNode?.insertBefore(videoWrapper, element);

    element.remove();
  });
}
