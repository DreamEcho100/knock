import type { ReactNode } from 'react';

import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useId } from 'react';
import Link from 'next/link';
import Button from '@components/shared/core/Button';
import Logo from '@components/shared/core/Logo';
import MainHeader from './components/MainHeader';
import {
	getGetAccessTokenFromCookie,
	useGetUserData,
	useGetUserDataFromStore
} from '@utils/core/hooks';
import CustomNextImage from '@components/shared/common/CustomNextImage';
import MainFooter from './components/MainFooter';

export const commonClasses = 'leading-relaxed text-primary-2 mx-auto';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
	const accessToken = getGetAccessTokenFromCookie();

	useGetUserData({
		enabled: !!accessToken,
		accessToken: accessToken
	});

	return (
		<>
			<MainHeader />
			<main
				className={`${commonClasses} relative bg-primary-2 mt-main-nav-h w-full flex flex-col`}
			>
				{children}
			</main>
			<MainFooter />
		</>
	);
};

export default DefaultLayout;
