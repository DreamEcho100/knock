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

export const getAllProducts = async (category:string) => {
	
	const client = Client.buildClient({
		domain: process.env.DOMAINE,
		storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN
	});

	const products = await client.product.fetchAll()

	
	const digital_product =  products.filter((el:any) => el.productType !== 'Merch')
	const merch =  products.filter((el:any) => el.productType === 'Merch')
	const sample_packs =  products.filter((el:any) => el.productType === '')
	const tutorial = products.filter((el:any) => el.productType === 'Tutorial')
	const audio_plugin = products.filter((el:any) => el.productType === "Sound Editing Software")

	

	if (!category) {
		return (products) as IProduct[];
	}

	switch (category) {
		case 'digital-product':
		return (digital_product) as IProduct[];
		case 'sample-packs':
		return (sample_packs) as IProduct[];
		case 'tutorial':
		return (tutorial) as IProduct[];
		case 'audio-plugin':
		return (audio_plugin) as IProduct[];
		case 'merch':
		return (merch) as IProduct[];
		default:
		return ([]) as IProduct[];
	}
	
};



const getAllProductsController = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {

	const category = req.query.category

	const products = await getAllProducts(category as string);


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
