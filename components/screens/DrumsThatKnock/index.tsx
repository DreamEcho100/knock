import { IDrumsThatKnockPageProps } from '@pages/drums-that-knock';
import {
	ArtistsSection,
	DigitalProductsSection,
	HeroSection,
	KnockProductShowcaseSection
} from './sections';

const DrumsThatKnock = ({
	products,
	knockPlugin
}: IDrumsThatKnockPageProps) => {
	return (
		<>
			<HeroSection />
			<DigitalProductsSection products={products} />
			{/* <MerchSection /> */}
			<ArtistsSection />
			<KnockProductShowcaseSection knockPlugin={knockPlugin} />
		</>
	);
};

export default DrumsThatKnock;
