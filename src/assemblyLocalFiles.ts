export function assemblyLocalFiles() {
  const dicaLeituraDivs = document.querySelectorAll(
    ".dica-leitura",
  ) as NodeListOf<HTMLDivElement>;

  dicaLeituraDivs.forEach((dicaLeituraDiv) => {
    const previousDicaLeituraDiv =
      dicaLeituraDiv.previousElementSibling as HTMLDivElement;

    if (!previousDicaLeituraDiv) throw new Error("Failed to assembly.");

    if (previousDicaLeituraDiv.classList.contains("dica-leitura")) {
      const wrapper = document.createElement("div") as HTMLDivElement;
      wrapper.className = "dica-leitura";

      const img = document.createElement("img") as HTMLImageElement;
      img.src = "../img/ico/dica_d_outline.svg";
      img.alt = "Dica de Leitura";

      // Remove img element from local file and prev element
      const dicaLeituraImg = dicaLeituraDiv.querySelector(
        "img",
      ) as HTMLImageElement;
      const previousDicaLeituraImg = dicaLeituraDiv.querySelector(
        "img",
      ) as HTMLImageElement;
      dicaLeituraImg.remove();
      previousDicaLeituraImg.remove();

      // Insert wrapper (dica-leitura) before previous parent element and append div children
      previousDicaLeituraDiv.parentNode?.insertBefore(
        wrapper,
        previousDicaLeituraDiv,
      );
      wrapper.append(img, previousDicaLeituraDiv, dicaLeituraDiv);

      // Replace parent 'dica-leitura' to child node
      previousDicaLeituraDiv.replaceWith(...previousDicaLeituraDiv.childNodes);
      dicaLeituraDiv.replaceWith(...dicaLeituraDiv.childNodes);
    }
  });
}
