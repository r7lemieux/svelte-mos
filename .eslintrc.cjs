module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    plugins: ['svelte3', '@typescript-eslint'],
    ignorePatterns: ['*.cjs'],
    overrides: [{files: ['*.svelte'], processor: 'svelte3/svelte3'}],
    settings: {
        'svelte3/typescript': () => require('typescript')
    },
    rules: {
        "no-empty-function": 1,
        semi: ['warn', 'never'],
        'no-useless-escape': ['off'],
        'no-explicit-any': ['off'],
        'no-inferrable-types': ['off'],
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020
    },
    env: {
        browser: true,
        es2017: true,
        node: true
    }
}