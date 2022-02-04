module.exports = {
	mode: "jit",
	content: [
		"./components/**/*.{js,jsx,ts,tsx}",
		"./pages/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			boxShadow: {
				form: "0px 2px 5px 3px rgba(43, 95, 165, 0.15)",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
