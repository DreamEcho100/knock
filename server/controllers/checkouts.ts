import { getShopifyClient } from '@utils/core/shopify';

import axios from 'axios';

import { print } from 'graphql';

import gql from 'graphql-tag';

import type { NextApiRequest, NextApiResponse } from 'next';

import { z } from 'zod';

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

export const associateClientToCheckout = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const input = z
		.object({
			checkoutId: z.string(),
			checkoutKey: z.string(),
			customerAccessToken: z.string()
		})
		.parse(req.body);

	const customer = gql`
		mutation associateCustomerWithCheckout(
			$checkoutId: ID!
			$customerAccessToken: String!
		) {
			checkoutCustomerAssociateV2(
				checkoutId: $checkoutId
				customerAccessToken: $customerAccessToken
			) {
				checkout {
					id
				}
				checkoutUserErrors {
					code
					field
					message
				}
				customer {
					id
				}
			}
		}
	`;

	const response = await axios.post(
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
		{
			query: print(customer),
			variables: {
				checkoutId: `gid://shopify/Checkout/${input.checkoutId}?key=${input.checkoutKey}`,
				customerAccessToken: input.customerAccessToken
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN,
				'accept-encoding': 'null'
			}
		}
	);

	if (response.data.errors) {
		res.statusCode = 401;
		throw new Error(response.data.errors[0].message);
	}

	if (
		response.data.data.checkoutCustomerAssociateV2 &&
		response.data.data.checkoutCustomerAssociateV2.checkoutUserErrors.length
	) {
		res.statusCode = 401;
		throw new Error(
			response.data.data.checkoutCustomerAssociateV2.checkoutUserErrors[0].message
		);
	}

	return res.status(200).json({
		success: true,
		message: 'Costumer associated successfully!',
		customer: response.data.data.checkoutCustomerAssociateV2.customer
	});
};

export const disassociateClientToCheckout = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const input = z
		.object({
			checkoutId: z.string(),
			checkoutKey: z.string()
		})
		.parse(req.body);

	const customer = gql`
		mutation checkoutCustomerDisassociateV2($checkoutId: ID!) {
			checkoutCustomerDisassociateV2(checkoutId: $checkoutId) {
				checkout {
					id
					email
				}
				checkoutUserErrors {
					code
					field
					message
				}
			}
		}
	`;

	const response = await axios.post(
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
		{
			query: print(customer),
			variables: {
				checkoutId: `gid://shopify/Checkout/${input.checkoutId}?key=${input.checkoutKey}`
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN,
				'accept-encoding': 'null'
			}
		}
	);

	if (response.data.errors) {
		res.statusCode = 401;
		throw new Error(response.data.errors[0].message);
	}

	if (
		response.data.data.checkoutCustomerDisassociateV2 &&
		response.data.data.checkoutCustomerDisassociateV2.checkoutUserErrors.length
	) {
		res.statusCode = 401;
		throw new Error(
			response.data.data.checkoutCustomerDisassociateV2.checkoutUserErrors[0].message
		);
	}

	return res.status(200).json({
		success: true,
		message: 'Costumer disassociated successfully!',
		customer: response.data.data.checkoutCustomerDisassociateV2.checkout
	});
};
const checkoutsController = {
	createOne: createCheckout,
	addOne: addItemToCheckout,
	updateOne: updateItemInCheckout,
	removeOne: removeItemInCheckout,
	update: updateCheckout,
	getAll: getCheckout,
	associateClient: associateClientToCheckout,
	disassociateClient: disassociateClientToCheckout
};

export default checkoutsController;
