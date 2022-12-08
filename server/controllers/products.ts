import { getShopifyClient } from '@utils/core/shopify';

import { IProduct } from 'types';

import type { NextApiRequest, NextApiResponse } from 'next';
import setFields from '@utils/common/productFields/productFields';

//------------ get one product by id

export const getOneProductById = async (id: string) => {
	const client = getShopifyClient();

	const product:any = await client.product.fetch(`gid://shopify/Product/${id}`)


	const newFields = setFields(product.handle)

	const newProductObject = {
		...product,
		...newFields
	}

	return (newProductObject) as unknown as IProduct;
};
export const getOneProductByHandle = async (handle: string) => {
	const client = getShopifyClient();

	return (await client.product.fetchByHandle(handle)) as unknown as IProduct;
};

const getOneProductController = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const product =
		typeof req.query.id === 'string'
			? await getOneProductById(req.query.id)
			: typeof req.query.handle === 'string'
			? await getOneProductByHandle(req.query.handle)
			: undefined;

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
type productType = 'Tutorial' | 'Sound Editing Software';

export const getAllProducts = async ({
	typesToExclude,
	typesToInclude
}: { typesToExclude?: productType[]; typesToInclude?: productType[] } = {}) => {
	const client = getShopifyClient();

	let products = (await client.product.fetchAll()) as unknown as IProduct[];

	if (Array.isArray(typesToExclude))
		products = products.filter(
			(product) => !typesToExclude.includes((product as any).productType)
		);
	if (Array.isArray(typesToInclude))
		products = products.filter((product) =>
			typesToInclude.includes((product as any).productType)
		);

	return products;
};

const getAllProductsController = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const category = req.query.category;

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
