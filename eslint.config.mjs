import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import hooksPlugin from "eslint-plugin-react-hooks";
import pluginReactConfig, {
  plugins,
} from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";

const compat = new FlatCompat();

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: ["react"],
  },
  pluginJs.configs.recommended,
  // Tailwind
  // React
  ...fixupConfigRules(pluginReactConfig),
  {
    plugins: {
      "react-hooks": hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  // NextJS
  {
    ignores: [".next/"],
  },
  ...fixupConfigRules(compat.extends("plugin:@next/next/core-web-vitals")),
  // Rules config
  {
    rules: {
      "react/react-in-jsx-scope": 0,
      "react/no-unescaped-entities": 0,
      "react/prop-types": 0,
    },
  },
  // Ignore files
  {
    ignores: ["tailwind.config.js", "next.config.js", "*.js"],
  },
];
