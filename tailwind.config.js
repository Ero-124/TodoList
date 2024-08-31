/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	compilerOptions: {
		typeRoots: ['./node_modules/@types', './src/types'],
	},
}
