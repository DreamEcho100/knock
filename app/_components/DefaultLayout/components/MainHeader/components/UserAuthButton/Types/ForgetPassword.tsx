'use client';
import type { IGenericErrorResponse, ILoginSuccess } from 'types';
import type { Dispatch, FormEvent, SetStateAction } from 'react';

import { useState } from 'react';
import Dialog from '~/app/_components/shared/common/Dialog';
import { useMutation } from '@tanstack/react-query';
import Button from '~/app/_components/shared/core/Button';
import { useGetUserData } from '~/utils/core/hooks';
import FormField from '~/app/_components/shared/core/FieldForm';
import { toast } from 'react-toastify';
import { EWindowType, type IProps } from '..';

export default function ForgetPasswordType({
	isOpen,
	setIsOpen,
	setType,
}: IProps & {
	setType: Dispatch<SetStateAction<EWindowType>>;
	type: EWindowType;
}) {
	const [formValues, setFormValues] = useState({
		email: '',
	});

	const loginMutation = useMutation<
		ILoginSuccess,
		IGenericErrorResponse,
		FormEvent
	>({
		mutationFn: (event) => {
			event.preventDefault();

			return fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}/clients/recover-password`,
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
		onSuccess: () => {
			toast.success('Please check your email');
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
				title: loginMutation.isSuccess
					? 'Please check your email'
					: "Don't remember the password?",
				description: (
					<>
						Have an account?&nbsp;
						<button
							type="button"
							className="text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600"
							onClick={() => setType(EWindowType.LOGIN)}
						>
							Login
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
