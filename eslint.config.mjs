import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Exclude the archived static site — its minified JS breaks lint.
  globalIgnores(["_legacy/**"]),
]);

export default eslintConfig;
