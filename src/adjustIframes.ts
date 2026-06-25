import { contentHost } from "./main";

export function adjustIframes() {
  const iframeEmbeds = contentHost.querySelectorAll(
    "iframe",
  ) as NodeListOf<HTMLIFrameElement>;

  // Adjust iframe class (lazyload)
  [...iframeEmbeds]
    .filter((iframe) => !iframe.classList.contains("lazyload"))
    .forEach((iframe) => {
      iframe.className = "lazyload";
    });
}
