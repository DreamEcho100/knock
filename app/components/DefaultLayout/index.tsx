'use client';
import type { ReactNode } from 'react';

import { useState } from 'react';
import MainHeader from './components/MainHeader';
import {
	getGetAccessTokenFromCookie,
	useGetUserData,
} from '~/utils/core/hooks';
import MainFooter from './components/MainFooter';
import MarketingPopup from '~/app/components/shared/common/MarketingPopup/MarketingPopup';
import { useQuery } from '@tanstack/react-query';
import { getBanner, getPopup } from '~/utils/core/API';

export const commonClasses = 'leading-relaxed text-primary-2 mx-auto';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
	const [openPopUp, setOpenPop] = useState(false);
	const [openBanner, setBanner] = useState(true);

	// const isHidingPopup = getCookie('hide-marketing-popup');
	const accessToken = getGetAccessTokenFromCookie();

	const popup = useQuery(['get-popup'], getPopup, {
		refetchOnWindowFocus: true,
	});

	const banner = useQuery(['banner-data'], getBanner, {
		refetchOnWindowFocus: true,
	});

	useGetUserData({
		enabled: !!accessToken,
		accessToken: accessToken,
	});

	return (
		<>
			<MainHeader openBanner={openBanner} setBanner={setBanner} />
			{popup.data && !popup.data.disable ? (
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
					banner.data?.disable
						? 'mt-[40px]'
						: `${openBanner ? 'mt-[100px]' : 'mt-[5px]'}`
				}  w-full flex flex-col`}
			>
				{children}
			</main>
			<MainFooter />
		</>
	);
};

export default DefaultLayout;
