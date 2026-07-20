import { SPACES_PATTERN } from "../definitions/patterns";

export function replaceSpacesWithUnderscore(filename: string): string {
  return filename.trim().replace(SPACES_PATTERN, "_");
}
