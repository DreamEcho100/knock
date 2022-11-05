import type { NextApiRequest, NextApiResponse } from 'next';

const Client = require('shopify-buy');
// fetch = require("node-fetch");

export const createCheckout = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});
	const checkout = await client.checkout.create();

	const data = {
		checkoutId: checkout.id.split('/')[4].split('?key=')[0],
		checkoutKey: checkout.id.split('/')[4].split('?key=')[1]
	};

	return res.status(200).json({
		success: true,
		message: '',
		checkoutIdAndKey: data,
		checkout
	});
};

export const updateCheckout = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const { checkoutId, input } = req.body;

	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});
	const checkout = await client.checkout.updateAttributes(checkoutId, input);

	return res.status(200).json({
		success: true,
		message: '',
		checkout
	});
};

export const getCheckout = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const { checkoutId, checkoutKey } = req.query;

	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});
	const checkout = await client.checkout.fetch(
		`gid://shopify/Checkout/${checkoutId}?key=${checkoutKey}`
	);

	if (!checkout) {
		return res.status(404).json({
			success: false,
			message: 'Checkout not found'
		});
	}

	return res.status(200).json({
		success: true,
		message: '',
		checkout
	});
};

export const addItemToCheckout = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const { checkoutId, lineItemsToAdd } = req.body;

	/*
    const lineItemsToAdd = [
    {
    variantId: 'gid://shopify/ProductVariant/29106064584',
    quantity: 5,
    customAttributes: [{key: "MyKey", value: "MyValue"}]
    }
    ];
    */

	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});
	const item = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);

	return res.status(200).json({
		success: true,
		message: '',
		item
	});
};

export const updateItemInCheckout = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const { checkoutId, lineItemsToUpdate } = req.body;

	/*
    const lineItemsToUpdate = [
    {id: 'gid://shopify/CheckoutLineItem/194677729198640?checkout=e3bd71f7248c806f33725a53e33931ef', quantity: 2}
    ];
    */

	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});
	const item = await client.checkout.updateLineItems(
		checkoutId,
		lineItemsToUpdate
	);

	return res.status(200).json({
		success: true,
		message: '',
		item
	});
};

export const removeItemInCheckout = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const { checkoutId, lineItemIdsToRemove } = req.body;

	/*
    const lineItemIdsToRemove = [
    'gid://shopify/CheckoutLineItem/194677729198640?checkout=e3bd71f7248c806f33725a53e33931ef'
    ];

    */

	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});
	const item = await client.checkout.removeLineItems(
		checkoutId,
		lineItemIdsToRemove
	);

	return res.status(200).json({
		success: true,
		message: '',
		item
	});
};

const checkoutsController = {
	createOne: createCheckout,
	addOne: addItemToCheckout,
	updateOne: updateItemInCheckout,
	removeOne: removeItemInCheckout,
	update: updateCheckout,
	getAll: getCheckout
};

export default checkoutsController;
