import { getDTKPageData } from '~/utils/core/API';
import {
	defaultSiteName2,
	defaultSiteName3,
} from '~/utils/core/next-seo.config';
import HeroSection from './sections/Hero';
import DigitalProductsSection from './sections/DigitalProducts';
import ArtistsSection from './sections/Artists';
import KnockProductShowcaseSection from './sections/KnockProductShowcase';
import type { Product } from '~/libs/shopify/types';
import { getProduct, getProducts } from '~/libs/shopify';

export interface IDrumsThatKnockPageProps {
	products: Product[]; // ShopifyBuy.Product[];
	knockPlugin: Product; // ShopifyBuy.Product;
}

export const revalidate = 360;
export const metadata = {
	title: `DRUMS THAT KNOCK | ${defaultSiteName3} | ${defaultSiteName2}`,
	description:
		'Designed from scratch by DECAP. Premium quality, groundbreaking as always.',
};

async function getPageData() {
	return await Promise.all([
		getProducts().then((res) => {
			const typesToExclude = ['Sound Editing Software'];

			return res.filter(
				(product) => !typesToExclude.includes(product.productType),
			);
		}),
		getProduct('knock-plugin'),
		getDTKPageData(),
	]);
	// knockclipper-pluginboutique
}

export default async function DrumsThatKnockPage({}) {
	const [products, knockPlugin, dtkData] = await getPageData();

	return (
		<div className="w-full max-w-[100vw] overflow-x-hidden">
			<HeroSection data={dtkData.main_section} />
			<DigitalProductsSection products={products} />
			<ArtistsSection
				data={dtkData.artist}
				reviews={dtkData.reviews.review_section_dtk_page_content}
			/>
			{/* 
			// @ts-expect-error - a fallback should be handled */}
			{knockPlugin && (
				<KnockProductShowcaseSection
					data={dtkData.lastSection}
					product={knockPlugin}
				/>
			)}
		</div>
	);
}
