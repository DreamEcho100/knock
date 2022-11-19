import Client from 'shopify-buy';

export const getIdFromGid = (gid: string | number) =>
	typeof gid === 'number'
		? gid
		: gid.replace(/\?.+/g, '').replace(/[^\d+]/g, '');

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

export const priceCurrencyFormatter = (
	price: string,
	currency: string,
	options?: {
		toFixed?: number;
	}
) => {
	let formattedPrice =
		parseInt(price) === parseFloat(price) ? parseInt(price).toString() : price;

	if (options?.toFixed && options?.toFixed > 0)
		formattedPrice = parseFloat(formattedPrice).toFixed(options.toFixed);
	if (currency.toLocaleUpperCase() === 'USD') return `$${formattedPrice}`;

	return `${price} ${currency}`;
};
