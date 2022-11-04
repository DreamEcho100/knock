import {
	AboutSection,
	HeroSection,
	OneProductShowCaseSection,
	LatestSamplesSection
} from './sections';

const HomeScreen = () => {
	return (
		<>
			<HeroSection />
			<OneProductShowCaseSection />
			<AboutSection />
			<LatestSamplesSection />
		</>
	);
};

export default HomeScreen;
