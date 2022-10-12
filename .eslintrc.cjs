module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	parser: 'vue-eslint-parser',
	/** Lower priority than parser */
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 'latest',
		sourceType: 'module',
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
	/*
	 * "off" || 0    ==>  disabled rule
	 * "warn" || 1   ==>  warning（not effect）
	 * "error" || 2  ==>  throw an error（effect）
	 */
	rules: {
		/** eslint (http://eslint.cn/docs/rules) */
		'no-var': 'error',
		'no-multiple-empty-lines': ['error', { max: 1 }],
		'no-use-before-define': 'off',
		'prefer-const': 'error',
		'no-irregular-whitespace': 'off',

		/**  typeScript (https://typescript-eslint.io/rules) */
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',

		/**  vue (https://eslint.vuejs.org/rules) */
		'vue/no-v-html': 'off',
		'vue/script-setup-uses-vars': 'error',
		'vue/v-slot-style': 'off',
		'vue/one-component-per-file': 'off',
		'vue/attribute-hyphenation': 'off',
		'vue/multi-word-component-names': 'off',
	},
};
