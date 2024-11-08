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
	buyerIdentity: {
		countryCode?: string;
		email?: string;
		phone?: string;
		customer?: {
			id: string;
		};
	};
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

/*
CartBuyerIdentityInput
input_object

Specifies the input fields to update the buyer information associated with a cart. Buyer identity is used to determine international pricing and should match the customer's shipping address.
Anchor to section titled 'Fields'
Fields

Anchor to CartBuyerIdentityInput.companyLocationId
companyLocationId
ID

    The company location of the buyer that is interacting with the cart.
Anchor to CartBuyerIdentityInput.countryCode
countryCode
CountryCode

    The country where the buyer is located.
Anchor to CartBuyerIdentityInput.customerAccessToken
customerAccessToken
String

    The access token used to identify the customer associated with the cart.
Anchor to CartBuyerIdentityInput.deliveryAddressPreferences
deliveryAddressPreferences
[DeliveryAddressInput!]

    An ordered set of delivery addresses tied to the buyer that is interacting with the cart. The rank of the preferences is determined by the order of the addresses in the array. Preferences can be used to populate relevant fields in the checkout flow.

    The input must not contain more than 250 values.

customerAddressId
ID

    The ID of a customer address that is associated with the buyer that is interacting with the cart.
deliveryAddress
MailingAddressInput

    A delivery address preference of a buyer that is interacting with the cart.

    address1
    String

        The first line of the address. Typically the street address or PO Box number.
    address2
    String

        The second line of the address. Typically the number of the apartment, suite, or unit.
    city
    String

        The name of the city, district, village, or town.
    company
    String

        The name of the customer's company or organization.
    country
    String

        The name of the country.
    firstName
    String

        The first name of the customer.
    lastName
    String

        The last name of the customer.
    phone
    String

        A unique phone number for the customer.

        Formatted using E.164 standard. For example, +16135551111.
    province
    String

        The region of the address, such as the province, state, or district.
    zip
    String

        The zip or postal code of the address.

deliveryAddressValidationStrategy
DeliveryAddressValidationStrategy
default:COUNTRY_CODE_ONLY

    Defines what kind of address validation is requested.

        COUNTRY_CODE_ONLY

            Only the country code is validated.
        STRICT

            Strict validation is performed, i.e. all fields in the address are validated according to Shopify's checkout rules. If the address fails validation, the cart will not be updated.

    oneTimeUse
    Boolean
    default:false

        Whether the given delivery address is considered to be a one-time use address. One-time use addresses do not get persisted to the buyer's personal addresses when checking out.

Anchor to CartBuyerIdentityInput.email
email
String

    The email address of the buyer that is interacting with the cart.
Anchor to CartBuyerIdentityInput.phone
phone
String

    The phone number of the buyer that is interacting with the cart.
Anchor to CartBuyerIdentityInput.preferences
preferences
CartPreferencesInput

    A set of preferences tied to the buyer interacting with the cart. Preferences are used to prefill fields in at checkout to streamline information collection. Preferences are not synced back to the cart if they are overwritten.

delivery
CartDeliveryPreferenceInput

    Delivery preferences can be used to prefill the delivery section in at checkout.

coordinates
CartDeliveryCoordinatesPreferenceInput

    The coordinates of a delivery location in order of preference.

countryCode
CountryCode!
required

    The two-letter code for the country of the preferred location.

    For example, US.

    latitude
    Float!
    required

        The geographic latitude for a given location. Coordinates are required in order to set pickUpHandle for pickup points.
    longitude
    Float!
    required

        The geographic longitude for a given location. Coordinates are required in order to set pickUpHandle for pickup points.

deliveryMethod
[PreferenceDeliveryMethodType!]

    The preferred delivery methods such as shipping, local pickup or through pickup points.

    The input must not contain more than 250 values.

        PICKUP_POINT

            A delivery method used to let buyers collect purchases at designated locations like parcel lockers.
        PICK_UP

            A delivery method used to let buyers receive items directly from a specific location within an area.
        SHIPPING

            A delivery method used to send items directly to a buyer’s specified address.

    pickupHandle
    [String!]

        The pickup handle prefills checkout fields with the location for either local pickup or pickup points delivery methods. It accepts both location ID for local pickup and external IDs for pickup points.

        The input must not contain more than 250 values.

wallet
[String!]

    Wallet preferences are used to populate relevant payment fields in the checkout flow. Accepted value: ["shop_pay"].

    The input must not contain more than 250 values.

*/

export interface ShopifyCartBuyerIdentityInput {
	companyLocationId?: string;
	countryCode?: string;
	customerAccessToken?: string | null;
	deliveryAddressPreferences?: {
		customerAddressId?: string;
		deliveryAddress: {
			address1: string;
			address2: string;
			city: string;
			company: string;
			country: string;
			firstName: string;
			lastName: string;
			phone: string;
			province: string;
			zip: string;
		};
		deliveryAddressValidationStrategy?: string;
		oneTimeUse?: boolean;
	}[];
	email?: string;
	phone?: string;
	preferences?: {
		delivery?: {
			coordinates: {
				countryCode: string;
				latitude: number;
				longitude: number;
			};
			deliveryMethod: string[];
			pickupHandle: string[];
		};
		wallet: string[];
	};
}
export interface ShopifyCartBuyerIdentityUpdateOperation {
	data: {
		cartBuyerIdentityUpdate: {
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
		buyerIdentity: ShopifyCartBuyerIdentityInput;
		cartId: string;
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
