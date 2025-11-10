import { defaultSiteName } from '~/utils/core/next-seo.config';
import {
	AvailableOnIOSSection,
	DescriptionSection,
	DrumsThatKnockSection,
	EasyToUseSection,
	HeroSection,
	ReviewsSection,
	ShapesYourDrumsSection,
	VideosSection,
} from './sections';
import {
	getKnockClipperMainSection,
	getKnockMainSection,
	getKnockPageData,
} from '~/utils/core/API';
import type { Product } from '~/libs/shopify/types';
import { getProduct } from '~/libs/shopify';
import { notFound } from 'next/navigation';
import ClipperHeroSection from '../knock-clipper/sections/Hero';
import AddItemOnHeroSectionButton from '~/app/_components/shared/core/AddItemOnHeroSectionButton';
import CustomNextImage from '~/app/_components/shared/common/CustomNextImage';
import Link from 'next/link';
import SystemRequirementsSection from '~/app/_components/shared/core/SystemRequirements';

export interface IKnockPluginPageProps {
	product: Product; // ShopifyBuy.Product;
}

export const revalidate = 360;
export const metadata = {
	title: `KNOCK Plugin Sale - Premium Audio Plugins at Discounted Prices | ${defaultSiteName}`,
	description:
		'Shop the KNOCK plugin sale and save on professional audio processing tools. Get the KNOCK Plugin, KNOCK Clipper, and Sample Bundle at exclusive prices. Industry-leading drum processing and clipper plugins trusted by producers worldwide. Limited time offer.',
	keywords:
		'KNOCK plugin sale, audio plugin discount, drum processing plugin, KNOCK Clipper sale, music production plugins, beat making tools, professional audio software',
	openGraph: {
		title: `KNOCK Plugin Sale - Save on Professional Audio Tools | ${defaultSiteName}`,
		description:
			'Limited time sale on KNOCK plugins. Get professional drum processing and clipper tools at discounted prices. Transform your beats today.',
	},
};

export default async function KnockSalePage() {
	const [
		knockPlugin,
		knockMainSection,
		knockPageData,
		//
		knockClipperPlugin,
		knockClipperMainSection,
		//
		knockSampleBundleProduct,
	] = await Promise.all([
		getProduct({ handle: 'knock-plugin' }),
		getKnockMainSection(),
		getKnockPageData(),
		//
		getProduct({ handle: 'knock-clipper' }),
		getKnockClipperMainSection(),
		// https://shop.pluginsthatknock.com/products/knock-plugin-sample-bundle
		getProduct({ handle: 'knock-plugin-sample-bundle' }),
	]);

	if (!knockPlugin) {
		notFound();
	}

	const secondarySectionGridStyle =
		knockClipperPlugin && knockSampleBundleProduct
			? 'grid-cols-1 md:grid-cols-2'
			: knockClipperPlugin && knockSampleBundleProduct
				? 'grid-cols-1 md:grid-cols-2'
				: 'hidden';

	return (
		<div className="w-full max-w-[100vw] overflow-x-hidden bg-primary-1">
			<HeroSection knockPlugin={knockPlugin} data={knockMainSection} />
			<div className={`grid max-w-5xl mx-auto ${secondarySectionGridStyle}`}>
				{knockClipperPlugin && (
					<ClipperHeroSection
						knockClipperPlugin={knockClipperPlugin}
						knockClipperMainSection={knockClipperMainSection}
						featuredImg={{
							width: 300,
							height: 300,
						}}
						titleAnchor={{ href: '/knock-clipper' }}
					/>
				)}
				{knockSampleBundleProduct && (
					<section className="bg-primary-1 section-p-v1 section-h-v1">
						<div className="h-full flex items-center justify-center flex-col text-center">
							<div className="relative flex items-center justify-center max-w-[900px] mb-8">
								<CustomNextImage
									src={knockSampleBundleProduct.featuredImage.url}
									alt={knockSampleBundleProduct.featuredImage.altText ?? ''}
									width={300}
									height={300}
									priority
									className="object-cover relative"
									style={{ aspectRatio: '16 / 16' }}
								/>
							</div>
							<h2 className="text-h3 font-semibold text-primary-1 mt-4 mb-3 flex flex-wrap justify-center uppercase">
								<Link href={`/products/${knockSampleBundleProduct.handle}`}>
									{knockSampleBundleProduct.title}
								</Link>
							</h2>
							<p className="text-primary-2 mt-2 mb-5 leading-6 max-w-[350px] sm:text-[1.3rem]">
								Everything you need to make your beats KNOCK in one package!
							</p>
							<AddItemOnHeroSectionButton
								product={knockSampleBundleProduct}
								buttonProps={{
									children: knockClipperMainSection
										? knockClipperMainSection.main.buttonText
										: false,
								}}
							/>
						</div>
					</section>
				)}
			</div>

			<DescriptionSection data={knockPageData.secondSection} />
			<ShapesYourDrumsSection data={knockPageData.thirdSection} />
			<EasyToUseSection
				data={knockPageData.forthSection}
				product={knockPlugin}
			/>
			<DrumsThatKnockSection
				data={knockPageData.fifthSection}
				product={knockPlugin}
				variant={knockPlugin.variants[0]}
			/>
			<AvailableOnIOSSection data={knockPageData.iosSection} />
			<ReviewsSection
				reviews={knockPageData.sixSection.six_section_knock_page_content}
			/>
			<SystemRequirementsSection
				items1={knockPageData.sevenSection.seven_section_knock_page_mac}
				items1HeaderText="Mac"
				items2={knockPageData.sevenSection.seven_section_knock_page_pc}
				items2HeaderText="PC"
				backgroundImg={false}
				data={knockPageData.sevenSection}
			/>
			<section aria-hidden className="section-pb-v1 bg-primary-1"></section>

			<VideosSection
				data={knockPageData.eightSection}
				knockPlugin={knockPlugin}
			/>
		</div>
	);
}
