import { IProduct } from 'types';

import type { NextApiRequest, NextApiResponse } from 'next';

const Client = require('shopify-buy');

export const getOneProductById = async (id: string) => {
	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});

	return (await client.product.fetch(
		`gid://shopify/Product/${id}`
	)) as IProduct;
};
const getOneProductController = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});
	const product = await getOneProductById(req.query.id as string);

	if (!product) {
		return res.status(404).json({
			success: false,
			message: 'Product not found'
		});
	}

	return res.status(200).json({
		success: true,
		message: '',
		product
	});
};

export const getAllProducts = async () => {
	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});

	return (await client.product.fetchAll()) as IProduct[];
};
const getOneProductByHandleController = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});
	const product = await client.product.fetchByHandle(req.body.handle);

	return res.status(200).json({
		success: true,
		message: '',
		product
	});
};

const getAllProductsController = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const products = await getAllProducts();

	return res.status(200).json({
		success: true,
		message: '',
		products
	});
};

const productsController = {
	getOneProduct: getOneProductController,
	getOneProductByHandle: getOneProductByHandleController,
	getAllProducts: getAllProductsController
};

export default productsController;
