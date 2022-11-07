import { ICheckout, ICheckoutIdAndKey, IProduct } from 'types';

const getAppApiPath = () =>
	typeof window === 'undefined'
		? // !!!
		  process.env.NEXT_PUBLIC_VERCEL_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
			: process.env.NEXT_PUBLIC_BACKEND_ABSOLUTE_PATH
		: process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH;

export const getAllProducts = async () => {
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

export const createOneCheckout = async () => {
	const response = await fetch(`${getAppApiPath()}/checkouts/create`);

	const result: {
		checkoutIdAndKey: ICheckoutIdAndKey;
		checkout: ICheckout;
	} = await response.json();

	return {
		checkoutIdAndKey: result.checkoutIdAndKey,
		checkout: result.checkout
	};
};

export const deleteOneCheckout = async (
	checkoutId: string,
	lineItemIdsToRemove: string[]
) => {
	return await fetch(`${getAppApiPath()}/checkouts/delete-one`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
			{
				checkoutId,
				lineItemIdsToRemove
			}
			// productsData.map((product) => product.id)
		)
	});
};

export const getOneCheckout = async (
	checkoutId: string,
	checkoutKey: string
) => {
	const response = await fetch(
		`${getAppApiPath()}/checkouts/get-one/?checkoutId=${checkoutId}&checkoutKey=${checkoutKey}`
	);

	const result: {
		checkout: ICheckout;
	} = await response.json();

	return {
		checkout: result.checkout
	};
};

export const checkoutApi = {
	createOne: createOneCheckout,
	deleteOne: deleteOneCheckout,
	getOne: getOneCheckout
};

const appApi = {
	checkout: checkoutApi,
	Products: {
		getAll: getAllProducts
	}
};

export default appApi;

export type TCreateOneCheckoutReturnType = Awaited<
	ReturnType<typeof createOneCheckout>
>;
export type TGetOneCheckoutReturnType = Awaited<
	ReturnType<typeof getOneCheckout>
>;
