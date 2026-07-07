export function handleImages() {
  const imgs = document.querySelectorAll(
    "p img",
  ) as NodeListOf<HTMLImageElement>;

  imgs.forEach((img) => {
    const imgParent = img.parentElement as HTMLElement;

    if (!(imgParent instanceof HTMLParagraphElement)) {
      imgParent.replaceWith(img);
    }

    if (!img.hasAttribute("alt")) {
      img.setAttribute("alt", "");
    }

    img.setAttribute("title", img.alt);
    img.className = "img";

    const currentParent = img.parentElement as HTMLElement;
    if (currentParent instanceof HTMLParagraphElement) {
      currentParent.replaceWith(img);
    }
  });
}
