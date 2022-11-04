const variants = [
	{
		id: 'gid://shopify/ProductVariant/41485788053727',
		title: 'Default Title',
		price: {
			amount: '99.0',
			currencyCode: 'USD',
			type: {
				name: 'MoneyV2',
				kind: 'OBJECT',
				fieldBaseTypes: {
					amount: 'Decimal',
					currencyCode: 'CurrencyCode'
				},
				implementsNode: false
			}
		},
		priceV2: {
			amount: '99.0',
			currencyCode: 'USD',
			type: {
				name: 'MoneyV2',
				kind: 'OBJECT',
				fieldBaseTypes: {
					amount: 'Decimal',
					currencyCode: 'CurrencyCode'
				},
				implementsNode: false
			}
		},
		weight: 0,
		available: true,
		sku: '',
		compareAtPrice: null,
		compareAtPriceV2: null,
		image: {
			id: 'gid://shopify/ProductImage/33055740887263',
			src: 'https://cdn.shopify.com/s/files/1/0600/9602/0703/products/Knock-Hero_640eb224-a363-45df-a1b0-7adf680e8473.png?v=1635551940',
			altText: null,
			width: 1774,
			height: 1055,
			type: {
				name: 'Image',
				kind: 'OBJECT',
				fieldBaseTypes: {
					altText: 'String',
					height: 'Int',
					id: 'ID',
					url: 'URL',
					width: 'Int'
				},
				implementsNode: false
			}
		},
		selectedOptions: [
			{
				name: 'Title',
				value: 'Default Title',
				type: {
					name: 'SelectedOption',
					kind: 'OBJECT',
					fieldBaseTypes: {
						name: 'String',
						value: 'String'
					},
					implementsNode: false
				}
			}
		],
		unitPrice: null,
		unitPriceMeasurement: {
			measuredType: null,
			quantityUnit: null,
			quantityValue: 0,
			referenceUnit: null,
			referenceValue: 0,
			type: {
				name: 'UnitPriceMeasurement',
				kind: 'OBJECT',
				fieldBaseTypes: {
					measuredType: 'UnitPriceMeasurementMeasuredType',
					quantityUnit: 'UnitPriceMeasurementMeasuredUnit',
					quantityValue: 'Float',
					referenceUnit: 'UnitPriceMeasurementMeasuredUnit',
					referenceValue: 'Int'
				},
				implementsNode: false
			}
		},
		type: {
			name: 'ProductVariant',
			kind: 'OBJECT',
			fieldBaseTypes: {
				availableForSale: 'Boolean',
				compareAtPrice: 'MoneyV2',
				id: 'ID',
				image: 'Image',
				price: 'MoneyV2',
				product: 'Product',
				selectedOptions: 'SelectedOption',
				sku: 'String',
				title: 'String',
				unitPrice: 'MoneyV2',
				unitPriceMeasurement: 'UnitPriceMeasurement',
				weight: 'Float'
			},
			implementsNode: true
		},
		hasNextPage: false,
		hasPreviousPage: false,
		variableValues: {
			first: 20
		}
	}
];
const type = {
	name: 'Product',
	kind: 'OBJECT',
	fieldBaseTypes: {
		availableForSale: 'Boolean',
		createdAt: 'DateTime',
		description: 'String',
		descriptionHtml: 'HTML',
		handle: 'String',
		id: 'ID',
		images: 'ImageConnection',
		onlineStoreUrl: 'URL',
		options: 'ProductOption',
		productType: 'String',
		publishedAt: 'DateTime',
		title: 'String',
		updatedAt: 'DateTime',
		variants: 'ProductVariantConnection',
		vendor: 'String'
	},
	implementsNode: true
};

interface IProductOptions {
	id: string;
	name: string;
	values: {
		value: string;
		type: {
			name: string;
			kind: string;
		};
	}[];
	type: {
		name: string;
		kind: string;
		fieldBaseTypes: {
			name: string;
			values: string;
		};
		implementsNode: boolean;
	};
}
[];
interface IProductImages {
	id: string;
	src: string;
	altText: null;
	width: number;
	height: number;
	type: {
		name: string;
		kind: string;
		fieldBaseTypes: {
			altText: string;
			height: string;
			id: string;
			url: string;
			width: string;
		};
		implementsNode: boolean;
	};
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	variableValues: {
		first: number;
	};
}
[];
interface IProduct {
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
	options: IProductOptions;
	images: IProductImages;
}

const product: IProduct = {
	id: 'gid://shopify/Product/7190963749087',
	availableForSale: true,
	createdAt: '2021-10-08T04:22:22Z',
	updatedAt: '2022-11-03T08:25:26Z',
	descriptionHtml:
		'<span>This is the last plugin you will ever need to make your drums KNOCK and punch through your mix. This plugin was meticulously crafted by platinum producer &amp; award winning sound designer, DECAP. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics of modern music.</span>',
	description:
		'This is the last plugin you will ever need to make your drums KNOCK and punch through your mix. This plugin was meticulously crafted by platinum producer & award winning sound designer, DECAP. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics of modern music.',
	handle: 'knock-plugin',
	productType: 'Sound Editing Software',
	title: 'KNOCK Plugin',
	vendor: 'Plugins That Knock',
	publishedAt: '2022-10-31T21:28:33Z',
	onlineStoreUrl: 'https://pluginsthatknock.com/products/knock-plugin',
	hasNextPage: {
		value: true
	},
	hasPreviousPage: false,
	variableValues: {
		first: 20
	},
	options: [
		{
			id: 'gid://shopify/ProductOption/9249369194719',
			name: 'Title',
			values: [
				{
					value: 'Default Title',
					type: {
						name: 'String',
						kind: 'SCALAR'
					}
				}
			],
			type: {
				name: 'ProductOption',
				kind: 'OBJECT',
				fieldBaseTypes: {
					name: 'String',
					values: 'String'
				},
				implementsNode: true
			}
		}
	],
	images: [
		{
			id: 'gid://shopify/ProductImage/33055740887263',
			src: 'https://cdn.shopify.com/s/files/1/0600/9602/0703/products/Knock-Hero_640eb224-a363-45df-a1b0-7adf680e8473.png?v=1635551940',
			altText: null,
			width: 1774,
			height: 1055,
			type: {
				name: 'Image',
				kind: 'OBJECT',
				fieldBaseTypes: {
					altText: 'String',
					height: 'Int',
					id: 'ID',
					url: 'URL',
					width: 'Int'
				},
				implementsNode: false
			},
			hasNextPage: false,
			hasPreviousPage: false,
			variableValues: {
				first: 20
			}
		}
	]
};

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
