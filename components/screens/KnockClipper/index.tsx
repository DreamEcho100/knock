import CustomNextSeo from '@components/shared/common/CustomNextSeo';
import { IKnockClipperPageProps } from '@pages/knock-clipper';
import { defaultSiteName } from '@utils/core/next-seo.config';
import {
	DescriptionSection,
	HeroSection,
	ProductShowcaseSection,
	SystemRequirementsSection,
	VideosSection
} from './sections';

const KnockScreen = ({ knockClipperPlugin }: IKnockClipperPageProps) => {
	const pageTitle = `KNOCK Clipper | ${defaultSiteName}`;
	const pageDescription =
		"This is the only soft clipper you'll ever need. KNOCK Clipper is a premium quality, user adjustable hard &amp; soft clipper designed by DECAP. It is the CLIP module from his acclaimed plugin, KNOCK. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics";

	return (
		<>
			<CustomNextSeo pageTitle={pageTitle} pageDescription={pageDescription} />
			<HeroSection knockClipperPlugin={knockClipperPlugin} />
			<DescriptionSection />
			<ProductShowcaseSection knockClipperPlugin={knockClipperPlugin} />
			<SystemRequirementsSection
				items1={[
					'9 OSX 11+ - AU, VST3, AAX (Fully compatible with both Mac OS Ventura and Apple M1 & M2.)',
					'Intel Core i5, i7, i9, Xeon, Apple M1',
					'8GB RAM required, 16GB recommended',
					'HDD Space requirements: Minimum of 500MB'
				]}
				items1HeaderText='Mac'
				items2={[
					'Intel Core i5, i7, i9, Xeon (all Gen 5 and above), AMD Quad Core',
					'Windows 8.1, 10 - 64 bit  VST3, AAX',
					'8GB RAM required, 16GB recommended',
					'HDD Space requirements: Minimum of 500MB'
				]}
				items2HeaderText='PC'
				backgroundImg={false}
			/>
			<VideosSection knockClipperPlugin={knockClipperPlugin} />
		</>
	);
};

export default KnockScreen;
