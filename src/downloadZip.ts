// import JSZip from "jszip";

import JSZip from "jszip";
import { imageConverter } from "./imageConverter";
import { fileNameConverter } from "./fileNameConverter";
import { buildHTMLContent } from "./buildHTMLContent";
import { getMetaData } from "./getMetadata";

export async function downloadZip() {
  const zip = new JSZip();

  const { titleName, code } = getMetaData();

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

    await buildHTMLContent(zip, [
      "apresentacao",
      "etapa_i",
      "etapa_ii",
      "etapa_iii",
      "etapa_iv",
    ]);

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
}
