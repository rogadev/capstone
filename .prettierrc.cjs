module.exports = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	plugins: [
		'prettier-plugin-svelte',
		'prettier-plugin-svelte',
		'prettier-plugin-organize-imports',
		'prettier-plugin-tailwindcss'
	],
	pluginSearchDirs: false,
	tailwindConfig: './tailwind.config.cjs',
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte'
			}
		}
	]
};
