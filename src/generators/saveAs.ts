import { generateZip } from "./generateZip";

export function saveAs() {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    const isCtrlS = (e.ctrlKey || e.metaKey) && e.key === "s";

    if (isCtrlS) {
      e.preventDefault();
      generateZip();
    }
  });
}
