export function adjustIframes() {
  const iframeEmbeds = selfContent.querySelectorAll(
    "iframe",
  ) as NodeListOf<HTMLIFrameElement>;

  iframeEmbeds.forEach((iframe) => {
    if (
      iframe.className === " lazyloading" ||
      iframe.className === " lazyloaded"
    ) {
      iframe.className = "lazyload";
    }
  });
}
