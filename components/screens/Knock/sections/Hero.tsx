import AddItemOnHeroSectionButton from '@components/shared/core/AddItemOnHeroSectionButton';
import KnockSection from '@components/shared/core/KnockSection';
import KnockTrademark from '@components/shared/core/KnockTrademark';
import { IKnockPluginPageProps } from '@pages/knock';
import { useQuery } from '@tanstack/react-query';
import { getKnockMainSection } from '@utils/core/API';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const HeroSection = ({
	knockPlugin
}: {
	knockPlugin: IKnockPluginPageProps['knockPlugin'];
}) => {
	const { data } = useQuery(['knock-main-section'], getKnockMainSection, {
		refetchOnWindowFocus: true
	});

	return (
		<KnockSection
			buttonElem={
				data && data.main ? (
					<AddItemOnHeroSectionButton
						product={knockPlugin}
						buttonProps={{ children: data ? data.main.buttonText : false }}
					/>
				) : (
					<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
						<Skeleton
							width={150}
							count={1}
							height={30}
							className={'rounded-3xl  '}
						/>
					</SkeletonTheme>
				)
			}
			title={
				data && data.main ? (
					<>
						{data && data.main.h2}&nbsp;
						<KnockTrademark tradeMark={data && data.main.tradeMark} />
					</>
				) : (
					<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
						<Skeleton
							width={250}
							count={1}
							height={20}
							className={'rounded-3xl  '}
						/>
					</SkeletonTheme>
				)
			}
			description={
				data && data.main ? (
					data && data.main.p
				) : (
					<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
						<Skeleton
							width={250}
							count={1}
							height={20}
							className={'rounded-3xl  '}
						/>
					</SkeletonTheme>
				)
			}
			pTheme={{ width: 'small' }}
			imageSrc={
				data && data.main
					? process.env.NEXT_PUBLIC_KNOCK_URL_API + data.main.mainImageUrl
					: ''
			}
		/>
	);
};

export default HeroSection;
