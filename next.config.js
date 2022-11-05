/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['cdn.shopify.com']
	},
	experimental: {
		// appDir: true
		runtime: 'experimental-edge`'
	}
};

module.exports = nextConfig;
