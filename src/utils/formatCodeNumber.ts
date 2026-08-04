import { CODE_NUMBER_PATTERN } from "../definitions/patterns";

export function formatCodeNumber(filename: string): string {
  const match = filename.match(CODE_NUMBER_PATTERN);
  if (!match) return filename;

  const [fullMatch, code] = match;
  const text = filename.slice(fullMatch.length);
  return code.toUpperCase() + "_" + text;
}
