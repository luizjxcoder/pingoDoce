// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// 🔧 Configuração dinâmica do base (corrige deploy no GitHub Pages)
export default defineConfig(({ mode }) => {
  const repoName = "pingoDoce"; // <-- nome exato do repositório no GitHub
  const isDev = mode === "development";

  return {
    plugins: [react()],
    base: "/pingoDoce/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      open: true,
      port: 5173,
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
    },
  };
});
