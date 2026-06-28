import { contentHost } from "./main";
import { replaceTableTags } from "./replaceTableTags";

export function adjustSections() {
  const contentTables = contentHost.querySelectorAll(
    ".content-text > table",
  ) as NodeListOf<HTMLTableElement>;

  const firstTable = contentTables[0];

  // Adjust metadata table and move nested tables to the top of the content host (Document Error)
  if (!firstTable.classList.contains("tabela-padrao")) {
    const sectionTitleElems = firstTable.querySelectorAll(
      "p.titulo-secao:first-child",
    );

    // Filter section titles that match specific patterns (apresentacao, etapas, unidade, unica)
    const sectionTitle = [...sectionTitleElems].filter((sectionTitleElems) =>
      /\b(P[ÁA]GINA:?\s?)?(APRESENTA[CÇ][ÃA]O|ETAPA\s*(1|I|2|II|3|III|4|IV)|UNIDADE\s*(1|I|2|II|3|III|4|IV)|[ÚU]NICA)\b(?![ –\-])/i.test(
        sectionTitleElems.textContent.trim(),
      ),
    );

    // Move nested table (metadata table) to the top of the content host
    const nestedTable = firstTable.querySelector(
      ".tabela-padrao",
    ) as HTMLTableElement;
    contentHost.prepend(nestedTable);

    // Wrap section title and content in a new table structure (table > tbody > tr > td) to maintain structure consistency
    for (let i = sectionTitle.length - 1; i >= 0; i--) {
      const tr = sectionTitle[i].closest("tr") as HTMLElement; // Section title as table row

      const content = tr?.nextElementSibling?.querySelector(
        "td",
      ) as HTMLElement;

      const trContent = document.createElement("tr"); // Section content as table row
      trContent.appendChild(content);
      const table = document.createElement("table");
      const tbody = document.createElement("tbody");
      tbody.append(tr, trContent);
      table.appendChild(tbody);
      firstTable.after(table); // Insert the new table structure after the first table

      replaceTableTags(table);
    }

    firstTable.remove();
  }

  const tables = [...contentTables].filter((_, index) => index > 0); // Filter 'metadata' table
  tables.forEach((table) => replaceTableTags(table));
}
