export function assemblyLocalFiles() {
  const dicaLeituraDivs = document.querySelectorAll(
    ".dica-leitura",
  ) as NodeListOf<HTMLDivElement>;

  dicaLeituraDivs.forEach((dicaLeituraDiv) => {
    const previousDicaLeituraDiv =
      dicaLeituraDiv.previousElementSibling as HTMLElement;

    const isMatchingClass =
      previousDicaLeituraDiv &&
      previousDicaLeituraDiv.hasAttribute("class") &&
      previousDicaLeituraDiv.classList.contains("dica-leitura");

    if (!isMatchingClass) return;

    const previousDicaLeituraDivParent =
      previousDicaLeituraDiv.parentNode as HTMLElement;

    const wrapper = document.createElement("div") as HTMLDivElement;
    wrapper.className = "dica-leitura";

    previousDicaLeituraDivParent.insertBefore(wrapper, previousDicaLeituraDiv);
    wrapper.append(previousDicaLeituraDiv, dicaLeituraDiv);

    const dicaLeituraDivContent = Array.from(dicaLeituraDiv.childNodes);
    const previousDicaLeituraDivContent = Array.from(
      previousDicaLeituraDiv.childNodes,
    );

    previousDicaLeituraDiv.replaceWith(...previousDicaLeituraDivContent);
    dicaLeituraDiv.replaceWith(...dicaLeituraDivContent);
  });
}
