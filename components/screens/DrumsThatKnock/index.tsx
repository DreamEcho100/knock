import { IProduct } from 'types';
import {
	ArtistSection,
	DigitalProductsSection,
	HeroSection,
	KnockProductShowcaseSection,
	MerchSection
} from './sections';

const DrumsThatKnock = ({ products }: { products: IProduct[] }) => {
	return (
		<>
			<HeroSection />
			<DigitalProductsSection products={products} />
			{/* <MerchSection /> */}
			<ArtistSection />
			<KnockProductShowcaseSection />
		</>
	);
};

export default DrumsThatKnock;
