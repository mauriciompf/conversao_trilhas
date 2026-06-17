export function handleTable() {
  const tables = document.querySelectorAll(
    "table",
  ) as NodeListOf<HTMLTableElement>;

  const realTables = [...tables].filter((table) => table.rows.length >= 3);

  realTables.forEach((table, index) => {
    if (index != 0) {
      table.className = "tabela-padrao";
    }

    const cells = table.querySelectorAll("tr > * > p");

    cells.forEach((cell) => {
      const html = cell.innerHTML.trim();
      const fragment = document.createRange().createContextualFragment(html);
      cell.replaceWith(fragment);
    });
  });
}
