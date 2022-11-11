// ShopifyBuy.ProductVariant.price

declare module 'shopify-buy' {
	interface ProductVariant {
		price: {
			amount: 'string';
		};
	}

	interface ProductResource extends ShopifyBuy.ProductResource {
		helpers: ProductHelpers;
	}
}
