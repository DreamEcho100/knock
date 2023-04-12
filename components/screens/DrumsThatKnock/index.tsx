import CustomNextSeo from '@components/shared/common/CustomNextSeo';
import { IDrumsThatKnockPageProps } from '@pages/drums-that-knock';
import { useQuery } from '@tanstack/react-query';
import { getDTKPageData } from '@utils/core/API';
import {
	defaultSiteName2,
	defaultSiteName3
} from '@utils/core/next-seo.config';
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
	const pageTitle = `DRUMS THAT KNOCK | ${defaultSiteName3} | ${defaultSiteName2}`;
	const pageDescription =
		'Designed from scratch by DECAP. Premium quality, groundbreaking as always.';
	const { data } = useQuery(['dtk-data'], getDTKPageData , {
		refetchOnWindowFocus: true
	});

	return (
		<>
			<CustomNextSeo pageTitle={pageTitle} pageDescription={pageDescription} />
			<HeroSection data={data ? data.main_section : ''} />
			<DigitalProductsSection products={products} />
			{/* <MerchSection /> */}
			<ArtistsSection
				data={data ? data.artist : ''}
				reviews={data ? data.reviews.review_section_dtk_page_content : []}
			/>
			<KnockProductShowcaseSection
				data={data ? data.lastSection : ''}
				knockPlugin={knockPlugin}
			/>
		</>
	);
};

export default DrumsThatKnock;
