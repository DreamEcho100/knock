import { type IProduct } from 'types';
import {
	getAllProducts,
	getOneProductByHandle,
} from 'server/controllers/products';
import { getDTKPageData } from '~/utils/core/API';
import {
	defaultSiteName2,
	defaultSiteName3,
} from '~/utils/core/next-seo.config';
import HeroSection from './sections/Hero';
import DigitalProductsSection from './sections/DigitalProducts';
import ArtistsSection from './sections/Artists';
import KnockProductShowcaseSection from './sections/KnockProductShowcase';
import { getClassInstanceValues } from '~/app/libs/utils';

export interface IDrumsThatKnockPageProps {
	products: IProduct[]; // ShopifyBuy.Product[];
	knockPlugin: IProduct; // ShopifyBuy.Product;
}

export const revalidate = 360;
export const metadata = {
	title: `DRUMS THAT KNOCK | ${defaultSiteName3} | ${defaultSiteName2}`,
	description:
		'Designed from scratch by DECAP. Premium quality, groundbreaking as always.',
};

async function getPageData() {
	return await Promise.all([
		getAllProducts({ typesToExclude: ['Sound Editing Software'] }).then((res) =>
			getClassInstanceValues(res),
		),
		getOneProductByHandle('knock-plugin').then((res) =>
			getClassInstanceValues(res),
		),
		getDTKPageData(),
	]);
	// knockclipper-pluginboutique
}

export default async function DrumsThatKnockPage({}) {
	const [products, knockPlugin, dtkData] = await getPageData();

	return (
		<>
			<HeroSection data={dtkData.main_section} />
			<DigitalProductsSection products={products} />
			<ArtistsSection
				data={dtkData.artist}
				reviews={dtkData.reviews.review_section_dtk_page_content}
			/>
			<KnockProductShowcaseSection
				data={dtkData.lastSection}
				knockPlugin={knockPlugin}
			/>
		</>
	);
}
