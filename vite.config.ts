import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import viteOverlay from "@visulima/vite-overlay";

export default defineConfig({
  plugins: [
    tailwindcss(),
    viteOverlay(),
    {
      name: "force-full-reload",
      handleHotUpdate({ server }) {
        server.ws.send({ type: "full-reload" });
        return [];
      },
    },
  ],
});
