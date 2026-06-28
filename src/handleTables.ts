export function handleTables() {
  const tables = document.querySelectorAll(
    "table",
  ) as NodeListOf<HTMLTableElement>;

  let realTables;

  if (!tables[0].querySelector("table")) {
    realTables = [...tables].filter((table) => table.rows.length >= 3);
  } else {
    realTables = [...tables].filter(
      (table, index) => index > 0 && table.rows.length >= 3,
    );
  }

  realTables.forEach((table) => {
    table.className = "tabela-padrao";

    // Remove 'p' element inside table cells
    const cells = table.querySelectorAll("tr > * > p");
    cells.forEach((cell) => {
      const html = cell.innerHTML.trim();
      const fragment = document.createRange().createContextualFragment(html);
      cell.replaceWith(fragment);
    });
  });

  // Remove non-essential cells from the metadata table.
  // [...realTables[0].querySelectorAll("tr")]
  //   .filter((_, index) => index >= 3)
  //   .forEach((el) => {
  //     el.remove();
  //   });
}
