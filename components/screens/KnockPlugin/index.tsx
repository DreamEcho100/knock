import type { IKnockPluginPageProps } from '@pages/knock-plugin';
import {
	DescriptionSection,
	EasyToUseSection,
	HeroSection,
	ShapesYourDrumsSection,
	DrumsThatKnockSection,
	ReviewsSection,
	VideosSection
} from './sections';

const KnockPluginScreen = ({ knockPlugin }: IKnockPluginPageProps) => {
	return (
		<>
			<HeroSection knockPlugin={knockPlugin} />
			<DescriptionSection />
			<ShapesYourDrumsSection />
			<EasyToUseSection knockPlugin={knockPlugin} />
			<DrumsThatKnockSection knockPlugin={knockPlugin} />
			<ReviewsSection />
			<VideosSection knockPlugin={knockPlugin} />
		</>
	);
};

export default KnockPluginScreen;
