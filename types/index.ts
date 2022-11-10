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
		available: boolean;
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
		hasNextPage: boolean;
		hasPreviousPage: boolean;
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
	id: string;
	firstName: string;
	lastName: string;
	acceptsMarketing: boolean;
	email: string;
	phone: null;
	createdAt: string;
	defaultAddress: {
		id: string;
		address1: string;
		address2: string;
		city: string;
		company: null;
		country: string;
		zip: string;
		province: string;
		phone: null;
	};
	addresses: {
		edges: {
			node: {
				id: string;
				address1: string;
				address2: string;
				city: string;
				company: null;
				country: string;
				firstName: string;
				lastName: string;
				province: string;
				zip: string;
				phone: null;
			};
		}[];
	};
	orders: {
		edges: {
			node: {
				id: string;
				orderNumber: number;
				email: string;
				name: string;
				phone: null;
				totalPrice: {
					amount: string;
					currencyCode: string;
				};
				totalShippingPrice: {
					amount: string;
					currencyCode: string;
				};
				totalTax: {
					amount: string;
					currencyCode: string;
				};
				totalRefunded: {
					amount: string;
					currencyCode: string;
				};
				lineItems: {
					edges: {
						node: {
							currentQuantity: number;
							quantity: number;
							title: string;
							originalTotalPrice: {
								amount: string;
								currencyCode: string;
							};
							variant: {
								id: string;
								image: {
									id: string;
									height: number;
									width: number;
									url: string;
									altText: null;
								};
								price: {
									amount: string;
									currencyCode: string;
								};
								product: {
									id: string;
									handle: string;
									title: string;
									totalInventory: number;
									availableForSale: boolean;
									description: string;
									images: {
										edges: {
											node: {
												id: string;
												width: number;
												height: number;
												url: string;
											};
										}[];
									};
									updatedAt: string;
									createdAt: string;
								};
								quantityAvailable: number;
								title: string;
							};
						};
					}[];
				};
				processedAt: string;
			};
		}[];
	};
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
	ready: boolean;
	requiresShipping: boolean;
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
	taxExempt: boolean;
	taxesIncluded: boolean;
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
