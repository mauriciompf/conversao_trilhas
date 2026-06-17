// import JSZip from "jszip";

import JSZip from "jszip";
import { tableToJson } from "./tableToJson";
import { imageConverter } from "./imageConverter";
import { fileNameConverter } from "./fileNameConverter";
import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";

export async function downloadZip() {
  // const selfHTML = document.documentElement; // Etapa Única HTML
  // const selfBody = selfHTML.querySelector("body") as HTMLElement;
  // const selfContent = selfBody.querySelector(".content-text") as HTMLElement;

  const zip = new JSZip();

  const tables = document.querySelectorAll(
    "table",
  ) as NodeListOf<HTMLTableElement>;

  const metadata = tableToJson(tables[0]);

  let code = "";
  let titleName = "";

  metadata.forEach((el) => {
    const [key, value] = el;
    switch (key) {
      case "Nome da Disciplina":
        titleName = value.trim();

        // Remove code (...)
        const codeRegex = /\s\([\dA-Za-z]*\)/gi;

        if (codeRegex.test(value)) {
          titleName = value.replace(codeRegex, "").trim();
        }

        break;
      case "Código da Disciplina":
        code = value.trim();
        break;
      default:
        break;
    }
  });

  try {
    const response = await fetch("/css/style.css");
    if (!response) throw new Error("Failed to fetch");

    const cssText = await response.text();

    zip.file("css/style.css", cssText); // css/...
    zip.folder("materiais"); // materiais/...
    await imageConverter(zip, ["img/atencao.png", "img/atendimento.png"]); // img/...

    const responseInicio = await fetch("/inicio.html");
    if (!responseInicio) throw new Error("Failed to fetch");

    const inicioString = await responseInicio.text();
    const inicioText = inicioString.replaceAll("template", titleName);

    zip.file("inicio.html", inicioText);

    const sections = document.querySelectorAll(
      ".contentWrapper",
    ) as NodeListOf<HTMLElement>;

    const [apresentacao, etapa1, etapa2, etapa3, etapa4] = sections;

    const responseApresentacao = await fetch("/apresentacao.html");
    if (!responseApresentacao) throw new Error("Failed to fetch");
    const apresentacaoString = await responseApresentacao.text();
    const apresentacaoFormatted = apresentacaoString.replaceAll(
      "templateCode",
      titleName,
    );
    const parser = new DOMParser();
    const doc = parser.parseFromString(apresentacaoFormatted, "text/html");
    const contentText = doc.querySelector(".content-text");

    const apresentacaoClone = apresentacao.cloneNode(true) as HTMLElement;
    contentText?.before(apresentacaoClone);
    contentText?.remove();
    apresentacaoClone.className = "content-text";

    const apresentacaoContent = doc.querySelector("html")?.outerHTML;

    const formattedApresentacao = await prettier.format(apresentacaoContent!, {
      parser: "html",
      tabWidth: 2,
      plugins: [parserHtml],
    });

    zip.file("apresentacao.html", formattedApresentacao);

    //   zip.file("etapa1.html", selfHTMLFormatted);
    //   zip.file("etapa2.html", selfHTMLFormatted);
    //   zip.file("etapa3.html", selfHTMLFormatted);
    //   zip.file("etapa4.html", selfHTMLFormatted);

    const generateZip = await zip.generateAsync({ type: "blob" });

    const url = URL.createObjectURL(generateZip);
    const link = document.createElement("a") as HTMLAnchorElement;
    link.href = url;
    link.download = `${fileNameConverter(code + titleName, "short")}.zip`;

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to generate zip", error);
  }

  // console.log(code, titleName);

  //   // Format texts
  //   const selfHTMLFormatted = pretty(etapaUnica(selfContent, titleName!), {
  //     ocd: true,
  //   });
  //   const inicioHTML = pretty(inicio(titleName!), { ocd: true });
  //   const objetosHTML = pretty(objetos(titleName!), { ocd: true });
  //   const videosHTML = pretty(videos(titleName!), { ocd: true });
  //   const styleText = pretty(style(), { ocd: true });

  //   // Create folders 'img' and 'materias' and their files
  //   const css = zip.folder("css")!;
  //   css.file("style.css", styleText);
  //   zip.folder("materiais");

  //   // Html files
  //   zip.file("unidade1.html", selfHTMLFormatted);
  //   zip.file("inicio.html", inicioHTML);
  //   zip.file("objetos.html", objetosHTML);
  //   zip.file("videos.html", videosHTML);

  //   try {
  //     const content = await zip.generateAsync({ type: "blob" });

  //     const url = URL.createObjectURL(content);
  //     const link = document.createElement("a") as HTMLAnchorElement;
  //     link.href = url;
  //     link.download = `${fileNameConverter(code! + titleName!, "short")}.zip`;

  //     document.body.appendChild(link);
  //     link.click();

  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Failed to generate zip", error);
  //   }
}
