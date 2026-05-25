import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    exclude: ["e2e/**", "node_modules/**"],
  },
  resolve: {
    // Trailing slash anchors the prefix so it cannot match @scoped/* packages.
    alias: { "@/": path.resolve(__dirname) + "/" },
  },
});
