import { IKnockClipperPageProps } from '@pages/knock_clipper';
import Head from 'next/head';
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
			<Head>
				<title>KNOCK Clipper | PLUGINS THAT KNOCK</title>
				<meta
					name='description'
					content="This is the only soft clipper you'll ever need. KNOCK Clipper is a premium quality, user adjustable hard &amp; soft clipper designed by DECAP. It is the CLIP module from his acclaimed plugin, KNOCK. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics"
				/>
			</Head>
			<HeroSection knockClipperPlugin={knockClipperPlugin} />
			<DescriptionSection />
			<ProductShowcaseSection knockClipperPlugin={knockClipperPlugin} />
			<SystemRequirementsSection />
			<VideosSection knockClipperPlugin={knockClipperPlugin} />
		</>
	);
};

export default KnockScreen;
