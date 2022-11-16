import KnockSection from '@components/shared/core/KnockSection';
import KnockTrademark from '@components/shared/core/KnockTrademark';
import { IKnockPluginPageProps } from '@pages/knock';
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
			title={
				<>
					<KnockTrademark /> Plugin
				</>
			}
			description='Make your drums KNOCK and punch through the mix.'
			pTheme={{ text: 'medium', width: 'large' }}
		/>
	);
};

export default HeroSection;
