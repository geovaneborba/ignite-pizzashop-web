module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  plugins: [
    "react-refresh",
    "react-hooks",
    "@typescript-eslint",
    "simple-import-sort",
    "prettier",
  ],
  rules: {
    "simple-import-sort/imports": "error",
    "prettier/prettier": "error",
  },
}
