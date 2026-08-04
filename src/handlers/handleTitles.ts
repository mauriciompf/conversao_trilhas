import { normalizeDocHeadings } from "../transformers";
import { applyTitleClassToParagraphs } from "../transformers/applyTitleClassToParagraphs";

export function handleTitles() {
  normalizeDocHeadings();
  applyTitleClassToParagraphs();
}
