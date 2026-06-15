export function handleLocalFile() {
  const supComments = document.querySelectorAll(
    "sup.file",
  ) as NodeListOf<HTMLElement>;
  const commentTexts = document.querySelectorAll(
    "dd",
  ) as NodeListOf<HTMLElement>;

  if (commentTexts.length !== supComments.length)
    throw new Error("Comments length failed.");

  supComments.forEach((supComment, index) => {
    const fileNameWrap = supComment.closest("P") as HTMLElement;

    if (!fileNameWrap) return;

    const previousFileNameWrap =
      fileNameWrap.previousElementSibling as HTMLElement;

    if (fileNameWrap.closest(".dica-leitura")) return; // Skip if already inside a dica-leitura wrapper

    if (previousFileNameWrap && previousFileNameWrap.tagName === "P") {
      const wrapper = document.createElement("div") as HTMLDivElement;
      wrapper.className = "dica-leitura";
      const img = document.createElement("img") as HTMLImageElement;
      img.src = "../img/ico/dica_d_outline.svg";
      img.alt = "Dica de Leitura";

      // Wrap prev + link to local file
      previousFileNameWrap.parentNode?.insertBefore(
        wrapper,
        previousFileNameWrap,
      );

      const a = document.createElement("a") as HTMLAnchorElement;
      const commentText = commentTexts[index].innerText;
      const commentTextFormmated = commentText.replace("↑", "").trim();
      const commentTextLink = "/materiais/" + commentTextFormmated;
      a.href = commentTextLink;

      // GDOC links
      const gDocRegex = /673|21|231|89|521/g;
      if (commentText.match(gDocRegex)) {
        a.removeAttribute("href");
        a.setAttribute(
          "data-gdoc",
          commentText.match(gDocRegex)!.filter((e) => e.match(/\d+/))![0],
        ); // Set code exclude texts
      }

      a.target = "_blank";
      a.className = "content-link flex-c";

      const i = document.createElement("i");
      i.className = "material-icons";
      i.textContent = "description";

      const span = document.createElement("span") as HTMLSpanElement;
      span.appendChild(fileNameWrap);
      fileNameWrap.replaceWith(...fileNameWrap.childNodes); // Remove 'p' tag (unwrap)

      a.append(i, span);

      wrapper.append(img, previousFileNameWrap, a);
      // supComment.remove(); // Remove sup element
    }
  });
}
