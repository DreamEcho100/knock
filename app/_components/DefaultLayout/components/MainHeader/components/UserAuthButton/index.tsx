'use client';
import type { Dispatch, SetStateAction } from 'react';

import { useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import dynamic from 'next/dynamic';

const RegisterTypeDynamic = dynamic(() => import('./Types/Register'), {
	ssr: false,
});
const LoginTypeDynamic = dynamic(() => import('./Types/Login'), { ssr: false });
const ForgetPasswordTypeDynamic = dynamic(
	() => import('./Types/ForgetPassword'),
	{ ssr: false },
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
