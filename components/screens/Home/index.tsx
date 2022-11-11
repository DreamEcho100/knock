import { IHomePageProps } from '@pages/index';
import {
	AboutSection,
	HeroSection,
	OneProductShowCaseSection,
	LatestSamplesSection
} from './sections';

const HomeScreen = ({ products }: IHomePageProps) => {
	return (
		<>
			<HeroSection />
			<OneProductShowCaseSection />
			<AboutSection />
			<LatestSamplesSection products={products} />
		</>
	);
};

export default HomeScreen;
