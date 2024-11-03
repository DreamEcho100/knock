import { isObject, findError } from '../utils';
import { ensureStartWith } from '../utils';
import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT } from './constants';
import type {
	Collection,
	Cart,
	Connection,
	ShopifyProduct,
	ShopifyCollection,
	ShopifyCart,
	Image,
	ShopifyErrorLike,
} from './types';

export const collectionsPathSegment = '/search';

// if (!process.env.ADMIN_DOMAINE) {
// 	throw new Error('ADMIN_DOMAINE is not set');
// }

export const shopDomain = process.env.ADMIN_DOMAINE
	? ensureStartWith(process.env.ADMIN_DOMAINE, 'https://')
	: '';

const endpoint = `${shopDomain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;

// if (!process.env.SHOPIFY_STOREFRONT_API_TOKEN) {
// 	throw new Error('SHOPIFY_STOREFRONT_API_TOKEN is not set');
// }
const key = process.env.SHOPIFY_STOREFRONT_API_TOKEN!;

type ExtractVariables<T> = T extends { variables: object }
	? T['variables']
	: never;

export function isShopifyError(error: unknown): error is ShopifyErrorLike {
	if (!isObject(error)) return false;

	if (error instanceof Error) return true;
	return findError(error);
}

export async function shopifyFetch<T>({
	cache,
	headers,
	query,
	tags,
	revalidate,
	variables,
}: {
	cache?: RequestCache;
	next?: NextFetchRequestConfig;
	headers?: HeadersInit;
	query: string;
	tags?: string[];
	revalidate?: number;
	variables?: ExtractVariables<T>;
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
}): Promise<{ status: number; body: T } | never> {
	const next: NextFetchRequestConfig | undefined =
		typeof revalidate === 'number' || typeof tags === 'string'
			? {
					...(tags && { tags }),
					...(revalidate && { revalidate }),
				}
			: undefined;

	try {
		const result = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token': key,
				...headers,
			},
			body: JSON.stringify({
				...(query && { query }),
				...(variables && { variables }),
			}),
			cache,
			next,
		});

		const body = await result.json();

		if (body.errors) {
			console.error('Errors:');
			console.dir(body.errors, { depth: Number.MAX_SAFE_INTEGER });
			throw body.errors[0];
		}

		return {
			status: result.status,
			body,
		};
	} catch (error) {
		if (isShopifyError(error)) {
			throw {
				cause: error.cause?.toString() || 'unknown',
				status: error.status || 500,
				message: error.message,
				query,
			};
		}

		throw {
			error,
			query,
		};
	}
}

export function removeEdgesAndNodes<T>(item: Connection<T>): T[] {
	// return item.edges.map((edge) => edge?.node);
	const reshaped: T[] = [];

	for (const edge of item.edges) {
		reshaped.push(edge?.node);
	}

	return reshaped;
}

export function reshapeImages(
	images: Connection<Image>,
	productTitle: string,
): Image[] {
	const flattened = removeEdgesAndNodes(images);

	// return flattened.map((image) => {
	//   const filename = image.url.match(/.*\/(.*)\..*/)?.[1];

	//   return {
	//     ...image,
	//     altText: image.altText || `${productTitle} - ${filename}`,
	//   };
	// });
	const reshaped: Image[] = [];

	for (const image of flattened) {
		const filename = image.url.match(/.*\/(.*)\..*/)?.[1];

		reshaped.push({
			height: image.height,
			url: image.url,
			width: image.width,
			altText: image.altText || `${productTitle} - ${filename}`,
		});
	}

	return reshaped;
}
export function reshapeShopifyProduct(
	product: ShopifyProduct,
	filterHiddenProducts = true,
) {
	if (
		!product ||
		(filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
	) {
		return undefined;
	}

	const { images, variants, ...rest } = product;

	return {
		...rest,
		images: reshapeImages(images, product.title),
		variants: removeEdgesAndNodes(variants),
	};
}
export function reshapeProducts(products: ShopifyProduct[]) {
	const reshapedProducts = [];

	for (const product of products) {
		if (product) {
			const reshapedProduct = reshapeShopifyProduct(product);

			if (reshapedProduct) {
				reshapedProducts.push(reshapedProduct);
			}
		}
	}

	return reshapedProducts;
}
export function reshapeCollection(
	collection: ShopifyCollection,
): Collection | undefined {
	if (!collection) return undefined;

	return {
		...collection,
		path: `${collectionsPathSegment}/${collection.handle}`,
	};
}
export function reshapeCollections(collections: ShopifyCollection[]) {
	const reshapedCollections = [];
	for (const collection of collections) {
		if (collection) {
			const reshapedCollection = reshapeCollection(collection);

			if (reshapedCollection) {
				reshapedCollections.push(reshapedCollection);
			}
		}
	}

	return reshapedCollections;
}
export function reshapeCart(cart: ShopifyCart): Cart {
	if (!cart.cost?.totalTaxAmount) {
		cart.cost.totalTaxAmount = {
			amount: '0.0',
			currencyCode: 'USD',
		};
	}

	// const lines = removeEdgesAndNodes(cart.lines)
	// 	.map((line) => {
	// 		const product = reshapeShopifyProduct(line.merchandise.product);

	// 		if (!product) {
	// 			return;
	// 		}

	// 		return {
	// 			...line,
	// 			merchandise: {
	// 				...line.merchandise,
	// 				product,
	// 			},
	// 		};
	// 	})
	// 	.filter(Boolean) as Cart['lines'];
	const lines: Cart['lines'] = [];

	for (const line of removeEdgesAndNodes(cart.lines)) {
		const product = reshapeShopifyProduct(line.merchandise.product);

		if (product) {
			lines.push({
				...line,
				merchandise: {
					...line.merchandise,
					product,
				},
			});
		}
	}

	return {
		...cart,
		lines,
	};
}
