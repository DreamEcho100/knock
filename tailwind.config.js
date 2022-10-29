/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
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
					3: '#151515'
				}
			},
			textColor: {
				primary: {
					1: '#fff',
					2: '#b4b4b4'
				}
			},
			borderColor: {
				bg: {
					primary: {
						1: '#111111',
						2: '#151515'
					}
				},
				text: {
					primary: {
						1: '#fff',
						2: '##b4b4b4'
					}
				}
			}
		}
	},
	plugins: []
};
