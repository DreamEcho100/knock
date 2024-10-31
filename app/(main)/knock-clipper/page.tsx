import {
	getKnockClipperMainSection,
	getKnockClipperPageData,
} from '~/utils/core/API';
import { defaultSiteName } from '~/utils/core/next-seo.config';
import HeroSection from './sections/Hero';
import DescriptionSection from './sections/Description';
import ProductShowcaseSection from './sections/ProductShowcase';
import SystemRequirementsSection from '~/app/_components/shared/core/SystemRequirements';

import VideosSection from './sections/Videos';
import type { Product } from '~/libs/shopify/types';
import { getProduct } from '~/libs/shopify';

export interface IKnockClipperPageProps {
	knockClipperPlugin: Product;
}

export const revalidate = 360;
export const metadata = {
	title: `KNOCK Clipper | ${defaultSiteName}`,
	description:
		"This is the only soft clipper you'll ever need. KNOCK Clipper is a premium quality, user adjustable hard &amp; soft clipper designed by DECAP. It is the CLIP module from his acclaimed plugin, KNOCK. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics",
};

async function getPageData() {
	return await Promise.all([
		getProduct('knock-clipper'),
		getKnockClipperPageData(),
		getKnockClipperMainSection(),
	]);
	// knockclipper-pluginboutique
}

export default async function KnockClipperPage() {
	const [knockClipperPlugin, knockClipperPageData, knockClipperMainSection] =
		await getPageData();

	return (
		<>
			{
				// @ts-expect-error - There should be a fallback component
				knockClipperPlugin && (
					<HeroSection
						knockClipperPlugin={knockClipperPlugin}
						knockClipperMainSection={knockClipperMainSection}
					/>
				)
			}
			<DescriptionSection data={knockClipperPageData.secondSection} />
			{
				// @ts-expect-error - There should be a fallback component
				knockClipperPlugin && (
					<ProductShowcaseSection
						data={knockClipperPageData.thirdSection}
						product={knockClipperPlugin}
					/>
				)
			}
			<SystemRequirementsSection
				items1={
					knockClipperPageData.forthSection.forth_section_knock_clipper_page_mac
				}
				items1HeaderText="Mac"
				items2={
					knockClipperPageData.forthSection.forth_section_knock_clipper_page_pc
				}
				items2HeaderText="PC"
				backgroundImg={false}
				data={knockClipperPageData.forthSection}
			/>
			{
				// @ts-expect-error - There should be a fallback component
				knockClipperPlugin && (
					<VideosSection
						pageData={knockClipperPageData.fifthSection}
						product={knockClipperPlugin}
					/>
				)
			}
		</>
	);
}
