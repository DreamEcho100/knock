import { IProduct } from 'types';

export const getAllProducts = async () => {
	const productsResponse = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_PATH}/products`
	);

	const productsResult: {
		products: IProduct[];
	} = await productsResponse.json();

	return productsResult.products;
};
export const getProductById = async (id: string) => {
	const productResponse = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_PATH}/products/product/?id=${id}`
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
