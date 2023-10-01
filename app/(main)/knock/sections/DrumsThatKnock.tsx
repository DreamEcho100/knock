import KnockSection from '~/app/components/shared/core/KnockSection';
import AddItemOnHeroSectionButton from '~/app/components/shared/core/AddItemOnHeroSectionButton';
import KnockTrademark from '~/app/components/shared/core/KnockTrademark';
import { type IProduct } from '~/types';

export default function DrumsThatKnockSection({
	knockPlugin,
	data,
}: {
	knockPlugin: IProduct;
	data: any;
}) {
	return (
		<KnockSection
			buttonElem={
				<AddItemOnHeroSectionButton
					product={knockPlugin}
					buttonProps={{ children: data.button }}
				/>
			}
			imageSrc={process.env.NEXT_PUBLIC_KNOCK_URL_API + data.imageUrl}
			description={data.p}
			// sectionTheme={{ p: 'section-p-x-v1' }}
			textContainerTheme={{ 'sm:gap': 6 }}
			pTheme={{ width: 'medium-2' }}
			h2theme={{ 'text-size': 'md' }}
			imagesContainerTheme={{ pb: 'none' }}
			title={
				<>
					{data.h2}&nbsp;
					<KnockTrademark tradeMark={data.tradeMark} />
				</>
			}
		/>
	);
}
