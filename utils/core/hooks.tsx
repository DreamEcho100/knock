import { useQueryClient, useQuery } from '@tanstack/react-query';
import { getCookie, removeCookie } from '@utils/common/storage/cookie/document';
import { useRef } from 'react';
import { useEffect } from 'react';
import { IGenericErrorResponse, IUserSession } from 'types';

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
				removeCookie('user-access-token');

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

export const useLogoutUser = ({
	enabled,
	onError,
	onSuccess
}: {
	enabled: boolean;
	onError?: () => void;
	onSuccess?: () => void;
}) => {
	const queryClient = useQueryClient();
	const accessToken = useGetAccessToken();

	return useQuery<IUserSession, IGenericErrorResponse>(
		['logout'],
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
				`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}/auth/logout`,
				{
					headers: {
						'Content-type': 'application/json',
						accesstoken: accessToken
					}
				}
			).then((response) => response.json());
		},
		{
			enabled,
			onSuccess: () => {
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
