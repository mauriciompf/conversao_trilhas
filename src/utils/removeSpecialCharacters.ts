import { SPECIAL_CHARS_PATTERN } from "../definitions/patterns";

export function removeSpecialCharacters(filename: string): string {
  return filename.replace(SPECIAL_CHARS_PATTERN, "");
}
