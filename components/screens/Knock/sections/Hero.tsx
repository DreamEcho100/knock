import AddItemOnHeroSectionButton from '@components/shared/core/AddItemOnHeroSectionButton';
import KnockSection from '@components/shared/core/KnockSection';
import KnockTrademark from '@components/shared/core/KnockTrademark';
import { IKnockPluginPageProps } from '@pages/knock';

const HeroSection = ({
	knockPlugin
}: {
	knockPlugin: IKnockPluginPageProps['knockPlugin'];
}) => {
	return (
		<KnockSection
			// buttonProps={addKnockPluginToCartButtonProps}
			buttonElem={<AddItemOnHeroSectionButton product={knockPlugin} />}
			title={<KnockTrademark />}
			description='Make your drums KNOCK and punch through the mix.'
			pTheme={{ width: 'small' }}
		/>
	);
};

export default HeroSection;
