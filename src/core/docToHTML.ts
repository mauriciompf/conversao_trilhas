import mammoth from "mammoth";
import { contentHost } from "./main";

export async function docToHTML(file: File) {
  try {
    // Reads the content of doc file as arrayBuffer (raw data => array buffer)
    const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      // When content is finished, resolve result
      reader.onload = (e) => {
        if (e.target?.result instanceof ArrayBuffer) {
          resolve(e.target.result); // RESULT
        } else {
          reject(new Error("Failed to read file as array buffer."));
        }
      };

      reader.onerror = () => reject(reader.error);

      reader.readAsArrayBuffer(file); // get result and returns as array buffer (binary data container)
    });

    const options = {
      styleMap: ["comment-reference => sup.file"], // Allow comments (below content)
    };

    // (Mammoth reads as arrayBuffer)
    const fileConvertedToHtml = await mammoth.convertToHtml(
      {
        arrayBuffer: arrayBuffer, // Binary data container
      },
      options,
    );

    const HTMLString = fileConvertedToHtml.value; // File content string
    contentHost.innerHTML = HTMLString; // Add file converted (content) to host element
  } catch (error) {
    console.error("Failed to converter doc to HTML,", error);
  }
}
