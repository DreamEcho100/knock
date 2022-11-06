import { isDate } from '@utils/common/date';

import { ECustomerContextConsts } from './constants';
import { initIsVisible } from './initialState';
import { IInitialState, IReducerActions } from './ts';

export const reducer = (
	state: IInitialState,
	action: IReducerActions
): IInitialState => {
	if (process.env.NODE_ENV === 'development') {
		console.log('%cPrevious State', 'color: darkred');
		console.dir(state);
		console.log('%cAction', 'color: darkred');
		console.dir(action);
	}

	switch (action.type) {
		case ECustomerContextConsts.SET_TOGGLE_IS_VISIBLE_ONE_ITEM_AND_INIT_EVERYTHING_ELSE: {
			return {
				...state,
				isVisible: {
					...initIsVisible(),
					[action.payload.isVisible]: !state.isVisible[action.payload.isVisible]
				}
			};
		}

		case ECustomerContextConsts.SET_CART: {
			const { cartObj } = action.payload;
			if (cartObj && typeof cartObj === 'object') {
				if (
					Array.isArray(cartObj.productsData) &&
					cartObj.productsData.length !== 0
				) {
					const productsIds = [];
					cartObj.productsData = cartObj.productsData.filter(
						(item: {
							id: string | any[];
							addedOnCartAt: Date;
							categories: string | any[];
							countInStock: number;
							preferredImage: { id: string; alt: string; src: string };
							price: number;
							selectedAmount: number;
							title: string | any[];
							updatedOnCartAt: undefined;
						}) => {
							if (
								!item ||
								typeof item !== 'object' ||
								typeof item.id !== 'string'
							)
								return false;

							let isAValidProduct = true;

							let _key: keyof typeof item;
							for (_key in item) {
								// if (Object.prototype.hasOwnProperty.call(item, key)) {
								// 	const element = item[key];
								// }
								if (!('addedOnCartAt' in item) || !isDate(item.addedOnCartAt)) {
									item.addedOnCartAt = new Date();
								} else if (
									!('categories' in item) ||
									!Array.isArray(item.categories) ||
									item.categories.length === 0
								) {
									isAValidProduct = false;
									break;
								} else if (
									!('countInStock' in item) ||
									isNaN(item.countInStock) ||
									item.countInStock < 1
								) {
									isAValidProduct = false;
									break;
								} else if (
									!('id' in item) ||
									typeof item.id !== 'string' ||
									item.id.length < 1
								) {
									isAValidProduct = false;
									break;
								} else if (
									!('preferredImage' in item) ||
									typeof item.preferredImage !== 'object'
								) {
									item.preferredImage = { id: '??', alt: '', src: '' };
								} else if (
									!('price' in item) ||
									typeof item.price !== 'number' ||
									item.price < 1
								) {
									isAValidProduct = false;
									break;
								} else if (
									!('selectedAmount' in item) ||
									typeof item.selectedAmount !== 'number' ||
									item.selectedAmount < 1
								) {
									isAValidProduct = false;
									break;
								} else if (
									!('title' in item) ||
									typeof item.title !== 'string' ||
									item.title.length < 1
								) {
									isAValidProduct = false;
									break;
								}
								if (
									!('updatedOnCartAt' in item) ||
									!isDate(item.updatedOnCartAt)
								) {
									item.updatedOnCartAt = undefined;
								}
							}
							/*

							for (key in item) {
								// if (Object.prototype.hasOwnProperty.call(item, key)) {
								// 	const element = item[key];
								// }
								if (
									key === 'addedOnCartAt' &&
									(!(key in item) || !isDate(item[key]))
								) {
									item.addedOnCartAt = new Date();
								} else if (
									key === 'addedOnCartAt' &&
									(!(key in item) ||
										!Array.isArray(item[key]) ||
										item.categories.length === 0)
								) {
									isAValidProduct = false;
									break;
								} else if (
									key === 'countInStock' &&
									(!(key in item) ||
										isNaN(item.countInStock) ||
										item.countInStock < 1)
								) {
									isAValidProduct = false;
									break;
								} else if (
									key === 'id' &&
									(!(key in item) ||
										typeof item[key] !== 'string' ||
										item.id.length < 1)
								) {
									isAValidProduct = false;
									break;
								} else if (
									key === 'preferredImage' &&
									(!(key in item) || typeof item[key] !== 'object')
								) {
									item[key] = { id: '??', alt: '', src: '' };
								} else if (
									key === 'price' &&
									(!(key in item) ||
										typeof item[key] !== 'number' ||
										item[key] < 1)
								) {
									isAValidProduct = false;
									break;
								} else if (
									key === 'selectedAmount' &&
									(!(key in item) ||
										typeof item[key] !== 'number' ||
										item[key] < 1)
								) {
									isAValidProduct = false;
									break;
								} else if (
									key === 'title' &&
									(!(key in item) ||
										typeof item[key] !== 'string' ||
										item[key].length < 1)
								) {
									isAValidProduct = false;
									break;
								}
								if (
									key === 'updatedOnCartAt' &&
									(!(key in item) || !isDate(item[key]))
								) {
									item[key] = undefined;
								}
							}
							*/

							if (isAValidProduct) productsIds.push(item.id);
							return isAValidProduct;
						}
					);
				} else {
					cartObj.productsData = [];
				}

				if (!isDate(cartObj.updatedAt)) {
					cartObj.updatedAt;
				} else cartObj.updatedAt = null;

				// setCart(cartObj)
				return {
					...state,
					cart: {
						...state.cart,
						...cartObj
					}
				};
			}

			return state;
		}
		case ECustomerContextConsts.ADD_TO_CART: {
			const { newProduct } = action.payload;
			let isCartUpdated = false;
			const updatedCart = {
				...state.cart,
				// [...state.cart.productsData, { ...newProduct, addedOnCartAt: new Date() }],
				productsData: state.cart.productsData.map((item) => {
					if (!isCartUpdated && item.id === newProduct.id) {
						isCartUpdated = true;
						return {
							...item,
							...newProduct,
							updatedOnCartAt: new Date()
						};
					}

					return item;
				}),
				updatedAt: new Date()
			};

			return {
				...state,
				cart: isCartUpdated
					? updatedCart
					: {
							...state.cart,
							productsData: [
								...state.cart.productsData,
								{ ...newProduct, addedOnCartAt: new Date() }
							],
							updatedAt: new Date()
					  }
			};
		}
		case ECustomerContextConsts.UPDATE_ONE_PRODUCT_ON_CART: {
			const { productId, productNewData } = action.payload;
			return {
				...state,
				cart: {
					...state.cart,
					productsData: state.cart.productsData.map((item) => {
						if (item.id === productId) {
							return {
								...item,
								...productNewData,
								updatedOnCartAt: new Date()
							};
						}
						return item;
					}),
					updatedAt: new Date()
				}
			};
		}
		case ECustomerContextConsts.UPDATE_MANY_PRODUCT_ON_CART: {
			const { productsUpToDate } = action.payload;

			return {
				...state,
				cart: {
					...state.cart,
					productsData: state.cart.productsData
						.map((item) => {
							const productUpToDateFound = productsUpToDate.find(
								(productUpToDate) => productUpToDate.id === item.id
							);

							if (productUpToDateFound) {
								return {
									...item,
									...productUpToDateFound,
									// selectedAmount:
									// 	productUpToDateFound.countInStock &&
									// 	item.selectedAmount > productUpToDateFound.countInStock
									// 		? productUpToDateFound.countInStock
									// 		: item.selectedAmount,
									updatedOnCartAt: new Date()
								};
							} else undefined;
							return item;
						})
						.filter((item) => item),
					updatedAt: new Date()
				}
			};
		}
		case ECustomerContextConsts.DELETE_ONE_PRODUCT_ON_CART: {
			const { productId } = action.payload;
			return {
				...state,
				cart: {
					...state.cart,
					productsData: state.cart.productsData.filter(
						(item) => item.id !== productId
					),
					updatedAt: new Date()
				}
			};
		}
		default:
			return state;
	}
};
