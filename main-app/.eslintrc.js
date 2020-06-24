module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    "@vue/standard"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "handle-callback-err": "off",
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    semi: ["error", "always"],
    "no-new": "off",
    "vue/no-v-html": "off"
  }
};
