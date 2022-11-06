import { IProduct } from 'types';

const getAppApiPath = () =>
	typeof window === 'undefined'
		? // !!!
		  process.env.NEXT_PUBLIC_VERCEL_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
			: process.env.NEXT_PUBLIC_BACKEND_ABSOLUTE_PATH
		: process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH;

export const getAllProducts = async () => {
	console.log('---------------------');
	console.log('getAppApiPath()', getAppApiPath());
	console.log('---------------------');
	const productsResponse = await fetch(`${getAppApiPath()}/products`);

	const productsResult: {
		products: IProduct[];
	} = await productsResponse.json();

	return productsResult.products;
};
export const getProductById = async (id: string) => {
	const productResponse = await fetch(
		`${getAppApiPath()}/products/product/?id=${id}`
	);

	const productResult: {
		product: IProduct;
	} = await productResponse.json();

	return productResult.product;
};

const appApi = {
	get: {
		allProducts: getAllProducts
	}
};

export default appApi;
