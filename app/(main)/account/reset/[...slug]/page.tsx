'use client';
import type { IGenericErrorResponse } from 'types';
import { type FormEvent, useState } from 'react';
import FormField from '~/app/_components/shared/core/FieldForm';
import Button from '~/app/_components/shared/core/Button';
import { toast } from 'react-toastify';
import { setCookie } from '~/utils/common/storage/cookie/document';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

const ResetPage = () => {
	const router = useRouter();
	const [formValues, setValues] = useState({
		password: '',
		confirmPassword: '',
	});

	const resetAccount = useMutation<
		{
			success: true;
			message: string; // "Account created successfully!",
			user: {
				customerAccessToken: { accessToken: string; expiresAt: string };
			};
		},
		IGenericErrorResponse,
		FormEvent
	>({
		mutationFn: (event) => {
			event.preventDefault();
			const resetUrl = window.location.href;

			if (formValues.confirmPassword !== formValues.password) {
				throw new Error('Confirm password is not the same as password');
			}

			const data = {
				resetUrl,
				password: formValues.password,
			};
			return fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}/clients/reset-password`,
				{
					method: 'POST',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify(data),
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
			setCookie(
				'user-access-token',
				JSON.stringify({
					accessToken: result.user.customerAccessToken.accessToken,
					expiresAt: result.user.customerAccessToken.expiresAt,
				}),
				{
					expires: new Date(result.user.customerAccessToken.expiresAt),
				},
			);
			router.push('/');
			setTimeout(() => toast.success(result.message), 0);
		},
		onError: (result) => {
			setTimeout(() => toast(result.message, { type: 'error' }), 0);
		},
	});

	return (
		<section className="flex items-center justify-center w-full min-h-[75vh]">
			<div className="flex items-center justify-center max-w-[1200px]  lg:max-w-screen-xl w-full lg:mx-auto">
				<form
					onSubmit={resetAccount.mutate}
					className="flex flex-col justify-center gap-6 w-full h-full p-8"
				>
					<header className="flex flex-col gap-2">
						<h2 className="text-primary-1 text-h2">RESET PASSWORD</h2>
						<p>Enter a new password for your email here:</p>
					</header>
					<FormField
						values={formValues}
						setValues={setValues}
						name="password"
						type="password"
						placeholder="*password"
						autoComplete="password"
						minLength={3}
					/>
					<FormField
						values={formValues}
						setValues={setValues}
						name="confirmPassword"
						type="password"
						placeholder="*confirm password"
						autoComplete="confirm password"
						minLength={3}
					/>
					<Button classesIntent={{ isLoading: resetAccount.isPending }}>
						RESET
					</Button>
				</form>
			</div>
		</section>
	);
};

export default ResetPage;
