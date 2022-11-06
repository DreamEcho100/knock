import { IProduct } from 'types';

import type { NextApiRequest, NextApiResponse } from 'next';
import setFields from '@utils/common/productFields/productFields';

const Client = require('shopify-buy');

//------------ get one product by id

export const getOneProductById = async (id: string) => {

	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});

	console.log(isNaN(Number(id)));
	

	if (isNaN(Number(id))) {
	 	const response = await client.product.fetchByHandle(id)

		 const otherData = setFields(response.handle);

		 const product = {
			...response,
			...otherData,
		  };
		 return product as IProduct
	}
		const response = await client.product.fetch(`gid://shopify/Product/${id}`)

		const otherData = setFields(response.handle);

	    const product = {
			...response,
			...otherData,
		  };

		return product as IProduct

};


const getOneProductController = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {

	const product = await getOneProductById(req.query.id as string);

	if (!product) {
		res.statusCode = 404
		throw new Error('Product not found')
	}

	return res.status(200).json({
		success: true,
		message: '',
		product
	});
};


//--------  getAllProducts

export const getAllProducts = async () => {
	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});

	return (await client.product.fetchAll()) as IProduct[];
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
