import { ECustomerContextConsts } from './constants';
import type {
	IInitialState,
	TAddOneProductToCartReducerActionData,
	TCustomerDispatch,
	TDeleteOneProductOnCartReducerActionData,
	TSetCartReducerActionData,
	TUpdateManyProductOnCartReducerActionData,
	TUpdateOneProductOnCartReducerActionData
} from './ts';

export const setIsVisibleOnly = (
	dispatch: TCustomerDispatch,
	isVisible: keyof IInitialState['isVisible']
) => {
	dispatch({
		type: ECustomerContextConsts.SET_TOGGLE_IS_VISIBLE_ONE_ITEM_AND_INIT_EVERYTHING_ELSE,
		payload: {
			isVisible
		}
	});
};

const setCart = (
	dispatch: TCustomerDispatch,
	payload: TSetCartReducerActionData['payload']
) => {
	dispatch({
		type: ECustomerContextConsts.SET_CART,
		payload
	});
};

const addOneProductToCart = (
	dispatch: TCustomerDispatch,
	payload: TAddOneProductToCartReducerActionData['payload']
) => {
	dispatch({
		type: ECustomerContextConsts.ADD_TO_CART,
		payload
	});
};

const updateOneProductOnCart = (
	dispatch: TCustomerDispatch,
	payload: TUpdateOneProductOnCartReducerActionData['payload']
) => {
	dispatch({
		type: ECustomerContextConsts.UPDATE_ONE_PRODUCT_ON_CART,
		payload
	});
};

const updateManyProductOnCart = (
	dispatch: TCustomerDispatch,
	payload: TUpdateManyProductOnCartReducerActionData['payload']
) => {
	dispatch({
		type: ECustomerContextConsts.UPDATE_MANY_PRODUCT_ON_CART,
		payload
	});
};

const deleteOneProductOnCart = (
	dispatch: TCustomerDispatch,
	payload: TDeleteOneProductOnCartReducerActionData['payload']
) => {
	dispatch({
		type: ECustomerContextConsts.DELETE_ONE_PRODUCT_ON_CART,
		payload
	});
};

export const customerGlobalActions = {
	setIsVisibleOnly,
	cart: {
		set: setCart,
		addOneProduct: addOneProductToCart,
		updateOneProduct: updateOneProductOnCart,
		updateManyProduct: updateManyProductOnCart,
		deleteOneProduct: deleteOneProductOnCart
	}
};
