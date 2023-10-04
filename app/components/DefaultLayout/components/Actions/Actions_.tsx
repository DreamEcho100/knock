'use client';
import { useQueries } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { getBanner, getPopup } from '~/utils/core/API';
import {
	getGetAccessTokenFromCookie,
	useGetUserData,
} from '~/utils/core/hooks';

const MarketingPopupDynamic = dynamic(
	() => import('~/app/components/shared/common/MarketingPopup/MarketingPopup'),
	{ ssr: false },
);

export default function Actions() {
	const accessToken = getGetAccessTokenFromCookie();

	console.log('isActive: ', true);

	const [popup] = useQueries({
		queries: [
			{
				queryKey: ['get-popup'],
				queryFn: getPopup,
				refetchOnWindowFocus: true,
			},
			{
				queryKey: ['banner-data'],
				queryFn: getBanner,
				refetchOnWindowFocus: true,
			},
		],
	});

	useGetUserData({
		enabled: !!accessToken,
		accessToken: accessToken,
	});

	return (
		<>
			{popup.data && !popup.data.disable && (
				<MarketingPopupDynamic popup={popup.data} />
			)}
		</>
	);
}
