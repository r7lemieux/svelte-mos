import tseslint from 'typescript-eslint';

export default tseslint.config({
	root: true,
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	plugins: {
		'svelte3': svelte,
		'@typescript-eslint': tseslint.plugin,
	},
	languageOptions: {
		parser: tseslint.parser,
		parserOptions: {
			project: true,
			sourceType: 'module',
			ecmaVersion: 2020,
		},
	},
	settings: {
		'svelte3/typescript': () => require('typescript'),
	},
	rules: {
		'no-empty-function': 1,
		semi: ['warn', 'never'],
		'no-useless-escape': ['off'],
		'no-explicit-any': ['off'],
		'no-inferrable-types': ['off'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
});