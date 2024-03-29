import type { ILineItem } from 'types';

import type { Dispatch } from 'react';

import { type ECustomerContextConsts } from './constants';

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
		marketingPopup: boolean;
		banner: boolean;
	};
	cart: ICart; // | ICartUpdatedIdle | ICartUpdatedLoading;
}

interface ISetReducerAction<Type, Payload = undefined> {
	type: Type;
	payload: Payload;
}

type TToggleItemVisibility = ISetReducerAction<
	ECustomerContextConsts.TOGGLE_IS_ONE_ITEM_VISIBLE,
	{
		isVisible: keyof IInitialState['isVisible'];
		closeEverythingElse?: boolean;
	}
>;

type TSetItemVisibility = ISetReducerAction<
	ECustomerContextConsts.SET_IS_ONE_ITEM_VISIBLE,
	{
		item: keyof IInitialState['isVisible'];
		isVisible: boolean | ((isVisible: boolean) => boolean);
		closeEverythingElse?: boolean;
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
	| TToggleItemVisibility
	| TSetItemVisibility
	| TSetCartReducerActionData
	| TAddOneProductToCartReducerActionData
	| TUpdateOneProductOnCartReducerActionData
	| TUpdateManyProductOnCartReducerActionData
	| TDeleteOneProductOnCartReducerActionData;

export type TCustomerDispatch = Dispatch<IReducerActions>;
