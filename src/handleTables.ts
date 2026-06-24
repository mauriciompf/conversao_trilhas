export function handleTables() {
  const tables = document.querySelectorAll(
    "table",
  ) as NodeListOf<HTMLTableElement>;

  const realTables = [...tables].filter((table) => table.rows.length >= 3);

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
}
