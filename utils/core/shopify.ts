import Client from 'shopify-buy';

export const getIdFromGid = (gid: string) => gid.replace(/[^\d+]|\?.+/g, '');

export const getShopifyClient = () => {
	if (!process.env.DOMAINE)
		throw new Error("DOMAINE doesn't exist on the environment variables");
	if (!process.env.SHOPIFY_STOREFRONT_API_TOKEN)
		throw new Error(
			"SHOPIFY_STOREFRONT_API_TOKEN doesn't exist on the environment variables"
		);
	const DOMAINE = process.env.DOMAINE;
	const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN;

	return Client.buildClient({
		domain: DOMAINE,
		storefrontAccessToken: SHOPIFY_STOREFRONT_API_TOKEN
	});
};
