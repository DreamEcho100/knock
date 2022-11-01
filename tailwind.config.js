/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./utils/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			backgroundColor: {
				primary: {
					1: '#000000',
					2: '#111111',
					3: '#151515',
					4: '#1A1B1D'
				},
				secondary: {
					1: '#7548FE '
				}
			},
			textColor: {
				primary: {
					1: '#fff',
					2: '#C5C5C5', // '#b4b4b4'
					3: '#A5A5A5'
				}
			},
			colors: {
				bg: {
					primary: {
						1: '#000000',
						2: '#111111',
						3: '#151515',
						4: '#1A1B1D'
					},
					secondary: {
						1: '#7548FE '
					}
				},
				text: {
					primary: {
						1: '#fff',
						2: '#b4b4b4', // '#b4b4b4'
						3: '#A5A5A5'
					}
				}
			}
		}
	},
	plugins: []
};
