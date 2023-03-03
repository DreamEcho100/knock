import type { IKnockPluginPageProps } from '@pages/knock';

import KnockSection from '@components/shared/core/KnockSection';
import AddItemOnHeroSectionButton from '@components/shared/core/AddItemOnHeroSectionButton';
import KnockTrademark from '@components/shared/core/KnockTrademark';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const DrumsThatKnockSection = ({
	knockPlugin,
	data
}: {
	knockPlugin: IKnockPluginPageProps['knockPlugin'];
	data: any;
}) => {

	return (
		<KnockSection
			buttonElem={
				<AddItemOnHeroSectionButton
					product={knockPlugin}
					buttonProps={{ children: data ? data.button : false }}
				/>
			}
			imageSrc={
				data ? process.env.NEXT_PUBLIC_KNOCK_URL_API + data.imageUrl : false
			}
			description={data ? data.p : ''}
			// sectionTheme={{ p: 'section-p-x-v1' }}
			textContainerTheme={{ 'sm:gap': 6 }}
			pTheme={{ width: 'medium-2' }}
			h2theme={{ 'text-size': 'md' }}
			imagesContainerTheme={{ pb: 'none' }}
			title={
				data ? (
					<>
						{data.h2}&nbsp;
						<KnockTrademark tradeMark={data.tradeMark} />
					</>
				) : (
					<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
						<Skeleton
							width={200}
							count={1}
							height={30}
							className={'rounded-3xl mt-5 '}
						/>
					</SkeletonTheme>
				)
			}
		/>
	);
};

export default DrumsThatKnockSection;
