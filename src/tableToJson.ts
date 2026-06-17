export function tableToJson(table: HTMLTableElement) {
  const data = [];

  for (let i = 1; i < table.rows.length; i++) {
    const tableRow = table.rows[i];
    const rowData = [];

    for (let j = 0; j < tableRow.cells.length; j++) {
      rowData.push(tableRow.cells[j].innerText);
    }

    data.push(rowData);
  }

  return data;
}
