import { DefaultSeoProps } from 'next-seo';

export const websiteBasePath = `https://${process.env.NEXT_PUBLIC_APP_DOMAINE}`;

export const defaultSiteName = 'PLUGINS THAT KNOCK';
export const defaultSiteName2 = 'DRUMS THAT KNOCK';
export const defaultSiteName3 = 'KNOCK Plugin - Make Your Drums Knock';
const defaultDescription =
	'The KNOCK Plugin created by DECAP will help you make Drums That Knock hard and punch through your mix. Easy to use for music producers at all levels.';
const defaultTitle = `${defaultSiteName} | KNOCK Plugin - Make Your Drums Knock`;

const SEODefaults: DefaultSeoProps = {
	canonical: `${websiteBasePath}/`,
	description: defaultDescription,
	title: defaultTitle,
	openGraph: {
		type: 'website',
		locale: 'en_US',
		site_name: defaultSiteName,
		url: `${websiteBasePath}/`,
		description: defaultDescription,
		title: defaultTitle,
		images: [
			{
				url: `${websiteBasePath}/images/_.jpeg`,
				width: 700,
				height: 470,
				alt: 'PLUGINS THAT KNOCK Logo'
			}
		]
	},
	twitter: {
		handle: '@decapmusic',
		site: '@PLUGINS THAT KNOCK',
		cardType: 'summary_large_image'
	},
	additionalMetaTags: [
		{
			property: 'dc:creator',
			content: 'DECAP'
		},
		{
			name: 'application-name',
			content: defaultSiteName
		},
		{
			httpEquiv: 'x-ua-compatible',
			content: 'IE=edge, chrome=1'
		},
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1.0'
		},
		{
			name: 'color-scheme',
			content: 'dark'
		},
		{
			name: 'robots',
			content: 'index, follow'
		}
	]
};

export default SEODefaults;
