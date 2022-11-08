interface IProductOption {
	id: string;
	name: string;
	values: {
		value: string;
	}[];
}
interface IProductImage {
	id: string;
	src: string;
	altText: null;
	width: number;
	height: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	variableValues: {
		first: number;
	};
}
export interface IProduct {
	id: string;
	availableForSale: boolean;
	createdAt: string;
	updatedAt: string;
	descriptionHtml: string;
	description: string;
	handle: string;
	productType: string;
	title: string;
	vendor: string;
	publishedAt: string;
	onlineStoreUrl: string;
	hasNextPage: {
		value: boolean;
	};
	hasPreviousPage: boolean;
	variableValues: {
		first: number;
	};
	options: IProductOption[];
	images: IProductImage[];
	variants: {
		id: string;
		title: string;
		price: {
			amount: string;
			currencyCode: string;
		};
		priceV2: {
			amount: string;
			currencyCode: string;
		};
		weight: 0;
		available: true;
		sku: string;
		compareAtPrice: {
			amount: string;
			currencyCode: string;
		};
		compareAtPriceV2: {
			amount: string;
			currencyCode: string;
		};
		image: {
			id: string;
			src: string;
			altText: null;
			width: 3000;
			height: 3000;
		};
		selectedOptions: [
			{
				name: string;
				value: string;
			}
		];
		unitPrice: null;
		unitPriceMeasurement: {
			measuredType: null;
			quantityUnit: null;
			quantityValue: 0;
			referenceUnit: null;
			referenceValue: 0;
		};
		hasNextPage: false;
		hasPreviousPage: false;
		variableValues: {
			first: 20;
		};
	}[];
}

export interface ILineItem {
	id: string;
	title: string;
	variant: {
		id: string;
		title: string;
		price: {
			amount: string;
			currencyCode: string;
		};
		priceV2: {
			amount: string;
			currencyCode: string;
		};
		weight: number;
		available: boolean;
		sku: string;
		compareAtPrice: null;
		compareAtPriceV2: null;
		image: {
			id: string;
			src: string;
			altText: null;
			width: number;
			height: number;
		};
		selectedOptions: [
			{
				name: string;
				value: string;
			}
		];
		unitPrice: null;
		unitPriceMeasurement: {
			measuredType: null;
			quantityUnit: null;
			quantityValue: number;
			referenceUnit: null;
			referenceValue: 0;
		};
		product: {
			id: string;
			handle: string;
		};
	};
	quantity: number;
	customAttributes: [];
	discountAllocations: [];
	hasNextPage: {
		value: boolean;
	};
	hasPreviousPage: boolean;
	variableValues: {
		id: string;
	};
}

export interface IAccessToken {
	accessToken: string;
	expiresAt: string;
}

export interface ILoginSuccess {
	success: true;
	message: string;
	user: IAccessToken;
}

export interface IRegisterSuccess {
	success: true;
	message: string; // "Account created successfully!",
	response: {
		id: string; // "gid://shopify/Customer/6439211991263"
	};
}
export interface IUser {
	id: string; // 'gid://shopify/Customer/6439111885023';
	firstName: string;
	lastName: string;
	acceptsMarketing: boolean;
	email: string;
	phone: string | null;
	createdAt: string | Date;
	defaultAddress: string | null;
	orders: {
		edges: [];
	};
}

export interface IUserSession {
	data?: IUser;
	isLoading: boolean;
	isFetching: boolean;

	error?: IGenericErrorResponse;
}

export interface IGenericErrorResponse {
	success: false;
	message: string;
}

export interface ICheckoutIdAndKey {
	checkoutId: string;
	checkoutKey: string;
}
export interface ICheckout {
	id: string;
	ready: false;
	requiresShipping: false;
	note: null;
	paymentDue: {
		amount: string;
		currencyCode: string;
	};
	paymentDueV2: {
		amount: string;
		currencyCode: string;
	};
	webUrl: string;
	orderStatusUrl: null;
	taxExempt: false;
	taxesIncluded: false;
	currencyCode: string;
	totalTax: {
		amount: string;
		currencyCode: string;
	};
	totalTaxV2: {
		amount: string;
		currencyCode: string;
	};
	lineItemsSubtotalPrice: {
		amount: string;
		currencyCode: string;
	};
	subtotalPrice: {
		amount: string;
		currencyCode: string;
	};
	subtotalPriceV2: {
		amount: string;
		currencyCode: string;
	};
	totalPrice: {
		amount: string;
		currencyCode: string;
	};
	totalPriceV2: {
		amount: string;
		currencyCode: string;
	};
	completedAt: null;
	createdAt: string;
	updatedAt: string;
	email: null;
	discountApplications: [];
	appliedGiftCards: [];
	shippingAddress: null;
	shippingLine: null;
	customAttributes: [];
	order: null;
	lineItems: ILineItem[];
	userErrors: [];
}
