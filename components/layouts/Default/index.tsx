import type { Dispatch, ReactNode, SetStateAction } from 'react';

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
import MarketingPopup from '@components/shared/common/MarketingPopup/MarketingPopup';
import { useQuery } from '@tanstack/react-query';
import { getPopup } from '@utils/core/API';

export const commonClasses = 'leading-relaxed text-primary-2 mx-auto';

const DefaultLayout = ({
	children,
	setBanner,
	openBanner,
	openPopUp,
	setOpenPop
}: {
	children: ReactNode;
	setBanner: Dispatch<SetStateAction<boolean>>;
	setOpenPop: Dispatch<SetStateAction<boolean>>;
	openBanner: boolean;
	openPopUp:boolean;
}) => {

	const accessToken = getGetAccessTokenFromCookie();

	const popup = useQuery(["get-popup"], () => getPopup(), {
		onSuccess(data) {
		  return data;
		},
		refetchInterval: 10000,
	});

	useGetUserData({
		enabled: !!accessToken,
		accessToken: accessToken
	});

	return (
		<>
			<MainHeader openBanner={openBanner} setBanner={setBanner} />
			{popup.data ? (
				<MarketingPopup
					popup={popup.data}
					open={openPopUp}
					onOpenChange={setOpenPop}
				/>
			) : (
				''
			)}
			<main
				className={`${commonClasses} relative bg-primary-2 ${
					openBanner ? 'mt-[70px]' : 'mt-[30px]'
				}  w-full flex flex-col`}
			>
				{children}
			</main>
			<MainFooter />
		</>
	);
};

export default DefaultLayout;
