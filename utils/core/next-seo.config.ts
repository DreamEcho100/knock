import { type Metadata } from 'next';

export const websiteBasePath = `https://${process.env.NEXT_PUBLIC_APP_DOMAINE}`;

export const defaultSiteName = 'PLUGINS THAT KNOCK';
export const defaultSiteName2 = 'DRUMS THAT KNOCK';
export const defaultSiteName3 = 'KNOCK Plugin - Make Your Drums Knock';
const defaultDescription =
	'The KNOCK Plugin created by DECAP will help you make Drums That Knock hard and punch through your mix. Easy to use for music producers at all levels.';
const defaultTitle = `${defaultSiteName} | KNOCK Plugin - Make Your Drums Knock`;

const SEODefaults: Metadata = {
	metadataBase: new URL(websiteBasePath),
	description: defaultDescription,
	title: defaultTitle,
	themeColor: 'black',
	colorScheme: 'dark',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		// site_name: defaultSiteName,
		url: `${websiteBasePath}/`,
		description: defaultDescription,
		title: defaultTitle,
		images: [
			{
				url: `${websiteBasePath}/images/_.jpeg`,
				width: 700,
				height: 470,
				alt: 'PLUGINS THAT KNOCK Logo',
			},
		],
	},
	twitter: {
		creator: '@decapmusic',
		site: '@PLUGINS THAT KNOCK',
		card: 'summary_large_image',
		title: defaultSiteName,
	},
	creator: 'DECAP',
	applicationName: defaultSiteName,
	robots: 'index, follow',
};

export default SEODefaults;
