export function handleImages() {
  const imgs = document.querySelectorAll(
    "p > img",
  ) as NodeListOf<HTMLImageElement>;

  imgs.forEach((img) => {
    // Add alt to all imgs
    if (!img.hasAttribute("alt")) {
      img.setAttribute("alt", "");
    }

    img.className = "img";
  });
}
