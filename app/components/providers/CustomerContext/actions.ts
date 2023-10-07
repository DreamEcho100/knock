import { ECustomerContextConsts } from './constants';
import type {
	IInitialState,
	TAddOneProductToCartReducerActionData,
	TCustomerDispatch,
	TDeleteOneProductOnCartReducerActionData,
	TSetCartReducerActionData,
	TUpdateManyProductOnCartReducerActionData,
	TUpdateOneProductOnCartReducerActionData,
} from './ts';

export const toggleIsVisible = (
	dispatch: TCustomerDispatch,
	isVisible: keyof IInitialState['isVisible'],
	closeEverythingElse?: boolean,
) => {
	dispatch({
		type: ECustomerContextConsts.TOGGLE_IS_ONE_ITEM_VISIBLE,
		payload: {
			isVisible,
			closeEverythingElse,
		},
	});
};
export const setIsVisible = (
	dispatch: TCustomerDispatch,
	payload: {
		item: keyof IInitialState['isVisible'];
		isVisible: boolean | ((isVisible: boolean) => boolean);
		closeEverythingElse?: boolean;
	},
) => {
	dispatch({
		type: ECustomerContextConsts.SET_IS_ONE_ITEM_VISIBLE,
		payload: payload,
	});
};

const setCart = (
	dispatch: TCustomerDispatch,
	payload: TSetCartReducerActionData['payload'],
) => {
	dispatch({
		type: ECustomerContextConsts.SET_CART,
		payload,
	});
};

const addOneProductToCart = (
	dispatch: TCustomerDispatch,
	payload: TAddOneProductToCartReducerActionData['payload'],
) => {
	dispatch({
		type: ECustomerContextConsts.ADD_TO_CART,
		payload,
	});
};

const updateOneProductOnCart = (
	dispatch: TCustomerDispatch,
	payload: TUpdateOneProductOnCartReducerActionData['payload'],
) => {
	dispatch({
		type: ECustomerContextConsts.UPDATE_ONE_PRODUCT_ON_CART,
		payload,
	});
};

const updateManyProductOnCart = (
	dispatch: TCustomerDispatch,
	payload: TUpdateManyProductOnCartReducerActionData['payload'],
) => {
	dispatch({
		type: ECustomerContextConsts.UPDATE_MANY_PRODUCT_ON_CART,
		payload,
	});
};

const deleteOneProductOnCart = (
	dispatch: TCustomerDispatch,
	payload: TDeleteOneProductOnCartReducerActionData['payload'],
) => {
	dispatch({
		type: ECustomerContextConsts.DELETE_ONE_PRODUCT_ON_CART,
		payload,
	});
};

export const customerGlobalActions = {
	toggleIsVisible,
	setIsVisible,
	cart: {
		set: setCart,
		addOneProduct: addOneProductToCart,
		updateOneProduct: updateOneProductOnCart,
		updateManyProduct: updateManyProductOnCart,
		deleteOneProduct: deleteOneProductOnCart,
	},
};
