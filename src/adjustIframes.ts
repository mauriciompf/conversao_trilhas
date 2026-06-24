import { contentHost } from "./main";

export function adjustIframes() {
  const iframeEmbeds = contentHost.querySelectorAll(
    "iframe",
  ) as NodeListOf<HTMLIFrameElement>;

  // Adjust iframe class (lazyload)
  iframeEmbeds.forEach((iframe) => {
    if (
      iframe.className === "lazyloading" ||
      iframe.className === "lazyloaded"
    ) {
      iframe.className = "lazyload";
    }
  });
}
