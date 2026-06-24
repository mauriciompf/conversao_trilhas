export function handleFakeTables() {
  const contentWrapper = document.querySelectorAll(
    ".contentWrapper",
  ) as NodeListOf<HTMLElement>;

  contentWrapper.forEach((section) => {
    const tables = section.querySelectorAll(
      "table",
    ) as NodeListOf<HTMLTableElement>;

    // Replace every 'fake table' from doc
    const fakeTables = [...tables].filter((table) => table.rows.length <= 3);

    fakeTables.forEach((table) => {
      const isNested =
        table.querySelector(".dica-leitura") || table.querySelector(".video"); // Local files & embedded videos

      // Children node
      if (isNested) {
        const replacedHTML = table.outerHTML
          .replace(/^<table>/g, "")
          .replace(/<\/table>$/g, "");
        table.outerHTML = replacedHTML;
      }

      // Outline emphasis div
      const replacedHTML = table.outerHTML
        .replace(/^<table>/g, "<div class='outline-colorido'>")
        .replace(/<\/table>$/g, "</div>");
      table.outerHTML = replacedHTML;
    });
  });
}
