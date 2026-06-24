export function fileNameConverter(
  fileName: string,
  filenameLength: "short" | "default" = "default",
) {
  // Format file name
  if (/[A-Z]+/g.test(fileName)) {
    fileName = fileName.toLowerCase().trim();
  }

  // Remove special characters and ponctuation
  if (/[^a-zA-Zà-ž0-9\s]+/g.test(fileName)) {
    fileName = fileName.replace(/[^a-zA-Zà-ž0-9\s_]+/g, "");
  }

  // Replace spaces by '_'
  if (!/[_]/g.test(fileName)) {
    if (/[\s]+/g.test(fileName)) {
      fileName = fileName.trim().replace(/[\s]+/g, "_");
    }
  }

  // Replace diacritics characteres ç -> c
  if (/[à-ž]+/g.test(fileName)) {
    fileName = fileName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // Add "_" after 'code number' (code + text)
  if (/^([A-Za-z]*[0-9]+)(?=[a-z])/g.test(fileName)) {
    const formatCode = fileName.match(/^([A-Za-z]*[0-9]+)(?=[a-z])/g)![0] + "_";
    const text = fileName.split(/^([A-Za-z]*[0-9]+)(?=[a-z])/g)[2];
    fileName = formatCode.toUpperCase() + text;
  }

  switch (filenameLength) {
    case "short":
      const shortFileName = fileName
        .split("_")
        .filter((_, index) => index <= 2);

      return shortFileName.join("_");
    default:
      break;
  }

  return fileName;
}
