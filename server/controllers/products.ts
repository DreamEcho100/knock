import { getShopifyClient } from '@utils/core/shopify';

import { IProduct } from 'types';

import type { NextApiRequest, NextApiResponse } from 'next';
import setFields from '@utils/common/productFields/productFields';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';

//------------ get one product by id

export const getOneProductById = async (id: string) => {
	const client = getShopifyClient();

	const product: any = await client.product.fetch(
		`gid://shopify/Product/${id}`
	);

	let response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-DTK-product?productHandle=${product.handle}`
	);

	let newFieldsApi = response.data.DTKproduct;
	delete newFieldsApi.id;

	const newProductObject = {
		...product,
		...newFieldsApi
	};

	return newProductObject as unknown as IProduct;
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
	const product = gql`
		query getCollectionById($id: ID!) {
			collection(id: $id) {
				title
				products(first: 200) {
					edges {
						node {
							id
							title
							availableForSale
							descriptionHtml
							vendor
							publishedAt
							onlineStoreUrl
							productType
							handle
							images(first: 200) {
								edges {
									node {
										id
										src
										altText
										width
										height
									}
								}
							}
							variants(first: 200) {
								edges {
									node {
										id
										image {
											id
											src
											altText
											width
											height
										}
										price {
											amount
											currencyCode
										}
										compareAtPrice {
											amount
											currencyCode
										}
									}
								}
							}
							createdAt
							updatedAt
						}
					}
				}
			}
		}
	`;

	const response = await axios.post(
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
		{
			query: print(product),
			variables: {
				id: `gid://shopify/Collection/398064812255`
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

	const productArray = response.data.data.collection.products.edges.map(
		(el: any) => el.node
	);
	const newArray = productArray.map((el: any) => {
		return {
			...el,
			variants: [el.variants.edges[0].node],
			images: [el.images.edges[0].node]
		};
	});

	let products = newArray as unknown as IProduct[];

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
