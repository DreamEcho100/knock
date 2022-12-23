import type {
	IGenericErrorResponse,
	ILoginSuccess,
	IRegisterSuccess
} from 'types';
import type { Dispatch, FormEvent, SetStateAction } from 'react';

import { useState } from 'react';
import Dialog from '@components/shared/common/Dialog';
import { useMutation } from '@tanstack/react-query';
import Button from '@components/shared/core/Button';
import { getCookie, setCookie } from '@utils/common/storage/cookie/document';
import { useGetUserData } from '@utils/core/hooks';
import { BsFillPersonFill } from 'react-icons/bs';
import FormField from '@components/shared/core/FieldForm';
import { toast } from 'react-toastify';

interface IProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

enum EWindowType {
	REGISTER = 'register',
	LOGIN = 'login',
	FORGET_PASSWORD = 'forgetPassword'
}

const UserAuthButton = ({ isOpen, setIsOpen }: IProps) => {
	const [type, setType] = useState<EWindowType>(EWindowType.LOGIN);

	return (
		<>
			<button
				type='button'
				title='login/register'
				className='flex items-center justify-center'
				onClick={() => setIsOpen(true)}
			>
				<BsFillPersonFill className='text-xl' />
			</button>
			{type === EWindowType.REGISTER ? (
				<RegisterType
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					setType={setType}
					type={type}
				/>
			) : type === EWindowType.LOGIN ? (
				<LoginType
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					setType={setType}
					type={type}
				/>
			) : (
				<ForgetPasswordType
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					setType={setType}
					type={type}
				/>
			)}
		</>
	);
};

export default UserAuthButton;

const RegisterType = ({
	isOpen,
	setIsOpen,
	setType,
	type
}: IProps & {
	setType: Dispatch<SetStateAction<EWindowType>>;
	type: EWindowType;
}) => {
	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		acceptsMarketing: true
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
					body: JSON.stringify(formValues)
				}
			)
				.then((response) => response.json())
				.then((result) => {
					if ('success' in result && !result.success)
						throw new Error(result.message);

					return result;
				});
		},
		onSuccess: (result) => {
			// console.log('result', result)
			// setIsOpen(false)
		}
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
							type='button'
							className='font-semibold text-primary-1'
							onClick={() => setType(EWindowType.LOGIN)}
						>
							login
						</button>
					</>
				) : (
					<>
						Have an account?{' '}
						<button
							type='button'
							className='text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600'
							onClick={() => setType(EWindowType.LOGIN)}
						>
							login
						</button>
					</>
				)
			}}
		>
			{!registerMutation.isSuccess && (
				<form
					className='mx-auto my-4 sm:w-11/12'
					onSubmit={registerMutation.mutate}
				>
					<fieldset className='mt-2 space-y-4'>
						<FormField
							values={formValues}
							setValues={setFormValues}
							name='firstName'
							placeholder='*first name'
							autoComplete='first-name'
							minLength={3}
						/>
						<FormField
							values={formValues}
							setValues={setFormValues}
							name='lastName'
							placeholder='*last name'
							autoComplete='last-name'
							minLength={3}
						/>
						<FormField
							values={formValues}
							setValues={setFormValues}
							name='email'
							type='email'
							placeholder='*email'
							autoComplete='email'
							minLength={3}
						/>
						<FormField
							values={formValues}
							setValues={setFormValues}
							name='password'
							type='password'
							placeholder='*password'
							autoComplete='password'
							minLength={3}
						/>

						<div className=''>
							<label>
								<input
									checked={formValues.acceptsMarketing}
									type='checkbox'
									name='acceptsMarketing'
									onChange={() =>
										setFormValues((prev) => ({
											...prev,
											acceptsMarketing: !prev.acceptsMarketing
										}))
									}
								/>
								&nbsp;
								<span>Accept Marketing</span>
							</label>
						</div>
						<div className='flex justify-end mt-4'>
							<Button
								type='submit'
								classesIntent={{ w: 'full' }}
								className='mt-4'
								disabled={registerMutation.isLoading}
							>
								Submit
							</Button>
						</div>
					</fieldset>
					{registerMutation.isError && (
						<div className='text-bg-secondary-2'>
							<p>{registerMutation.error.message}</p>
						</div>
					)}
				</form>
			)}
		</Dialog>
	);
};

const LoginType = ({
	isOpen,
	setIsOpen,
	setType,
	type
}: IProps & {
	setType: Dispatch<SetStateAction<EWindowType>>;
	type: EWindowType;
}) => {
	const [formValues, setFormValues] = useState({
		email: '',
		password: ''
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
					body: JSON.stringify(formValues)
				}
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
					expiresAt: user.expiresAt
				}),
				{
					expires: new Date(user.expiresAt)
				}
			);
			
			setIsOpen(false);
		}
	});

	useGetUserData({
		enabled: loginMutation.isSuccess && !!loginMutation.data?.user?.accessToken,
		accessToken: loginMutation.data?.user?.accessToken
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
							type='button'
							className='text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600'
							onClick={() => setType(EWindowType.REGISTER)}
						>
							Create a new one
						</button>
					</>
				)
			}}
		>
			{!loginMutation.isSuccess && (
				<form
					className='mx-auto my-4 sm:w-11/12'
					onSubmit={loginMutation.mutate}
				>
					<fieldset
						className='mt-2 space-y-4'
						disabled={loginMutation.isLoading}
					>
						<FormField
							values={formValues}
							setValues={setFormValues}
							name='email'
							type='email'
							placeholder='*email'
							autoComplete='email'
							minLength={3}
						/>
						<FormField
							values={formValues}
							setValues={setFormValues}
							name='password'
							type='password'
							placeholder='*password'
							autoComplete='password'
							minLength={3}
						/>
						<div className=''>
							<button
								type='button'
								className='text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600'
								onClick={() => setType(EWindowType.FORGET_PASSWORD)}
							>
								forget password?
							</button>
						</div>
						<div className='flex justify-end mt-4'>
							<Button
								type='submit'
								classesIntent={{ w: 'full' }}
								className='mt-4'
								disabled={loginMutation.isLoading}
							>
								Submit
							</Button>
						</div>
					</fieldset>
					{loginMutation.isError && (
						<div className='text-bg-secondary-2'>
							<p>{loginMutation.error.message}</p>
						</div>
					)}
				</form>
			)}
		</Dialog>
	);
};

const ForgetPasswordType = ({
	isOpen,
	setIsOpen,
	setType,
	type
}: IProps & {
	setType: Dispatch<SetStateAction<EWindowType>>;
	type: EWindowType;
}) => {
	const [formValues, setFormValues] = useState({
		email: ''
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
					body: JSON.stringify(formValues)
				}
			)
				.then((response) => response.json())
				.then((result) => {
					if ('success' in result && !result.success)
						throw new Error(result.message);

					return result;
				});
		},
		onSuccess: (result) => {
			toast.success('Please check your email');
		}
	});

	useGetUserData({
		enabled: loginMutation.isSuccess && !!loginMutation.data?.user?.accessToken,
		accessToken: loginMutation.data?.user?.accessToken
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
							type='button'
							className='text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600'
							onClick={() => setType(EWindowType.LOGIN)}
						>
							Login
						</button>
					</>
				)
			}}
		>
			{!loginMutation.isSuccess && (
				<form
					className='mx-auto my-4 sm:w-11/12'
					onSubmit={loginMutation.mutate}
				>
					<fieldset
						className='mt-2 space-y-4'
						disabled={loginMutation.isLoading}
					>
						<FormField
							values={formValues}
							setValues={setFormValues}
							name='email'
							type='email'
							placeholder='*email'
							autoComplete='email'
							minLength={3}
						/>
						<div className='flex justify-end mt-4'>
							<Button
								type='submit'
								classesIntent={{ w: 'full' }}
								className='mt-4'
								disabled={loginMutation.isLoading}
							>
								Submit
							</Button>
						</div>
					</fieldset>
					{loginMutation.isError && (
						<div className='text-bg-secondary-2'>
							<p>{loginMutation.error.message}</p>
						</div>
					)}
				</form>
			)}
		</Dialog>
	);
};
