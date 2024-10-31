export interface ShopifyErrorLike {
	status: number;
	message: Error;
	cause: Error;
}

export interface Menu {
	title: string;
	path: string;
}

export interface ShopifyMenuOperation {
	data: {
		menu?: {
			items: {
				title: string;
				url: string;
			}[];
		};
	};
	variables: {
		handle: string;
	};
}

export interface Money {
	amount: string;
	currencyCode: string;
}

export interface ProductOption {
	id: string;
	name: string;
	values: string[];
}

export interface Edge<T> {
	node: T;
}

export interface Connection<T> {
	edges: Array<Edge<T>>;
}

export interface ProductVariant {
	id: string;
	title: string;
	availableForSale: boolean;
	image: Image;
	selectedOptions: {
		name: string;
		value: string;
	}[];
	price: Money;
	compareAtPrice?: Money;
}

export interface Image {
	url: string;
	altText: string;
	width: number;
	height: number;
}

export interface SEO {
	title: string;
	description: string;
}
export interface ShopifyProduct {
	id: string;
	handle: string;
	availableForSale: boolean;
	title: string;
	description: string;
	descriptionHtml: string;
	options: ProductOption[];
	productType: string;
	priceRange: {
		maxVariantPrice: Money;
		minVariantPrice: Money;
	};
	variants: Connection<ProductVariant>;
	featuredImage: Image;
	images: Connection<Image>;
	seo: SEO;
	tags: string[];
	updatedAt: string;
}

export interface Product extends Omit<ShopifyProduct, 'variants' | 'images'> {
	variants: ProductVariant[];
	images: Image[];
}

export interface ShopifyProductsOperation {
	data: {
		products: Connection<ShopifyProduct>;
	};
	variables: {
		query?: string;
		reverse?: boolean;
		sortKey?: string;
	};
}

export interface ShopifyCollection {
	handle: string;
	title: string;
	description: string;
	seo: SEO;
	updatedAt: string;
}

export interface Collection extends ShopifyCollection {
	path: string;
}

export interface ShopifyCollectionsOperation {
	data: {
		collections: Connection<ShopifyCollection>;
	};
}

export interface ShopifyCollectionProductsOperation {
	data: {
		collection: {
			products: Connection<ShopifyProduct>;
		};
	};
	variables: {
		handle: string;
		reverse?: boolean;
		sortKey?: string;
	};
}

export interface ShopifyProductOperation {
	data: { product: ShopifyProduct };
	variables: {
		handle: string;
	};
}

export interface CartProduct {
	id: string;
	handle: string;
	title: string;
	featuredImage: Image;
	price: Money;
}

export interface ShopifyCartItemMerchandise {
	id: string;
	title: string;
	selectedOptions: {
		name: string;
		value: string;
	}[];
	product: ShopifyProduct; // CartProduct;
}

export interface CartItemMerchandise
	extends Omit<ShopifyCartItemMerchandise, 'product'> {
	product: Product;
}

export interface ShopifyCartItem {
	id: string;
	quantity: number;
	cost: {
		// perItem: Money;
		totalAmount: Money;
	};
	discountAllocations: {
		__typename:
			| 'CartCustomDiscountAllocation'
			| 'CartAutomaticDiscountAllocation'
			| 'CartCodeDiscountAllocation';
		targetType: 'LINE_ITEM' | 'SHIPPING';
		title?: string;
		discountedAmount: {
			amount: string;
			currencyCode: string;
		};
		code?: string;
	}[];
	// currencyCode: string;
	merchandise: ShopifyCartItemMerchandise;
}

export interface CartItem extends Omit<ShopifyCartItem, 'merchandise'> {
	merchandise: CartItemMerchandise;
}

export interface ShopifyCart {
	id: string | undefined;
	checkoutUrl: string;
	cost: {
		subtotalAmount: Money;
		totalAmount: Money;
		totalTaxAmount: Money;
	};
	discountAllocations: {
		targetType: 'LINE_ITEM' | 'SHIPPING_LINE';
		discountedAmount: Money;
	}[];
	discountCodes: {
		applicable: boolean;
		code: string;
	}[];
	lines: Connection<ShopifyCartItem>;
	totalQuantity: number;
}

export interface ShopifyCartOperation {
	data: {
		cart: ShopifyCart;
	};
	variables: {
		cartId: string;
	};
}

export interface ShopifyCreateCartOperation {
	data: { cartCreate: { cart: ShopifyCart } };
}

export interface ShopifyUpdateCartOperation {
	data: {
		cartLinesUpdate: {
			cart: ShopifyCart;
		};
	};
	variables: {
		cartId: string;
		lines: {
			id: string;
			merchandiseId: string;
			quantity: number;
		}[];
	};
}

export interface ShopifyRemoveFromCartOperation {
	data: {
		cartLinesRemove: {
			cart: ShopifyCart;
		};
	};
	variables: {
		cartId: string;
		lineIds: string[];
	};
}

export interface Cart extends Omit<ShopifyCart, 'lines'> {
	lines: CartItem[];
}

export interface ShopifyAddToCartOperation {
	data: {
		cartLinesAdd: {
			cart: ShopifyCart;
		};
	};
	variables: {
		cartId: string;
		lines: {
			merchandiseId: string;
			quantity: number;
		}[];
	};
}

export interface ShopifyProductRecommendationsOperation {
	data: {
		productRecommendations: ShopifyProduct[];
	};
	variables: {
		productId: string;
	};
}

export interface Page {
	id: string;
	title: string;
	handle: string;
	body: string;
	bodySummary: string;
	seo?: SEO;
	createdAt: string;
	updatedAt: string;
}

export interface ShopifyPageOperation {
	data: { pageByHandle: Page };
	variables: { handle: string };
}

export interface ShopifyPagesOperation {
	data: {
		pages: Connection<Page>;
	};
}
