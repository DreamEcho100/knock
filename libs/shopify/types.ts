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

/*
cartDiscountCodesUpdate
mutation

Updates the discount codes applied to the cart.
Anchor to section titled 'Arguments'
Arguments

Anchor to cartId
cartId
ID!
required

    The ID of the cart.

Anchor to discountCodes
discountCodes
[String!]

    The case-insensitive discount codes that the customer added at checkout.

    The input must not contain more than 250 values.

Was this section helpful?
Anchor to section titled 'CartDiscountCodesUpdatePayload returns'
CartDiscountCodesUpdatePayload returns

Anchor to CartDiscountCodesUpdatePayload.cart
cart
Cart

    The updated cart.
Anchor to CartDiscountCodesUpdatePayload.userErrors
userErrors
[CartUserError!]!
non-null

    The list of errors that occurred from executing the mutation.
Anchor to CartDiscountCodesUpdatePayload.warnings
warnings
[CartWarning!]!
non-null

    A list of warnings that occurred during the mutation.



Hide code
Mutation reference
```
mutation cartDiscountCodesUpdate($cartId: ID!) {
  cartDiscountCodesUpdate(cartId: $cartId) {
    cart {
      # Cart fields
    }
    userErrors {
      field
      message
    }
    warnings {
      # CartWarning fields
    }
  }
}
```

Input - Variables
```
{
  "cartId": "gid://shopify/<objectName>/10079785100",
  "discountCodes": [
    "<your-discountCodes>"
  ]
}
```

```
export const cartDiscountCodesUpdateMutation = / * GraphQL * / `
mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
	cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
		cart {
			...cart
		}
		userErrors {
			field
			message
		}
		warnings {
			code
			message
		}
	}
}
${cartFragment}
`;
```
*/
export interface ShopifyCartDiscountCodesUpdateOperation {
	data: {
		cartDiscountCodesUpdate: {
			cart: ShopifyCart;
			userErrors: {
				field: string;
				message: string;
			}[];
			warnings: {
				code: string;
				message: string;
			}[];
		};
	};
	variables: {
		cartId: string;
		discountCodes: string[];
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
