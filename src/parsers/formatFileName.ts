import {
  normalizeCase,
  removeSpecialCharacters,
  replaceSpacesWithUnderscore,
  removeDiacritics,
  formatCodeNumber,
  truncateFileName,
} from "../utils";

export function formatFileName(
  filename: string,
  filenameLength: "short" | "default" = "default",
): string {
  if (!filename) {
    throw new Error("Invalid fileName: must be a non-empty string");
  }

  const transformations = [
    normalizeCase,
    removeSpecialCharacters,
    replaceSpacesWithUnderscore,
    removeDiacritics,
    formatCodeNumber,
    (name: string) => truncateFileName(name, filenameLength),
  ];

  return transformations.reduce((result, fn) => fn(result), filename);
}
