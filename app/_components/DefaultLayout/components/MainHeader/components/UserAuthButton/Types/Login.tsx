'use client';
import type { IGenericErrorResponse, ILoginSuccess } from 'types';
import type { Dispatch, FormEvent, SetStateAction } from 'react';

import { useState } from 'react';
import Dialog from '~/app/_components/shared/common/Dialog';
import { useMutation } from '@tanstack/react-query';
import Button from '~/app/_components/shared/core/Button';
import { setCookie } from '~/utils/common/storage/cookie/document';
import { useGetUserData } from '~/utils/core/hooks';
import FormField from '~/app/_components/shared/core/FieldForm';
import { EWindowType, type IProps } from '..';

export default function LoginType({
	isOpen,
	setIsOpen,
	setType,
}: IProps & {
	setType: Dispatch<SetStateAction<EWindowType>>;
	type: EWindowType;
}) {
	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
	});

	const loginMutation = useMutation<
		ILoginSuccess,
		IGenericErrorResponse,
		FormEvent
	>({
		mutationFn: (event) => {
			event.preventDefault();

			return fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}/auth/login`,
				{
					method: 'POST',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify(formValues),
				},
			)
				.then((response) => response.json())
				.then((result) => {
					if ('success' in result && !result.success)
						throw new Error(result.message);

					return result;
				});
		},
		onSuccess: (result) => {
			const { user } = result;

			setCookie(
				'user-access-token',
				JSON.stringify({
					accessToken: user.accessToken,
					expiresAt: user.expiresAt,
				}),
				{
					expires: new Date(user.expiresAt),
				},
			);

			setIsOpen(false);
		},
	});

	useGetUserData({
		enabled: loginMutation.isSuccess && !!loginMutation.data?.user?.accessToken,
		accessToken: loginMutation.data?.user?.accessToken,
	});

	return (
		<Dialog
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			header={{
				title: loginMutation.isSuccess ? 'Logged successfully' : 'Log in',
				description: loginMutation.isSuccess ? (
					<>Getting your user data...</>
				) : (
					<>
						Don&apos;t have an account?{' '}
						<button
							type="button"
							className="text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600"
							onClick={() => setType(EWindowType.REGISTER)}
						>
							Create a new one
						</button>
					</>
				),
			}}
		>
			{!loginMutation.isSuccess && (
				<form
					className="mx-auto my-4 sm:w-11/12"
					onSubmit={loginMutation.mutate}
				>
					<fieldset
						className="mt-2 space-y-4"
						disabled={loginMutation.isLoading}
					>
						<FormField
							values={formValues}
							setValues={setFormValues}
							name="email"
							type="email"
							placeholder="*email"
							autoComplete="email"
							minLength={3}
						/>
						<FormField
							values={formValues}
							setValues={setFormValues}
							name="password"
							type="password"
							placeholder="*password"
							autoComplete="password"
							minLength={3}
						/>
						<div className="">
							<button
								type="button"
								className="text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600"
								onClick={() => setType(EWindowType.FORGET_PASSWORD)}
							>
								forget password?
							</button>
						</div>
						<div className="flex justify-end mt-4">
							<Button
								type="submit"
								classesIntent={{ w: 'full' }}
								className="mt-4"
								disabled={loginMutation.isLoading}
							>
								Submit
							</Button>
						</div>
					</fieldset>
					{loginMutation.isError && (
						<div className="text-bg-secondary-2">
							<p>{loginMutation.error.message}</p>
						</div>
					)}
				</form>
			)}
		</Dialog>
	);
}
