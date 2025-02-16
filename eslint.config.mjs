import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";

export default [
  {
    files: ["src/**/*.{ts,js}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier,
      import: importPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "import/order": ["warn", { alphabetize: { order: "asc" } }],
    },
  },
];
