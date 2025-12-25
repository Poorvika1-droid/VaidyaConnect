module.exports = {
  root: true,
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
      extends: ["next/core-web-vitals", "next/typescript"],
    },
  ],
  ignorePatterns: [".next", "node_modules"],
};
