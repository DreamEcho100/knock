import {
	DescriptionSection,
	HeroSection,
	ProductShowcaseSection,
	SystemRequirementsSection,
	VideosSection
} from './sections';

const KnockScreen = () => {
	return (
		<>
			<HeroSection />
			<DescriptionSection />
			<ProductShowcaseSection />
			<SystemRequirementsSection />
			<VideosSection />
		</>
	);
};

export default KnockScreen;
