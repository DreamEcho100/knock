import type { IKnockPluginPageProps } from '@pages/knock';

import KnockSection from '@components/shared/core/KnockSection';
import { useAddKnockPluginToCartButtonProps } from './utils/hookes';

const DrumsThatKnockSection = ({
	knockPlugin
}: {
	knockPlugin: IKnockPluginPageProps['knockPlugin'];
}) => {
	const addKnockPluginToCartButtonProps = useAddKnockPluginToCartButtonProps({
		knockPlugin
	});

	return (
		<KnockSection
			imageSrc='/images/29f8b3dde3b1d7e7a476bf19c95536f1.png'
			buttonProps={addKnockPluginToCartButtonProps}
			description="This plugin includes every feature DECAP used in order to craft his signature sound heard in DRUMS THAT KNOCK, and has been optimized for the highest quality sound possible. Every feature has been fine tuned to perfection to DECAP's production standards. KNOCK also comes bundled with factory presets crafted by DECAP."
			sectionTheme={{ p: 'section-p-x-v1' }}
			pTheme={{ width: 'larger' }}
			h2theme={{ 'text-size': 'md' }}
		/>
	);
};

export default DrumsThatKnockSection;
