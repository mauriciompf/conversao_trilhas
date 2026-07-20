// Trilhas que não possuem títulos de seção
// Obtar para Etapa Única

export function handleEmptySections() {
  const tbody = document.querySelector(
    "table:nth-of-type(2) > tbody",
  ) as HTMLElement;

  if (tbody.children.length < 2) {
    const tr = document.createElement("tr") as HTMLElement;
    const td = document.createElement("td") as HTMLElement;
    const p = document.createElement("p") as HTMLElement;
    p.classList.add("titulo-secao");

    p.textContent = "Etapa Única";
    td.appendChild(p);
    tr.appendChild(td);
    tbody.prepend(tr);
  }
}
