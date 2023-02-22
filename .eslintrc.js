module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    }, "plugins": [
        "import"
      ],
    "rules": {
        "semi": ["error", "always"]
        //"import/no-commonjs": "error"
    }
}
