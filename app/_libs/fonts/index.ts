import localFont from 'next/font/local';

export const sourceSansPro = localFont({
	src: [
		{
			path: './source-sans-pro/SourceSansPro-ExtraLight.otf',
			weight: '200',
			style: 'normal',
		},
		{
			path: './source-sans-pro/SourceSansPro-ExtraLightIt.otf',
			weight: '200',
			style: 'italic',
		},
		{
			path: './source-sans-pro/SourceSansPro-Light.otf',
			weight: '300',
			style: 'normal',
		},
		{
			path: './source-sans-pro/SourceSansPro-LightIt.otf',
			weight: '300',
			style: 'italic',
		},
		{
			path: './source-sans-pro/SourceSansPro-Regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: './source-sans-pro/SourceSansPro-It.otf',
			weight: '400',
			style: 'italic',
		},
		{
			path: './source-sans-pro/SourceSansPro-Semibold.otf',
			weight: '600',
			style: 'normal',
		},
		{
			path: './source-sans-pro/SourceSansPro-SemiboldIt.otf',
			weight: '600',
			style: 'italic',
		},
		{
			path: './source-sans-pro/SourceSansPro-Bold.otf',
			weight: '700',
			style: 'normal',
		},
		{
			path: './source-sans-pro/SourceSansPro-BoldIt.otf',
			weight: '700',
			style: 'italic',
		},
		{
			path: './source-sans-pro/SourceSansPro-Black.otf',
			weight: '900',
			style: 'normal',
		},
		{
			path: './source-sans-pro/SourceSansPro-BlackIt.otf',
			weight: '900',
			style: 'italic',
		},
	],
	display: 'swap',
	preload: true,
	fallback: ['sans-serif'],
	variable: '--font-source-sans-pro',
});

export const decapv16 = localFont({
	src: './decapv16/DECAPV16/decapv16-webfont.woff2',
	display: 'swap',
	preload: true,
	fallback: ['sans-serif'],
	variable: '--font-decapv16',
});
