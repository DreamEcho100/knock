import type { ICheckout, ICheckoutIdAndKey, ILineItem, IProduct } from 'types';

const throwIfResponseError = async (response: Response) => {
	if (!response.ok) {
		let errorMessage: string;
		const text = await response.text();

		errorMessage = text;

		throw new Error(`Error, ${response.statusText}, ${errorMessage}`);
	}
};

// const tryCatch = async <T>(func: T) => {
// 	try {
// 		if (typeof func === 'function') func();
// 	} catch (error) {}
// };

const getAppApiPath = () =>
	typeof window === 'undefined'
		? // !!!
		  process.env.NEXT_PUBLIC_APP_DOMAINE
			? `https://${process.env.NEXT_PUBLIC_APP_DOMAINE}/api`
			: process.env.NEXT_PUBLIC_BACKEND_ABSOLUTE_PATH
		: process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH;

export const getAllProducts = async () => {
	const response = await fetch(`${getAppApiPath()}/products`);

	const productsResult: {
		products: IProduct[];
	} = await response.json();

	// await throwIfResponseError(response);

	return productsResult.products;
};
export const getProductById = async (id: string) => {
	const response = await fetch(`${getAppApiPath()}/products/product/?id=${id}`);

	// await throwIfResponseError(response);

	const productResult: {
		product: IProduct;
	} = await response.json();

	return productResult.product;
};
export const getProductByHandle = async (handle: string) => {
	const response = await fetch(
		`${getAppApiPath()}/products/product/?handle=${handle}`
	);

	// await throwIfResponseError(response);

	const productResult: {
		product: IProduct;
	} = await response.json();

	return productResult.product;
};
export const createOneCheckout = async () => {
	const response = await fetch(`${getAppApiPath()}/checkouts/create-one`);

	const result: {
		checkoutIdAndKey: ICheckoutIdAndKey;
		checkout: ICheckout;
	} = await response.json();

	// await throwIfResponseError(response);

	return {
		checkoutIdAndKey: result.checkoutIdAndKey,
		checkout: result.checkout
	};
};
export const deleteOneCheckout = async (
	checkoutId: string,
	lineItemIdsToRemove: string[]
) => {
	const response = await fetch(`${getAppApiPath()}/checkouts/products`, {
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

	// await throwIfResponseError(response);

	const result = await response.json();

	return result();
};
export const getOneCheckout = async (
	checkoutId: string,
	checkoutKey: string
) => {
	const response = await fetch(
		`${getAppApiPath()}/checkouts/get-one/?checkoutId=${checkoutId}&checkoutKey=${checkoutKey}`,
		{
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0'
			}
		}
	);

	// await throwIfResponseError(response);

	const result: {
		checkout: ICheckout;
	} = await response.json();

	return {
		checkout: result.checkout
	};
};
export const addManyProductsToCheckout = async (
	checkoutId: string,
	lineItemsToAdd: {
		variantId: string; //'gid://shopify/ProductVariant/41485788053727';
		quantity: number;
	}[]
) => {
	const response = await fetch(`${getAppApiPath()}/checkouts/products`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ checkoutId, lineItemsToAdd })
	});

	// await throwIfResponseError(response);

	const result: {
		item: {
			lineItems: ILineItem[];
		};
	} = await response.json();

	return result.item.lineItems;
};
export const updateManyProductsToCheckout = async (
	checkoutId: string,
	lineItemsToUpdate: {
		id: string; //'gid://shopify/ProductVariant/41485788053727';
		quantity: number;
	}[]
) => {
	const response = await fetch(`${getAppApiPath()}/checkouts/products`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ checkoutId, lineItemsToUpdate })
	});

	// await throwIfResponseError(response);

	const result: {
		item: {
			lineItems: ILineItem[];
		};
	} = await response.json();

	return result.item.lineItems;
};
export const removeManyProductsToCheckout = async (
	checkoutId: string,
	lineItemIdsToRemove: string[]
) => {
	const response = await fetch(`${getAppApiPath()}/checkouts/products`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ checkoutId, lineItemIdsToRemove })
	});

	// await throwIfResponseError(response);

	const result: {
		item: {
			lineItems: ILineItem[];
		};
	} = await response.json();

	return result.item.lineItems;
};

export const checkoutApi = {
	createOne: createOneCheckout,
	deleteOne: deleteOneCheckout,
	getOne: getOneCheckout,
	products: {
		addMany: addManyProductsToCheckout,
		removeMany: removeManyProductsToCheckout,
		updateMany: updateManyProductsToCheckout
	}
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
