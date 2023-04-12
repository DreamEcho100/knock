import { useQuery } from '@tanstack/react-query';
import { getRefundPolicy } from '@utils/core/API';
import { defaultSiteName3 } from '@utils/core/next-seo.config';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Wrapper from './components/Wrapper';

const RefundPolicyScreen = () => {
	const { data } = useQuery(['refund-policy'], getRefundPolicy, {
		refetchOnWindowFocus: true
	});

	return (
		<Wrapper
			header={{
				h1Children: 'refund policy'
			}}
			head={{
				title: `Refund Policy | ${defaultSiteName3}`,
				description: 'Refund Policy'
			}}
		>
			{data ? (
				<h2>{data.h2}</h2>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={30}
						className={`z-10 fixed  h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
			{data ? (
				<p>
					<span>{data.p}</span>
				</p>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={100}
						className={` z-10 fixed mt-5 h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
		</Wrapper>
	);
};

export default RefundPolicyScreen;
