import { adjustIframes } from "./adjustIframes";
import { generateZip } from "./generateZip";

export async function saveAs() {
  window.addEventListener("keydown", async (e: KeyboardEvent) => {
    const isCtrlS = (e.ctrlKey || e.metaKey) && e.key === "s"; // Ctrl + s

    if (isCtrlS) {
      e.preventDefault();
      adjustIframes();
      generateZip();
    }
  });
}
