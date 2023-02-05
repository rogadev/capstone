const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			serif: ['Lora', ...defaultTheme.fontFamily.serif],
			sans: ['Poppins', ...defaultTheme.fontFamily.sans],
			mono: ['Source Code Pro', ...defaultTheme.fontFamily.mono]
		},
		extend: {
			colors: {
				primary: '#22c55e',
				secondary: '#B80C09',
				accent: '#D90368',
				dark: '#0f172a',
				mid: '#abb8c9',
				light: '#fafafa'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
