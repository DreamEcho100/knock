'use client';
import type {
	IGenericErrorResponse,
	ILoginSuccess,
	IRegisterSuccess,
} from 'types';
import type { Dispatch, FormEvent, SetStateAction } from 'react';

import { useState } from 'react';
import Dialog from '~/app/components/shared/common/Dialog';
import { useMutation } from '@tanstack/react-query';
import Button from '~/app/components/shared/core/Button';
import { setCookie } from '~/utils/common/storage/cookie/document';
import { useGetUserData } from '~/utils/core/hooks';
import { BsFillPersonFill } from 'react-icons/bs';
import FormField from '~/app/components/shared/core/FieldForm';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';

const RegisterTypeDynamic = dynamic(() => import('./Types/Register'));
const LoginTypeDynamic = dynamic(() => import('./Types/Login'));
const ForgetPasswordTypeDynamic = dynamic(
	() => import('./Types/ForgetPassword'),
);

export interface IProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export enum EWindowType {
	REGISTER = 'register',
	LOGIN = 'login',
	FORGET_PASSWORD = 'forgetPassword',
}

const UserAuthButton = ({ isOpen, setIsOpen }: IProps) => {
	const [type, setType] = useState<EWindowType>(EWindowType.LOGIN);

	return (
		<>
			<button
				type="button"
				title="login/register"
				className="flex items-center justify-center"
				onClick={() => setIsOpen(true)}
			>
				<BsFillPersonFill className="text-xl" />
			</button>
			{type === EWindowType.REGISTER ? (
				<RegisterTypeDynamic
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					setType={setType}
					type={type}
				/>
			) : type === EWindowType.LOGIN ? (
				<LoginTypeDynamic
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					setType={setType}
					type={type}
				/>
			) : (
				<ForgetPasswordTypeDynamic
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
