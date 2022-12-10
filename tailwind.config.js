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
			screens: {
				'extra-xl-sm': '384px',
				// // => @media (min-width: 384px) { ... }
				'extra-sm': '512px',
				// => @media (min-width: 512px) { ... }

				sm: '640px',
				// => @media (min-width: 640px) { ... }
				md: '768px',
				// => @media (min-width: 768px) { ... }
				lg: '1024px',
				// => @media (min-width: 1024px) { ... }
				// ...defaultTheme,

				xl: '1280px',
				// => @media (min-width: 1280px) { ... }
				'2xl': '1536px'
				// => @media (min-width: 1536px) { ... }
			},
			backgroundColor: {
				primary: {
					1: '#000000',
					2: '#111111',
					3: '#151515',
					4: '#1A1B1D',
					5: '#303030'
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
						4: '#1A1B1D',
						5: '#303030'
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
			},
			spacing: {
				'main-nav-h': 'var(--main-nav-h, 6rem)'
			}
		}
	},
	plugins: []
};
