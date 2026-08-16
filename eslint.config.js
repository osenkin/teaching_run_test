import eslintConfigPrettier from "eslint-config-prettier";

export default [
	{
		ignores: [
			"coverage/**",
			"jest-html-reporters-attach/**",
			"cypress/screenshots/**",
			"cypress/videos/**",
		],
	},

	{
		rules: {
			"no-unused-vars": "error",
			"no-console": "off",
		},
	},
	eslintConfigPrettier,
];
