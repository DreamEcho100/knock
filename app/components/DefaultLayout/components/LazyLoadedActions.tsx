import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { getPopup } from '~/utils/core/API';
import {
	getGetAccessTokenFromCookie,
	useGetUserData,
} from '~/utils/core/hooks';

const MarketingPopupDynamic = dynamic(
	() => import('~/app/components/shared/common/MarketingPopup/MarketingPopup'),
);

export default function LazyLoadedActions() {
	const accessToken = getGetAccessTokenFromCookie();

	const popup = useQuery(['get-popup'], getPopup, {
		refetchOnWindowFocus: true,
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
