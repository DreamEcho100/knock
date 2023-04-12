import { useQuery } from '@tanstack/react-query';
import { getShippingPolicy } from '@utils/core/API';
import { defaultSiteName3 } from '@utils/core/next-seo.config';
import { type CSSProperties } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Wrapper from './components/Wrapper';

const ShippingPolicyScreen = () => {
	const { data } = useQuery(['shipping-policy'], getShippingPolicy, {
		refetchOnWindowFocus: true
	});
	return (
		<Wrapper
			head={{
				title: `Shipping Policy | ${defaultSiteName3}`,
				description:
					'This Shipping Policy describes is for the Digital Products and the Physical Products'
			}}
			header={{
				h1Children: 'Shipping Policy'
			}}
			sectionProps={{
				style: {
					'--ul-li-style': 'url(/svgs/gray-circle.svg)'
				} as CSSProperties
			}}
		>
			{data ? (
				<h2>{data.h2}</h2>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={60}
						className={`z-10 fixed  h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
			{data ? (
				<p>{data.p}</p>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={30}
						className={`z-10 fixed mt-5  h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}

			{data ? (
				<h2>{data.h2s}</h2>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={60}
						className={`z-10 fixed mt-5 h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
			{data ? (
				<p>{data.p2}</p>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={30}
						className={`z-10 fixed mt-5 h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
			{data ? (
				<ul>
					{data.ul.map((el: { id: any; li: string }) => (
						<div
							key={el.id}
							className='grid items-center	'
							style={{ gridTemplateColumns: '5fr .5fr' }}
						>
							<li key={el.id}>{el.li}</li>
						</div>
					))}
				</ul>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={5}
						height={20}
						className={`z-10 fixed mt-4 h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
		</Wrapper>
	);
};

export default ShippingPolicyScreen;
