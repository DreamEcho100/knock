import { type IProduct } from 'types';
import { getOneProductByHandle } from 'server/controllers/products';
import {
	getKnockClipperMainSection,
	getKnockClipperPageData,
} from '~/utils/core/API';
import { defaultSiteName } from '~/utils/core/next-seo.config';
import HeroSection from './sections/Hero';
import DescriptionSection from './sections/Description';
import ProductShowcaseSection from './sections/ProductShowcase';
import SystemRequirementsSection from '~/app/components/shared/core/SystemRequirements';

import VideosSection from './sections/Videos';
import { getClassInstanceValues } from '~/app/libs/utils';

export interface IKnockClipperPageProps {
	knockClipperPlugin: IProduct;
}

export const revalidate = 360;
export const metadata = {
	title: `KNOCK Clipper | ${defaultSiteName}`,
	description:
		"This is the only soft clipper you'll ever need. KNOCK Clipper is a premium quality, user adjustable hard &amp; soft clipper designed by DECAP. It is the CLIP module from his acclaimed plugin, KNOCK. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics",
};

async function getPageData() {
	return await Promise.all([
		getOneProductByHandle('knock-clipper').then((res) =>
			getClassInstanceValues(res),
		),
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
			<HeroSection
				knockClipperPlugin={knockClipperPlugin}
				knockClipperMainSection={knockClipperMainSection}
			/>
			<DescriptionSection data={knockClipperPageData.secondSection} />
			<ProductShowcaseSection
				data={knockClipperPageData.thirdSection}
				knockClipperPlugin={knockClipperPlugin}
			/>
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
			<VideosSection
				data={knockClipperPageData.fifthSection}
				knockClipperPlugin={knockClipperPlugin}
			/>
		</>
	);
}
