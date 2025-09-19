import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/**/*.ts"],
  clean: true,
  format: "esm",
  outDir: "dist",
  esbuildOptions(options) {
    // Aqui você adiciona loaders extras
    options.loader = {
      ...options.loader,
      ".sql": "text", // lê arquivos SQL como string
    };
  },
});
