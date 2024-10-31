export const getIdFromGid = (gid: string | number) =>
	typeof gid === 'number'
		? gid
		: gid.replace(/\?.+/g, '').replace(/[^\d+]/g, '');

export const priceCurrencyFormatter = (
	price: string,
	currency: string,
	options?: {
		toFixed?: number;
	},
) => {
	let formattedPrice =
		parseInt(price) === parseFloat(price) ? parseInt(price).toString() : price;

	if (options?.toFixed && options?.toFixed > 0)
		formattedPrice = parseFloat(formattedPrice).toFixed(options.toFixed);
	if (currency.toLocaleUpperCase() === 'USD') return `$${formattedPrice}`;

	return `${price} ${currency}`;
};
