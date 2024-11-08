'use client';

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

import { getCookie } from '~/utils/common/storage/cookie/document';

import { useEffect, useRef } from 'react';

import type { IGenericErrorResponse, ILineItem, IUser } from 'types';

// import { checkoutApi } from './API';
import { convertProductToCartItem } from './products';
import type { Product } from '~/libs/shopify/types';

export const useGetUserDataFromStore = () => {
	const user = useGetUserData({ enabled: true });

	const queryClient = useQueryClient();

	return {
		user,
		getUser: () => queryClient.getQueryData<IUser>(['check-token']),
	};
};

export const useGetUserData = ({
	enabled,
	accessToken,
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
						accesstoken: accessToken,
					},
				},
			)
				.then((response) => response.json())
				.then((result) => result.user ?? null);
		},
		{
			enabled: enabled && !!accessToken,
			refetchInterval: 10 * 60 * 1000,
		},
	);

	return query;
};

export const useLogoutUser = ({
	onError,
	onSuccess,
}: {
	onError?: () => void;
	onSuccess?: () => void | Promise<void>;
} = {}) => {
	return useMutation<IUser, IGenericErrorResponse>(
		['logout'],
		() => {
			const accessToken = getGetAccessTokenFromCookie();

			if (!accessToken) throw new Error('Access token is required');

			return fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}/auth/logout`,
				{
					headers: {
						'Content-type': 'application/json',
						accesstoken: accessToken,
					},
				},
			).then((response) => response.json());
		},
		{
			onSuccess: async () => {
				// @ts-expect-error - Add away somewhere to remove the associated cart to the user on logout

				// Remove the user-access-token and cartId cookies nativly
				document.cookie =
					'user-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
				document.cookie =
					'cartId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

				if (onSuccess) await onSuccess();
				else window.location.reload();
			},
			onError: (error) => {
				if (onError) return onError();
			},
		},
	);
};

export const getGetAccessTokenFromCookie = () => {
	const accessTokenStr = getCookie<string>('user-access-token');
	try {
		return accessTokenStr ? JSON.parse(accessTokenStr).accessToken : '';
	} catch (error) {
		return '';
	}
};

export const useSleep = (time: number) => {
	const configRef = useRef<{
		timeoutId?: NodeJS.Timeout;
	}>({
		timeoutId: undefined,
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
		clearSleepTimeout,
	};
};
