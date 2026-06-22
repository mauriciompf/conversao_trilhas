import JSZip from "jszip";
import { buildHTMLContent } from "./buildHTMLContent";
import { getMetaData } from "./getMetadata";
// import { imageConverter } from "./imageConverter";
import { fileNameConverter } from "./fileNameConverter";

export async function generateZip() {
  const zip = new JSZip();

  const { titleName, code } = getMetaData();

  try {
    const response = await fetch("/placeholder_4etapas/css/style.css");
    if (!response) throw new Error("Failed to fetch");

    const cssText = await response.text();

    zip.file("css/style.css", cssText); // css/...
    zip.folder("materiais"); // materiais/...
    // await imageConverter(zip, [
    //   "/placeholder_4etapas/img/atencao.png",
    //   "/placeholder_4etapas/img/atendimento.png",
    // ]); // img/...

    const responseInicio = await fetch("/placeholder_4etapas/inicio.html");
    if (!responseInicio) throw new Error("Failed to fetch");

    const inicioString = await responseInicio.text();
    const inicioText = inicioString.replaceAll("templateCode", titleName);

    zip.file("inicio.html", inicioText);

    await buildHTMLContent(zip, [
      "apresentacao",
      "etapa_i",
      "etapa_ii",
      "etapa_iii",
      "etapa_iv",
    ]);

    const generateZipAsBlob = await zip.generateAsync({ type: "blob" });

    const url = URL.createObjectURL(generateZipAsBlob);
    const link = document.createElement("a") as HTMLAnchorElement;
    link.href = url;
    link.download = `${fileNameConverter(code + titleName, "short")}.zip`;
    link.click();

    link.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to generate zip: ", error);
  }
}
