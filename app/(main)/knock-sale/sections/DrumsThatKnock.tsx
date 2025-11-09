import KnockSection from '~/app/_components/shared/core/KnockSection';
import AddItemOnHeroSectionButton from '~/app/_components/shared/core/AddItemOnHeroSectionButton';
import KnockTrademark from '~/app/_components/shared/core/KnockTrademark';
import type { Product, ProductVariant } from '~/libs/shopify/types';

export default function DrumsThatKnockSection({
	product,
	variant,
	data,
}: {
	product: Product;
	variant: ProductVariant;
	data: any;
}) {
	return (
		<KnockSection
			buttonElem={
				<AddItemOnHeroSectionButton
					product={product}
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
					<KnockTrademark tradeMarkPrefix={data.tradeMark} />
				</>
			}
		/>
	);
}
