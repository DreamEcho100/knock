import { getShopifyClient } from '@utils/core/shopify';

import type { NextApiRequest, NextApiResponse } from 'next';

export const createCheckout = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const client = getShopifyClient();
	const checkout = await client.checkout.create();

	const checkoutId =
		typeof checkout.id === 'string' ? checkout.id : checkout.id.toString();

	const data = {
		checkoutId: checkoutId.split('/')[4].split('?key=')[0],
		checkoutKey: checkoutId.split('/')[4].split('?key=')[1]
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

	const client = getShopifyClient();
	// updateAttributes
	const checkout = await client.checkout.updateLineItems(checkoutId, input);

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

	const client = getShopifyClient();
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

	const client = getShopifyClient();
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

	const client = getShopifyClient();
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

	const client = getShopifyClient();
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
