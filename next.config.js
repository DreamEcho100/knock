/** @type {import('next').NextConfig} */

const securityHeaders = [
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN',
	},
	{
		key: 'Content-Security-Policy',
		value: "frame-ancestors 'self'",
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
];

const nextConfig = (phase, { defaultConfig }) => {
	return {
		reactStrictMode: true,
		swcMinify: true,
		images: {
			domains: ['cdn.shopify.com', 'api.pluginsthatknock.com'],
		},
		typescript: { ignoreBuildErrors: true },
		eslint: { ignoreDuringBuilds: true },
		// eslint-disable-next-line @typescript-eslint/require-await
		redirects: async () => {
			return [
				{
					source: '/pages/contact',
					destination: '/contact-us',
					permanent: true,
				},
				{
					source: '/collections/frontpage',
					destination: '/',
					permanent: true,
				},
				{
					source: '/collections/all',
					destination: '/',
					permanent: true,
				},
				{
					source: '/collections',
					destination: '/',
					permanent: true,
				},
			];
		},
		// eslint-disable-next-line @typescript-eslint/require-await
		headers: async () => {
			return [
				{
					source: '/',
					headers: securityHeaders,
				},
				{
					source: '/knock',
					headers: securityHeaders,
				},
				{
					source: '/knock-clipper',
					headers: securityHeaders,
				},
				{
					source: '/drums-that-knock',
					headers: securityHeaders,
				},
				{
					source: '/faqs',
					headers: securityHeaders,
				},
				{
					source: '/policies/terms-of-service',
					headers: securityHeaders,
				},
				{
					source: '/policies/privacy-policy',
					headers: securityHeaders,
				},
				{
					source: '/policies/refund-policy',
					headers: securityHeaders,
				},
				{
					source: '/policies/shipping-policy',
					headers: securityHeaders,
				},
				{
					source: '/products/:path',
					headers: securityHeaders,
				},
				{
					source: '/boutique/:path',
					headers: securityHeaders,
				},
			];
		},
	};
};

module.exports = nextConfig;
