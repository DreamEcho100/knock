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
					1: '#7548FE ',
					2: '#EF4370'
				}
			},
			textColor: {
				primary: {
					1: '#fff',
					2: '#C5C5C5', // '#b4b4b4'
					3: '#A1A1A1',
					4: '#A5A5A5',
					5: '#BEBEBE'
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
						1: '#7548FE ',
						2: '#EF4370'
					}
				},
				text: {
					primary: {
						1: '#fff',
						2: '#C5C5C5', // '#b4b4b4'
						3: '#A1A1A1',
						4: '#A5A5A5',
						5: '#BEBEBE'
					}
				}
			}
		}
	},
	plugins: []
};
