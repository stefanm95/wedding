// prettier.config.js

/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],

  tailwindFunctions: ["clsx", "cn"],

  printWidth: 100,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
};
