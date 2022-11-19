import KnockTrademark from '@components/shared/core/KnockTrademark';
import KnockSection from '@components/shared/core/KnockSection';

const HeroSection = () => {
	return (
		<KnockSection
			description='Make your drums KNOCK and punch through the mix.'
			title={<KnockTrademark />}
			pTheme={{ width: 'small' }}
			buttonProps={{
				className: 'capitalize',
				href: '/knock',
				children: 'Explore it now'
			}}
		/>
	);
};

export default HeroSection;
