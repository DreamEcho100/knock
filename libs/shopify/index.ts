'use server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { TAGS } from './constants';
import {
	addToCartMutation,
	cartBuyerIdentityUpdateMutation,
	cartDiscountCodesUpdateMutation,
	createCartMutation,
	editCartItemsMutation,
	removeFromCartMutation,
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import {
	getCollectionProductsQuery,
	getCollectionsQuery,
} from './queries/collection';
import { getMenuQuery } from './queries/menu';
import {
	getProductQueryByHandle,
	getProductRecommendationsQuery,
	getProductsQuery,
} from './queries/product';
import type {
	ShopifyCartDiscountCodesUpdateOperation,
	Cart,
	Collection,
	Menu,
	Page,
	Product,
	ShopifyAddToCartOperation,
	ShopifyCartOperation,
	ShopifyCollectionProductsOperation,
	ShopifyCollectionsOperation,
	ShopifyCreateCartOperation,
	ShopifyMenuOperation,
	ShopifyPageOperation,
	ShopifyPagesOperation,
	ShopifyProductOperation,
	ShopifyProductRecommendationsOperation,
	ShopifyProductsOperation,
	ShopifyRemoveFromCartOperation,
	ShopifyUpdateCartOperation,
	ShopifyCartBuyerIdentityUpdateOperation,
	ShopifyCartBuyerIdentityInput,
} from './types';
import { headers } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { getPageQuery, getPagesQuery } from './queries/page';
import {
	collectionsPathSegment,
	reshapeProducts,
	removeEdgesAndNodes,
	reshapeCollections,
	reshapeShopifyProduct,
	reshapeCart,
	shopifyFetch,
	shopDomain,
} from './utils';

export async function getMenu(handle: string): Promise<Menu[]> {
	const res = await shopifyFetch<ShopifyMenuOperation>({
		tags: [TAGS.collections],
		revalidate: 3600,
		query: getMenuQuery,
		variables: {
			handle,
		},
	});

	// return (
	//   res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
	//     title: item.title,
	//     path: item.url
	//       .replace(domain, "")
	//       .replace("/collections", collectionsPathSegment)
	//       .replace("/pages", ""),
	//   })) || []
	// );
	const items = res.body?.data?.menu?.items;
	if (!items) return [];

	const reshaped: Menu[] = [];
	for (const item of items) {
		reshaped.push({
			title: item.title,
			path: item.url
				.replace(shopDomain, '')
				.replace('/collections', collectionsPathSegment)
				.replace('/pages', ''),
		});
	}

	return reshaped;
}

export async function getProducts({
	query,
	reverse,
	sortKey,
}: {
	query?: string;
	reverse?: boolean;
	sortKey?: string;
} = {}): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyProductsOperation>({
		tags: [TAGS.products],
		revalidate: 3600,
		query: getProductsQuery,
		variables: {
			query,
			reverse,
			sortKey,
		},
	});

	return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getCollections(): Promise<Collection[]> {
	const res = await shopifyFetch<ShopifyCollectionsOperation>({
		tags: [TAGS.collections],
		revalidate: 3600,
		query: getCollectionsQuery,
	});

	const shopifyCollections = removeEdgesAndNodes(res?.body?.data?.collections);
	const collections = [
		{
			handle: '',
			title: 'All',
			description: 'All products',
			seo: {
				title: 'All',
				description: 'All products',
			},
			path: collectionsPathSegment,
			updatedAt: new Date().toISOString(),
		},
		// Filter out the hidden products
		...reshapeCollections(shopifyCollections).filter(
			(collection) => !collection.handle.startsWith('hidden'),
		),
	];

	return collections;
}

export async function getCollectionProducts({
	collection,
	reverse,
	sortKey,
}: {
	collection: string;
	reverse?: boolean;
	sortKey?: string;
}): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
		tags: [TAGS.collections, TAGS.products],
		revalidate: 3600,
		query: getCollectionProductsQuery,
		variables: {
			handle: collection,
			reverse,
			sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey,
		},
	});

	if (!res.body.data.collection) {
		console.error(`No collection found for \`${collection}\``);
		return [];
	}

	return reshapeProducts(
		removeEdgesAndNodes(res.body.data.collection.products),
	);
}

export async function getProduct(param: {
	handle?: string;
	id?: string;
}): Promise<Product | undefined> {
	const res = await shopifyFetch<ShopifyProductOperation>({
		tags: [TAGS.products],
		revalidate: 3600,
		query: param.handle ? getProductQueryByHandle : getProductQueryByHandle,
		variables: {
			handle: param.handle,
			id: param.id,
		},
	});
	return reshapeShopifyProduct(res.body.data.product, false);
}

export async function getProductRecommendations(
	productId: string,
): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
		tags: [TAGS.products],
		revalidate: 3600,
		query: getProductRecommendationsQuery,
		variables: {
			productId,
		},
	});

	return reshapeProducts(res.body.data.productRecommendations);
}

export async function createCart(): Promise<Cart> {
	const res = await shopifyFetch<ShopifyCreateCartOperation>({
		query: createCartMutation,
		cache: 'no-store',
	});

	return reshapeCart(res.body.data.cartCreate.cart);
}

export async function getCart(
	cartId: string | undefined,
): Promise<Cart | undefined> {
	if (!cartId) return undefined;

	const res = await shopifyFetch<ShopifyCartOperation>({
		query: getCartQuery,
		tags: [TAGS.cart],
		revalidate: 3600,
		variables: { cartId },
	});

	// old carts becomes 'null' when you checkout
	if (!res.body.data.cart) {
		return undefined;
	}

	return reshapeCart(res.body.data.cart);
}

export async function removeFromCart(
	cartId: string,
	lineIds: string[],
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
		query: removeFromCartMutation,
		variables: {
			cartId,
			lineIds,
		},
		cache: 'no-store',
	});

	return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
	cartId: string,
	lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyUpdateCartOperation>({
		query: editCartItemsMutation,
		variables: {
			cartId,
			lines,
		},
		cache: 'no-store',
	});

	return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function addToCart(
	cartId: string,
	lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyAddToCartOperation>({
		query: addToCartMutation,
		variables: {
			cartId,
			lines,
		},
		cache: 'no-cache',
	});

	return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function updateCartDiscountCodes(
	cartId: string,
	discountCodes: string[],
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyCartDiscountCodesUpdateOperation>({
		query: cartDiscountCodesUpdateMutation,
		variables: {
			cartId,
			discountCodes,
		},
		cache: 'no-store',
	});

	return reshapeCart(res.body.data.cartDiscountCodesUpdate.cart);
}

export async function updateCartBuyerIdentity(
	cartId: string,
	buyerIdentity: ShopifyCartBuyerIdentityInput,
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyCartBuyerIdentityUpdateOperation>({
		query: cartBuyerIdentityUpdateMutation,
		variables: {
			cartId,
			buyerIdentity,
		},
		cache: 'no-store',
	});

	return reshapeCart(res.body.data.cartBuyerIdentityUpdate.cart);
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
	// We always need to respond with a 200 status code to Shopify,
	// otherwise it will continue to retry the request.

	const collectionWebhooks = [
		'collections/create',
		'collections/delete',
		'collections/update',
	];
	const productWebhooks = [
		'products/create',
		'products/delete',
		'products/update',
	];
	const topic = (await headers()).get('x-shopify-topic') ?? 'unknown';
	const secret = req.nextUrl.searchParams.get('secret');
	const isCollectionUpdate = collectionWebhooks.includes(topic);
	const isProductUpdate = productWebhooks.includes(topic);

	if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
		console.error('Invalid revalidation secret.');
		return NextResponse.json({ status: 200 });
	}

	if (!isCollectionUpdate && !isProductUpdate) {
		// We don't need to revalidate anything for any other topics.
		return NextResponse.json({ status: 200 });
	}

	if (isCollectionUpdate) {
		revalidateTag(TAGS.collections);
	}

	if (isProductUpdate) {
		revalidateTag(TAGS.products);
	}

	return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}

export async function getPage(handle: string): Promise<Page> {
	const res = await shopifyFetch<ShopifyPageOperation>({
		query: getPageQuery,
		cache: 'no-store',
		variables: { handle },
	});

	return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
	const res = await shopifyFetch<ShopifyPagesOperation>({
		query: getPagesQuery,
		cache: 'no-store',
	});

	return removeEdgesAndNodes(res.body.data.pages);
}
