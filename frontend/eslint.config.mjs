import { parseForESLint } from "@babel/eslint-parser";

export default [
  {
    files: ["*.js", "*.jsx"],
    languageOptions: {
      parser: {
        parseForESLint,
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {},
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["craco.config.js", "tailwind.config.js"],
    languageOptions: {
      parser: {
        parseForESLint,
        requireConfigFile: false,
      },
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {},
  },
];