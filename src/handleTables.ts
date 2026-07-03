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

    // Create semantic table header if it doesn't exist
    const firstRow = table.rows[0];

    if (firstRow && !firstRow.querySelector("th")) {
      const thead = document.createElement("thead") as HTMLTableSectionElement;

      thead.appendChild(firstRow);
      table.insertBefore(thead, table.firstChild); // Move the first row into the thead

      const cells = firstRow.querySelectorAll(
        "td",
      ) as NodeListOf<HTMLTableCellElement>;

      cells.forEach((cell) => {
        const th = document.createElement("th") as HTMLTableCellElement;
        th.innerHTML = cell.innerHTML;

        // Copy attributes from the original cell to the new th element
        [...cell.attributes].forEach((attr) => {
          th.setAttribute(attr.name, attr.value);
        });

        cell.replaceWith(th); // Replace the original cell with the new th element
      });
    }

    // Remove h1, h2, h3 inside table cells
    const tCells = table.querySelectorAll(
      "tr > * > h1, tr > * > h2, tr > * > h3",
    );
    tCells.forEach((cell) => {
      const html = cell.innerHTML.trim();
      const fragment = document.createRange().createContextualFragment(html);
      cell.replaceWith(fragment);
    });

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
