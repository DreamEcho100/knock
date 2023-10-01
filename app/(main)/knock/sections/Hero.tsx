import AddItemOnHeroSectionButton from '~/app/components/shared/core/AddItemOnHeroSectionButton';
import KnockSection from '~/app/components/shared/core/KnockSection';
import KnockTrademark from '~/app/components/shared/core/KnockTrademark';
import { type IProduct } from '~/types';

export default function HeroSection({
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
					buttonProps={{ children: data.main.buttonText }}
				/>
			}
			title={
				<>
					{data.main.h2}&nbsp;
					<KnockTrademark tradeMark={data.main.tradeMark} />
				</>
			}
			description={data.main && data.main.p}
			pTheme={{ width: 'small' }}
			imageSrc={process.env.NEXT_PUBLIC_KNOCK_URL_API + data.main.mainImageUrl}
		/>
	);
}
