export function handleImages() {
  const imgs = document.querySelectorAll(
    "p > img",
  ) as NodeListOf<HTMLImageElement>;

  imgs.forEach((img) => {
    if (!img.hasAttribute("alt")) {
      img.setAttribute("alt", "");
    }

    img.className = "img";
  });
}
