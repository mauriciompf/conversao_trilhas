import { DIACRITICS_PATTERN } from "../definitions/patterns";

export function removeDiacritics(filename: string): string {
  return filename.normalize("NFD").replace(DIACRITICS_PATTERN, "");
}
