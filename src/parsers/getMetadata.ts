import { CODE_PATTERN } from "../definitions/patterns";
import { tableToJson } from "../transformers/tableToJson";

export function getMetaData() {
  const tables = document.querySelectorAll(
    "table",
  ) as NodeListOf<HTMLTableElement>;

  const metadata = tableToJson(tables[0]);

  let code = "";
  let titleName = "";

  metadata.forEach(([key, value]) => {
    switch (key) {
      case "Nome da Disciplina":
        titleName = value.trim();

        if (CODE_PATTERN.test(value)) {
          titleName = value.replace(CODE_PATTERN, "").trim(); // Código da disciplina
        }
        break;
      case "Código da Disciplina":
        code = value.trim();
        break;
      default:
        break;
    }
  });

  return { code, titleName };
}
