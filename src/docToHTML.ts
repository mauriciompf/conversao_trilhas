import mammoth from "mammoth";

export async function docToHTML(host: HTMLElement, fileSource: string) {
  try {
    let arrayBuffer: ArrayBuffer;

    const response = await fetch(fileSource); // Get raw docx file
    arrayBuffer = await response.arrayBuffer(); // 'Transform' raw file to buffer

    const options = {
      styleMap: ["comment-reference => sup.file"], // Allow comments below content
    };

    // Convet docx to html
    const fileConvertedToHtml = await mammoth.convertToHtml(
      {
        arrayBuffer: arrayBuffer,
      },
      options,
    );

    const stringHtml = fileConvertedToHtml.value; // File content string
    host.innerHTML = stringHtml; // Add file converted (content) to host element
  } catch (error) {
    console.error(error);
  }
}
