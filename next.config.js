/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => {
	return {
		...defaultConfig,
		reactStrictMode: true,
		swcMinify: true,
		images: {
			domains: ['cdn.shopify.com']
		},
		experimental: {
			// appDir: true
			// runtime: 'experimental-edge'
		},
		redirects: async () => {
			return [
				{
					source: '/pages/contact',
					destination: '/contact-us',
					permanent: true
				},
				{
					source: '/collections/frontpage',
					destination: '/',
					permanent: true
				},
				{
					source: '/collections/all',
					destination: '/',
					permanent: true
				},
				{
					source: '/collections',
					destination: '/',
					permanent: true
				}
			];
		}
	};
};

module.exports = nextConfig;
