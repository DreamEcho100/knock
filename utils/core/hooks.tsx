import { useSharedCustomerState } from '@context/Customer';
import { customerGlobalActions } from '@context/Customer/actions';
import { ICartProduct } from '@context/Customer/ts';

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

import { getCookie, removeCookie } from '@utils/common/storage/cookie/document';

import { useEffect, useMemo, useRef, useState } from 'react';

import type { IGenericErrorResponse, ILineItem, IProduct, IUser } from 'types';

import { checkoutApi } from './API';
import type {
	TCreateOneCheckoutReturnType,
	TGetOneCheckoutReturnType
} from './API';
import { getUserCheckoutIdAndKeyFromCookie } from './cookie';
import { convertProductToCartItem } from './products';

export const useGetUserDataFromStore = () => {
	const user = useGetUserData({ enabled: true });

	const queryClient = useQueryClient();

	return {
		user,
		getUser: () => queryClient.getQueryData<IUser>(['check-token'])
	};
};

export const useGetUserData = ({
	enabled,
	accessToken
}: {
	enabled: boolean;
	accessToken?: string;
}) => {
	const query = useQuery<IUser, IGenericErrorResponse>(
		['check-token'],
		() => {
			if (!accessToken) throw new Error('Access token is required');

			return fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}/auth/check-token`,
				{
					headers: {
						'Content-type': 'application/json',
						accesstoken: accessToken
					}
				}
			)
				.then((response) => response.json())
				.then((result) => result.user);
		},
		{
			enabled: enabled && !!accessToken,
			refetchInterval: 10 * 60 * 1000,
			onError: async (error) => {}
		}
	);

	return query;
};

export const useGetUserCheckoutIdAndKeyCookie = () =>
	getUserCheckoutIdAndKeyFromCookie(); // useMemo(() => getUserCheckoutIdAndKeyFromCookie(), []);

export const useLogoutUser = ({
	onError,
	onSuccess,
	userCheckoutDetailsAndIdAndKey
}: {
	onError?: () => void;
	onSuccess?: () => void;
	userCheckoutDetailsAndIdAndKey: ReturnType<
		typeof useGetUserCheckoutDetailsAndIdAndKey
	>;
}) => {
	const { user } = useGetUserDataFromStore();
	const [
		{
			cart: { productsData }
		}
	] = useSharedCustomerState();

	const queryClient = useQueryClient();

	return useMutation<
		IUser & {
			userCheckoutDetailsAndIdAndKey: NonNullable<
				typeof userCheckoutDetailsAndIdAndKey
			>;
		},
		IGenericErrorResponse
	>(
		['logout'],
		() => {
			const accessToken = getGetAccessTokenFromCookie();

			if (!accessToken) throw new Error('Access token is required');

			return fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}/auth/logout`,
				{
					headers: {
						'Content-type': 'application/json',
						accesstoken: accessToken
					}
				}
			)
				.then((response) => response.json())
				.then((result) => ({
					...result,
					userCheckoutDetailsAndIdAndKey
				}));
		},
		{
			onSuccess: async ({ userCheckoutDetailsAndIdAndKey }) => {

				const accessToken = getGetAccessTokenFromCookie();

				let checkout:any = getCookie('checkoutIdAndKey')
				checkout = JSON.parse(checkout)			
				
				 fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}/checkouts/disassociate`, 
					{
						method:'POST',
						headers:{
							'Content-type': 'application/json',
						},
						body:JSON.stringify({
							checkoutId: checkout.checkoutId,
							checkoutKey:checkout.checkoutKey,
							customerAccessToken:accessToken
						})
					}
				)

				removeCookie('user-access-token');
				removeCookie('checkoutIdAndKey');
/*
				if (userCheckoutDetailsAndIdAndKey)
					checkoutApi.products.removeMany(
						`gid://shopify/Checkout/${userCheckoutDetailsAndIdAndKey.checkoutIdAndKey.checkoutId}?key=${userCheckoutDetailsAndIdAndKey.checkoutIdAndKey.checkoutKey}`,
						productsData.map((product) => product.id)
					);
*/
				queryClient.invalidateQueries<IUser | undefined>(['check-token']);

				if (onSuccess) await onSuccess();
				else window.location.reload();
			},
			onError: (error) => {
				if (onError) return onError();
			}
		}
	);
};

export const getGetAccessTokenFromCookie = () => {
	const accessTokenStr = getCookie<string>('user-access-token');

	return accessTokenStr ? JSON.parse(accessTokenStr).accessToken : '';
};

export const useGetUserCheckoutDetailsAndIdAndKey = () => {
	const queryClient = useQueryClient();
	const createOneCheckout =
		queryClient.getQueryData<TCreateOneCheckoutReturnType>([
			'create-one-checkout'
		]);
	const getOneCheckout = queryClient.getQueryData<TGetOneCheckoutReturnType>([
		'get-one-checkout'
	]);

	return useMemo(() => {
		if (createOneCheckout?.checkout && createOneCheckout?.checkoutIdAndKey) {
			return {
				checkoutIdAndKey: createOneCheckout?.checkoutIdAndKey,
				checkout: createOneCheckout?.checkout
			};
		} else if (getOneCheckout?.checkout) {
			const checkoutIdAndKeyFromCookie = getUserCheckoutIdAndKeyFromCookie();

			if (checkoutIdAndKeyFromCookie) {
				return {
					checkoutIdAndKey: checkoutIdAndKeyFromCookie,
					checkout: getOneCheckout?.checkout
				};
			}
		}
	}, [
		createOneCheckout?.checkout,
		createOneCheckout?.checkoutIdAndKey,
		getOneCheckout?.checkout
	]);
};

export const useAddProductsToCheckoutAndCart = () => {
	const [
		{
			cart: { productsData }
		},
		customerDispatch
	] = useSharedCustomerState();
	const userCheckoutDetailsAndIdAndKey = useGetUserCheckoutDetailsAndIdAndKey();

	return useMutation<
		{ products: (IProduct & { quantity: number })[]; result: ILineItem[] },
		IGenericErrorResponse,
		{ products: (IProduct & { quantity: number })[] }
	>({
		mutationFn: async ({ products: _products }) => {
			// !!!
			// Abstract it?
			const products = _products.filter(
				(product) =>
					!productsData.find(
						(productOnCart) => productOnCart.variant.product.id === product.id
					)
			);
			if (products.length === 0)
				throw new Error(
					"No product Added either it's already exists or something wrong happened"
				);
			if (
				!userCheckoutDetailsAndIdAndKey?.checkoutIdAndKey?.checkoutId ||
				!userCheckoutDetailsAndIdAndKey?.checkoutIdAndKey?.checkoutKey
			)
				throw new Error('Missing checkout details');

			if (
				!Array.isArray(products) ||
				products.length === 0 ||
				products.some(
					(product) =>
						!product ||
						typeof product !== 'object' ||
						!product.quantity ||
						!product.variants[0] ||
						!product.variants[0]?.id
				)
			)
				throw new Error(
					'The passed product must be an object with quantity and variants information available in the products list'
				);

			return {
				products,
				result: await checkoutApi.products.addMany(
					// userCheckoutDetailsAndIdAndKey.checkoutIdAndKey.checkoutId,
					`gid://shopify/Checkout/${userCheckoutDetailsAndIdAndKey.checkoutIdAndKey.checkoutId}?key=${userCheckoutDetailsAndIdAndKey.checkoutIdAndKey.checkoutKey}`,
					products.map((product) => ({
						quantity: product.quantity,
						variantId: product.variants[0].id
					}))
				)
			};
		},
		onSuccess: ({ products, result }) =>
			customerGlobalActions.cart.set(customerDispatch, {
				cartObj: {
					productsData: result.map((item) =>
						convertProductToCartItem({ product: item })
					),
					updatedAt: new Date()
				}
			}),

		onSettled: () =>
			customerGlobalActions.setIsVisibleOnly(customerDispatch, 'headerCart')
	});
};
export const useUpdateProductsToCheckoutAndCart = () => {
	const [, customerDispatch] = useSharedCustomerState();
	const userCheckoutDetailsAndIdAndKey = useGetUserCheckoutDetailsAndIdAndKey();

	return useMutation<
		{ products: (ICartProduct & { quantity: number })[]; result: ILineItem[] },
		IGenericErrorResponse,
		{ products: (ICartProduct & { quantity: number })[] }
	>({
		mutationFn: async ({ products }) => {
			if (!userCheckoutDetailsAndIdAndKey?.checkoutIdAndKey?.checkoutId)
				throw new Error('Missing checkout details');

			if (
				!Array.isArray(products) ||
				products.length === 0 ||
				products.some(
					(product) =>
						!product ||
						typeof product !== 'object' ||
						!product.quantity ||
						!product.variant?.id
				)
			)
				throw new Error(
					'The passed product must be an object with quantity and variants information available in the products list'
				);

			return {
				products,
				result: await checkoutApi.products.updateMany(
					`gid://shopify/Checkout/${userCheckoutDetailsAndIdAndKey.checkoutIdAndKey.checkoutId}?key=${userCheckoutDetailsAndIdAndKey.checkoutIdAndKey.checkoutKey}`,
					products.map((product) => ({
						quantity: product.quantity,
						id: product.id
					}))
				)
			};
		},
		onSuccess: ({ products, result }) => {
			customerGlobalActions.cart.set(customerDispatch, {
				cartObj: {
					productsData: result.map((item) =>
						convertProductToCartItem({ product: item })
					),
					updatedAt: new Date()
				}
			});
		}
	});
};
export const useRemoveProductsToCheckoutAndCart = () => {
	const [, customerDispatch] = useSharedCustomerState();
	const userCheckoutDetailsAndIdAndKey = useGetUserCheckoutDetailsAndIdAndKey();

	return useMutation<
		{ productsIds: string[]; result: ILineItem[] },
		IGenericErrorResponse,
		{ productsIds: string[] }
	>({
		mutationFn: async ({ productsIds }) => {
			if (!userCheckoutDetailsAndIdAndKey?.checkoutIdAndKey?.checkoutId)
				throw new Error('Missing checkout details');

			if (
				!Array.isArray(productsIds) ||
				productsIds.length === 0 ||
				productsIds.some((product) => typeof product !== 'string')
			)
				throw new Error('The passed productsIds must be an array of strings');

			return {
				productsIds,
				result: await checkoutApi.products.removeMany(
					`gid://shopify/Checkout/${userCheckoutDetailsAndIdAndKey.checkoutIdAndKey.checkoutId}?key=${userCheckoutDetailsAndIdAndKey.checkoutIdAndKey.checkoutKey}`,
					productsIds
				)
			};
		},
		onSuccess: ({ productsIds, result }) => {
			productsIds.forEach((productId) =>
				customerGlobalActions.cart.deleteOneProduct(customerDispatch, {
					productId
				})
			);
		}
	});
};

export const useSleep = (time: number) => {
	const configRef = useRef<{
		timeoutId?: NodeJS.Timeout;
	}>({
		timeoutId: undefined
	});

	const clearSleepTimeout = () => {
		if (configRef.current.timeoutId) {
			clearTimeout(configRef.current.timeoutId);
			configRef.current.timeoutId = undefined;
		}
	};

	const sleep = async () =>
		await new Promise((resolve) => {
			configRef.current.timeoutId = setTimeout(() => {
				resolve(time);
				clearSleepTimeout();
			}, time);
		});

	useEffect(() => {
		return () => clearSleepTimeout();
	}, []);

	return {
		sleep,
		clearSleepTimeout
	};
};
