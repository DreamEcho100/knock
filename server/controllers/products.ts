import setFields from '@utils/common/productFields/productFields';
import { getShopifyClient } from '@utils/core/shopify';

import type { NextApiRequest, NextApiResponse } from 'next';

//------------ get one product by id

export const getOneProductById = async (id: string) => {
	const client = getShopifyClient();

	if (isNaN(Number(id))) {
		const response = await client.product.fetchByHandle(id);

		const otherData =
			'handle' in response && typeof (response as any).handle === 'string'
				? setFields((response as any).handle)
				: response;

		const product = {
			...response,
			...otherData
		};

		return product;
	}
	const response = await client.product.fetch(`gid://shopify/Product/${id}`);

	const otherData =
		'handle' in response && typeof (response as any).handle === 'string'
			? setFields((response as any).handle)
			: response;

	const product = {
		...response,
		...otherData
	};

	return product; // as IProduct;
};

const getOneProductController = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const product = await getOneProductById(req.query.id as string);

	if (!product) {
		res.statusCode = 404;
		throw new Error('Product not found');
	}

	return res.status(200).json({
		success: true,
		message: '',
		product
	});
};

//--------  getAllProducts

export const getAllProducts = async () => {
	const client = getShopifyClient();

	return await client.product.fetchAll(); // as IProduct[];
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
	getAllProducts: getAllProductsController
};

export default productsController;
