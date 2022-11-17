import type { CSSProperties } from 'react';

import CustomNextImage from '@components/shared/common/CustomNextImage';
import Button from '@components/shared/core/Button';
import KnockTrademark from '@components/shared/core/KnockTrademark';
import KnockSection from '@components/shared/core/KnockSection';

const HeroSection = () => {
	return (
		<KnockSection
			// buttonProps={addKnockPluginToCartButtonProps}
			// imageSrc='/images/29f8b3dde3b1d7e7a476bf19c95536f1.png'
			description='Make your drums KNOCK and punch through the mix.'
			title={<KnockTrademark />}
			pTheme={{ width: 'small' }}
			// h2theme={{ 'text-size': 'md' }}
			buttonProps={{
				className: 'capitalize',
				href: '/knock',
				children: 'Explore it now'
			}}
		/>
	);
};

export default HeroSection;
