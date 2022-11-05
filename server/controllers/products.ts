import type { NextApiRequest, NextApiResponse } from 'next';

const Client = require('shopify-buy');

const getOneProduct = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});
	const product = await client.product.fetch(
		`gid://shopify/Product/${req.query.id}`
	);

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

const getOneProductByHandle = async (
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

const getAllProduct = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});
	const products = await client.product.fetchAll();

	return res.status(200).json({
		success: true,
		message: '',
		products
	});
};

const productsController = {
	getOneProduct,
	getOneProductByHandle,
	getAllProduct
};

export default productsController;
