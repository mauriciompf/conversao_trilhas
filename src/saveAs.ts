// import { adjustIframes } from "./adjustIframes";
// import { downloadAsZip } from "./downloadAsZip";
// import { getMetadata } from "./getMetadata";

import { downloadZip } from "./downloadZip";

export async function saveAs() {
  // const metadata = getMetadata(host);

  window.addEventListener("keydown", async (e: KeyboardEvent) => {
    const commandSaveAs = (e.ctrlKey || e.metaKey) && e.key === "s"; // Ctrl + s

    if (commandSaveAs) {
      e.preventDefault();
      // adjustIframes(); // Replace lazyloading to lazyload

      await downloadZip();
    }
  });
}
