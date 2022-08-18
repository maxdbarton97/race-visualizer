module.exports = {
  extends: "airbnb-typescript-prettier",
  rules: {
    "no-debugger": "warn",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "@typescript-eslint/no-namespace": "off",
  },
};
