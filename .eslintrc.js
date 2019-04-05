module.exports = {
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    "plugin:vue/recommended"
  ],
  rules: {
    "vue/array-bracket-spacing": ["error", "always"],
    "vue/arrow-spacing": ["error", { "before": true, "after": true }],
    "vue/block-spacing": ["error", "always"],
    "vue/brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "vue/camelcase": ["error", { ignoreDestructuring: true }],
    "vue/comma-dangle": ["error", "always-multiline"],
    "vue/component-name-in-template-casing": ["error", "kebab-case", {
      "registeredComponentsOnly": false,
      "ignores": []
    }],
    // "vue/dot-location": ["error", "property"],
    "vue/eqeqeq": ["error", "always"],
    "vue/key-spacing": "error",
    // "vue/keyword-spacing": "error",
    "vue/match-component-file-name": ["error", {
      "extensions": ["vue", "js", "jsx"],
      "shouldMatchCase": true
    }],
    "vue/no-boolean-default": ["error", "no-default"],
    // "vue/no-deprecated-scope-attribute": "error",
    // "vue/no-empty-pattern": "error",
    "vue/no-restricted-syntax": "error",
    "vue/object-curly-spacing": ["error", "always"],
    "vue/require-direct-export": "error",
    "vue/script-indent": ["error", 2],
    "vue/space-infix-ops": "error",
    "vue/space-unary-ops": "error",
    "vue/v-on-function-call": ["error", "never"]
  }
}
