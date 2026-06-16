export function handleAllElements() {
  const elements = document.querySelectorAll("*");
  const excludedTags = [
    "IMG",
    "INPUT",
    "BR",
    "HR",
    "META",
    "LINK",
    "SCRIPT",
    "IFRAME",
  ];

  elements.forEach((element) => {
    if (element.textContent === "Bons estudos!") {
      element.remove();
    }

    if (!excludedTags.includes(element.tagName)) {
      if (element.textContent.trim() === "" && element.children.length === 0) {
        element.remove();
      }
    }
  });
}
