import KnockSection from '@components/shared/core/KnockSection';
import { IKnockPluginPageProps } from '@pages/knock-plugin';
import { useAddKnockPluginToCartButtonProps } from './utils/hookes';

const HeroSection = ({
	knockPlugin
}: {
	knockPlugin: IKnockPluginPageProps['knockPlugin'];
}) => {
	const addKnockPluginToCartButtonProps = useAddKnockPluginToCartButtonProps({
		knockPlugin
	});

	return (
		<KnockSection
			buttonProps={addKnockPluginToCartButtonProps}
			description='Make your drums KNOCK and punch through the mix.'
			pTheme={{ text: 'medium', width: 'small' }}
		/>
	);
};

export default HeroSection;
