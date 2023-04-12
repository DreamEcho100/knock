import KnockTrademark from '@components/shared/core/KnockTrademark';
import KnockSection from '@components/shared/core/KnockSection';
import { useQuery } from '@tanstack/react-query';
import { getMainSection } from '@utils/core/API';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const HeroSection = () => {
	const { data } = useQuery(['HeroSection'], getMainSection, {
		refetchOnWindowFocus: true
	});

	return (
		<KnockSection
			description={
				data ? (
					data.p
				) : (
					<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
						<Skeleton
							width={300}
							count={1}
							height={20}
							className={'rounded-3xl '}
						/>
					</SkeletonTheme>
				)
			}
			title={
				data ? (
					<KnockTrademark tradeMark={data.h2} />
				) : (
					<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
						<Skeleton
							width={350}
							count={1}
							height={20}
							className={'rounded-3xl '}
						/>
					</SkeletonTheme>
				)
			}
			colorText={{
				p:data ? data.pColor : '',
				h2:data ? data.h2Color : ''
			}}
			pTheme={{ width: 'small' }}
			mainImgOrVideoLink={data ? data.buttonUrl : ''}
			imageSrc={
				data
					? data.mainImageUrl
						? `${process.env.NEXT_PUBLIC_KNOCK_URL_API}${data.mainImageUrl}`
						: ''
					: ''
			}
			mainImgOrVideoProps={{ isAnimated: true }}
			buttonProps={{
				className: 'capitalize',
				href: data ? data.buttonUrl : '',
				children: data ? data.buttonText : ''
			}}
		/>
	);
};

export default HeroSection;
