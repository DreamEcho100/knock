import type { ILineItem, IProduct } from 'types';

import type { Dispatch } from 'react';

import { ECustomerContextConsts } from './constants';

export type TInitialStateScreenSize = number;

export interface ICartProduct extends ILineItem {
	// countInStock: number;
	preferredImage: { alt: string | null; src: string } | null;
	selectedAmount: number;
	// !!!
	// Add currencyCode
	price: number;
	addedOnCartAt: Date;
	updatedOnCartAt?: Date;
}

// {
// }

interface ICart {
	productsData: ICartProduct[];
	updatedAt: Date | null;
}

export interface IInitialState {
	isVisible: {
		sideNav: boolean;
		headerCart: boolean;
	};
	cart: ICart; // | ICartUpdatedIdle | ICartUpdatedLoading;
}

interface ISetReducerAction<Type, Payload = undefined> {
	type: Type;
	payload: Payload;
}

type TSetItemVisibility = ISetReducerAction<
	ECustomerContextConsts.SET_TOGGLE_IS_VISIBLE_ONE_ITEM_AND_INIT_EVERYTHING_ELSE,
	{
		isVisible: keyof IInitialState['isVisible'];
	}
>;

export type TSetCartReducerActionData = ISetReducerAction<
	ECustomerContextConsts.SET_CART,
	{
		cartObj: any; // IInitialState['cart'];
	}
>;

export type TAddOneProductToCartReducerActionData = ISetReducerAction<
	ECustomerContextConsts.ADD_TO_CART,
	{
		newProduct: Omit<ICartProduct, 'addedOnCartAt' | 'updatedOnCartAt'>;
	}
>;
export type TUpdateOneProductOnCartReducerActionData = ISetReducerAction<
	ECustomerContextConsts.UPDATE_ONE_PRODUCT_ON_CART,
	{
		productId: ICartProduct['id'];
		productNewData: Partial<
			Omit<ICartProduct, 'updatedOnCartAt' | 'addedOnCartAt' | 'id'>
		>;
	}
>;
export type TUpdateManyProductOnCartReducerActionData = ISetReducerAction<
	ECustomerContextConsts.UPDATE_MANY_PRODUCT_ON_CART,
	{
		productsUpToDate: Partial<
			Omit<ICartProduct, 'updatedOnCartAt' | 'addedOnCartAt'>
		>[];
	}
>;
export type TDeleteOneProductOnCartReducerActionData = ISetReducerAction<
	ECustomerContextConsts.DELETE_ONE_PRODUCT_ON_CART,
	{
		productId: ICartProduct['id'];
	}
>;

export type IReducerActions =
	| TSetItemVisibility
	| TSetCartReducerActionData
	| TAddOneProductToCartReducerActionData
	| TUpdateOneProductOnCartReducerActionData
	| TUpdateManyProductOnCartReducerActionData
	| TDeleteOneProductOnCartReducerActionData;

export type TCustomerDispatch = Dispatch<IReducerActions>;
