import { IDrumsThatKnockPageProps } from '@pages/drums-that-knock';
import type { IProduct } from 'types';
import {
	ArtistSection,
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
			<ArtistSection />
			<KnockProductShowcaseSection knockPlugin={knockPlugin} />
		</>
	);
};

export default DrumsThatKnock;
