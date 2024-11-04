import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { type ICustomProduct } from '~/types';
import { getProduct, getProducts } from '~/libs/shopify';

export const getOneCustomProductByHandle = async (handle: string) => {
	const product = await getProduct(handle);

	if (!product) {
		throw new Error('Product not found');
	}

	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-DTK-product?productHandle=${product.handle}`,
	);

	const newFieldsApi = response.data.DTKproduct;

	newFieldsApi && delete newFieldsApi.id;

	const newProductObject = {
		...product,
		...newFieldsApi,
		originalDescription: product.description,
	} as ICustomProduct;

	return newProductObject;
};
const getOneProductByHandleController = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	const product =
		typeof req.query.handle === 'string'
			? await getOneCustomProductByHandle(req.query.handle)
			: typeof req.query.handle === 'string'
				? await getProduct(req.query.handle)
				: undefined;

	if (!product) {
		res.statusCode = 404;
		throw new Error('Product not found');
	}

	return res.status(200).json({
		success: true,
		message: '',
		product,
	});
};

const getAllProductsController = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	const products = await getProducts();

	return res.status(200).json({
		success: true,
		message: '',
		products,
	});
};

const productsController = {
	getOneProductByHandle: getOneProductByHandleController,
	getAllProducts: getAllProductsController,
};

export default productsController;
