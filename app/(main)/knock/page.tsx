import { defaultSiteName } from '~/utils/core/next-seo.config';
import {
	DescriptionSection,
	EasyToUseSection,
	HeroSection,
	ShapesYourDrumsSection,
	DrumsThatKnockSection,
	ReviewsSection,
	VideosSection,
	AvailableOnIOSSection,
} from './sections';
import type { IProduct } from 'types';
import { getOneProductByHandle } from 'server/controllers/products';
import { getKnockMainSection, getKnockPageData } from '~/utils/core/API';
import SystemRequirementsSection from '~/app/components/shared/core/SystemRequirements';
import { getClassInstanceValues } from '~/app/libs/utils';

export interface IKnockPluginPageProps {
	knockPlugin: IProduct; // ShopifyBuy.Product;
}

export const revalidate = 360;
export const metadata = {
	title: `KNOCK Plugin | ${defaultSiteName}`,
	description:
		'This is the last plugin you will ever need to make your drums KNOCK and punch through your mix. This plugin was meticulously crafted by platinum producer &amp; award winning sound designer, DECAP. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics o',
};

export default async function KnockPluginPage() {
	const [knockPlugin, knockPageData, knockMainSection] = await Promise.all([
		getOneProductByHandle('knock-plugin').then((res) =>
			getClassInstanceValues(res),
		),
		getKnockPageData(),
		getKnockMainSection(),
	]);

	return (
		<>
			<HeroSection knockPlugin={knockPlugin} data={knockMainSection} />
			<DescriptionSection data={knockPageData.secondSection} />
			<ShapesYourDrumsSection data={knockPageData.thirdSection} />
			<EasyToUseSection
				data={knockPageData.forthSection}
				knockPlugin={knockPlugin}
			/>
			<DrumsThatKnockSection
				data={knockPageData.fifthSection}
				knockPlugin={knockPlugin}
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
		</>
	);
}
