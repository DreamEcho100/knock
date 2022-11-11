import { IKnockClipperPageProps } from '@pages/knock_clipper';
import {
	DescriptionSection,
	HeroSection,
	ProductShowcaseSection,
	SystemRequirementsSection,
	VideosSection
} from './sections';

const KnockScreen = ({ knockClipperPlugin }: IKnockClipperPageProps) => {
	return (
		<>
			<HeroSection knockClipperPlugin={knockClipperPlugin} />
			<DescriptionSection />
			<ProductShowcaseSection knockClipperPlugin={knockClipperPlugin} />
			<SystemRequirementsSection />
			<VideosSection knockClipperPlugin={knockClipperPlugin} />
		</>
	);
};

export default KnockScreen;
