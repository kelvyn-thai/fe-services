import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true }),
    // libInjectCss()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // ✅ <-- required
      name: "@repo/ui",
      fileName: (format) => `core-ui.${format}.js`,
      formats: ["es", "cjs", "umd"], // optional
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    cssCodeSplit: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
