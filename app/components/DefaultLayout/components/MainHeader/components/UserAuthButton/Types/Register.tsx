'use client';
import Dialog from '~/app/components/shared/common/Dialog';
import { useMutation } from '@tanstack/react-query';
import {
	type Dispatch,
	type SetStateAction,
	useState,
	type FormEvent,
} from 'react';
import Button from '~/app/components/shared/core/Button';
import FormField from '~/app/components/shared/core/FieldForm';
import { type IRegisterSuccess, type IGenericErrorResponse } from '~/types';
import { EWindowType, type IProps } from '..';

export default function RegisterType({
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
		firstName: '',
		lastName: '',
		acceptsMarketing: true,
	});

	const registerMutation = useMutation<
		IRegisterSuccess,
		IGenericErrorResponse,
		FormEvent
	>({
		mutationFn: (event) => {
			event.preventDefault();

			return fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}/auth/register`,
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
	});

	return (
		<Dialog
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			header={{
				title: registerMutation.isSuccess
					? 'Registered successfully'
					: 'Register',
				description: registerMutation.isSuccess ? (
					<>
						Please check your email, then{' '}
						<button
							type="button"
							className="font-semibold text-primary-1"
							onClick={() => setType(EWindowType.LOGIN)}
						>
							login
						</button>
					</>
				) : (
					<>
						Have an account?{' '}
						<button
							type="button"
							className="text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600"
							onClick={() => setType(EWindowType.LOGIN)}
						>
							login
						</button>
					</>
				),
			}}
		>
			{!registerMutation.isSuccess && (
				<form
					className="mx-auto my-4 sm:w-11/12"
					onSubmit={registerMutation.mutate}
				>
					<fieldset className="mt-2 space-y-4">
						<FormField
							values={formValues}
							setValues={setFormValues}
							name="firstName"
							placeholder="*first name"
							autoComplete="first-name"
							minLength={3}
						/>
						<FormField
							values={formValues}
							setValues={setFormValues}
							name="lastName"
							placeholder="*last name"
							autoComplete="last-name"
							minLength={3}
						/>
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
							<label>
								<input
									checked={formValues.acceptsMarketing}
									type="checkbox"
									name="acceptsMarketing"
									onChange={() =>
										setFormValues((prev) => ({
											...prev,
											acceptsMarketing: !prev.acceptsMarketing,
										}))
									}
								/>
								&nbsp;
								<span>Accept Marketing</span>
							</label>
						</div>
						<div className="flex justify-end mt-4">
							<Button
								type="submit"
								classesIntent={{ w: 'full' }}
								className="mt-4"
								disabled={registerMutation.isLoading}
							>
								Submit
							</Button>
						</div>
					</fieldset>
					{registerMutation.isError && (
						<div className="text-bg-secondary-2">
							<p>{registerMutation.error.message}</p>
						</div>
					)}
				</form>
			)}
		</Dialog>
	);
}
