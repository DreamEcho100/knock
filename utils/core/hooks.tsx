import { useSharedCustomerState } from '@context/Customer';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { getCookie, removeCookie } from '@utils/common/storage/cookie/document';
import { useMemo, useRef } from 'react';
import { useEffect } from 'react';
import type {
	ICheckout,
	ICheckoutIdAndKey,
	IGenericErrorResponse,
	IUserSession
} from 'types';
import { checkoutApi } from './API';
import type {
	TCreateOneCheckoutReturnType,
	TGetOneCheckoutReturnType
} from './API';
import { getUserCheckoutIdAndKeyFromCookie } from './cookie';
import { getIdFromGid } from './shopify';

// const userAccessToken = getCookie<IAccessToken>('user-access-token')

export const useGetUserDataFromStore = () => {
	const queryClient = useQueryClient();

	const user = queryClient.getQueryData<IUserSession>(['check-token']);

	return { user: user };
};

export const useGetUserData = ({
	enabled,
	accessToken
}: {
	enabled: boolean;
	accessToken?: string;
}) => {
	const queryClient = useQueryClient();

	const configRef = useRef({
		isLoading: true,
		isFetching: false
	});

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		timeoutId = setTimeout(() => {
			if (!accessToken) {
				queryClient.setQueriesData<IUserSession | undefined>(
					['check-token'],
					(data) => {
						if (data && data.data) return data;

						return {
							isLoading: false,
							isFetching: false,
							data: undefined,
							error: undefined
						};
					}
				);
			}
		}, 1000);
		() => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [accessToken, queryClient]);

	const query = useQuery<IUserSession, IGenericErrorResponse>(
		['check-token'],
		() => {
			if (!accessToken) throw new Error('Access token is required');

			queryClient.setQueriesData<IUserSession | undefined>(
				['check-token'],
				(data) => ({
					...data,
					isLoading: true,
					isFetching: true,
					error: undefined
				})
			);

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
				.then((result) => ({
					data: result.user,
					// espiresAt:
					isLoading: false,
					isFetching: false
				}));
		},
		{
			enabled,
			onError: (error) => {
				// removeCookie('user-access-token');

				queryClient.setQueriesData<IUserSession | undefined>(
					['check-token'],
					(data) => ({
						...data,
						isLoading: false,
						isFetching: false,
						error
					})
				);
			}
		}
	);

	return query;
};

export const useGetUserCheckoutIdAndKeyCookie = () => {
	const { user } = useGetUserDataFromStore();

	return useMemo(() => getUserCheckoutIdAndKeyFromCookie(user?.data?.id), [
		user?.data?.id
	]);
};

export const useLogoutUser = ({
	enabled,
	onError,
	onSuccess,
	userCheckoutDetailsAndIdAndKey
}: {
	enabled: boolean;
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
	const accessToken = useGetAccessToken();

	return useQuery<
		IUserSession & {
			userCheckoutDetailsAndIdAndKey: NonNullable<
				typeof userCheckoutDetailsAndIdAndKey
			>;
			userGId: string;
		},
		IGenericErrorResponse
	>(
		['logout'],
		() => {
			if (!user?.data?.id)
				if (!accessToken) throw new Error('Access token is required');

			queryClient.setQueriesData<IUserSession | undefined>(
				['check-token'],
				(data) => ({
					...data,
					isLoading: true,
					isFetching: true,
					error: undefined
				})
			);

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
					userCheckoutDetailsAndIdAndKey,
					userGId: user?.data?.id
				}));
		},
		{
			enabled,
			onSuccess: ({ userCheckoutDetailsAndIdAndKey, userGId }) => {
				removeCookie('user-access-token');

				queryClient.setQueriesData<IUserSession | undefined>(
					['check-token'],
					() => ({
						isLoading: false,
						isFetching: false,
						data: undefined,
						error: undefined
					})
				);

				// uetUserCheckoutDetailsAndIdAndKey(user?.data?.id);

				checkoutApi.deleteOne(
					userCheckoutDetailsAndIdAndKey.checkoutIdAndKey.checkoutId,
					productsData.map((product) => product.id)
				);
				removeCookie(`user-${getIdFromGid(userGId)}-checkoutIdAndKey`);

				if (onSuccess) onSuccess();
			},
			onError: (error) => {
				queryClient.setQueriesData<IUserSession | undefined>(
					['check-token'],
					(data) => ({
						...data,
						data: undefined,
						isLoading: false,
						isFetching: false,
						error
					})
				);
				if (onError) onError();
			}
		}
	);
};

export const useGetAccessToken = () => {
	const accessTokenStr = getCookie<string>('user-access-token');

	return accessTokenStr ? JSON.parse(accessTokenStr).accessToken : '';
};

export const useGetUserCheckoutDetailsAndIdAndKey = () => {
	const { user } = useGetUserDataFromStore();
	const queryClient = useQueryClient();

	return useMemo(() => {
		const createOneCheckout = queryClient.getQueryData<
			TCreateOneCheckoutReturnType
		>(['create-one-checkout', user?.data?.id]);
		const getOneCheckout = queryClient.getQueryData<TGetOneCheckoutReturnType>([
			'get-one-checkout',
			user?.data?.id
		]);

		if (createOneCheckout?.checkout && createOneCheckout?.checkoutIdAndKey) {
			return {
				checkoutIdAndKey: createOneCheckout?.checkoutIdAndKey,
				checkout: createOneCheckout?.checkout
			};
		} else if (getOneCheckout?.checkout) {
			const checkoutIdAndKeyFromCookie = getUserCheckoutIdAndKeyFromCookie(
				user?.data?.id
			);

			if (checkoutIdAndKeyFromCookie) {
				return {
					checkoutIdAndKey: checkoutIdAndKeyFromCookie,
					checkout: getOneCheckout?.checkout
				};
			}
		}
	}, [queryClient, user?.data?.id]);
};
