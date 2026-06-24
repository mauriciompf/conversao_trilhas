import { codePattern } from "./regexConstants";
import { tableToJson } from "./tableToJson";

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

        if (codePattern.test(value)) {
          titleName = value.replace(codePattern, "").trim(); // Remove code (código da disciplina)
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
