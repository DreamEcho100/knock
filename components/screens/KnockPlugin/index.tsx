import {
	DescriptionSection,
	EasyToUseSection,
	HeroSection,
	ShapesYourDrumsSection,
	DrumsThatKnockSection,
	ReviewsSection,
	VideosSection
} from './sections';

const KnockPluginScreen = () => {
	return (
		<>
			<HeroSection />
			<DescriptionSection />
			<ShapesYourDrumsSection />
			<EasyToUseSection />
			<DrumsThatKnockSection />
			<ReviewsSection />
			<VideosSection />
		</>
	);
};

export default KnockPluginScreen;
