import CustomNextSeo from '@components/shared/common/CustomNextSeo';
import type { IKnockPluginPageProps } from '@pages/knock';
import { useQuery } from '@tanstack/react-query';
import { getKnockPageData } from '@utils/core/API';
import { defaultSiteName } from '@utils/core/next-seo.config';
import { SystemRequirementsSection } from '../KnockClipper/sections';
import {
	DescriptionSection,
	EasyToUseSection,
	HeroSection,
	ShapesYourDrumsSection,
	DrumsThatKnockSection,
	ReviewsSection,
	VideosSection,
	AvailableOnIOSSection
} from './sections';


const KnockScreen = ({ knockPlugin }: IKnockPluginPageProps) => {
	const pageTitle = `KNOCK Plugin | ${defaultSiteName}`;
	const pageDescription =
		'This is the last plugin you will ever need to make your drums KNOCK and punch through your mix. This plugin was meticulously crafted by platinum producer &amp; award winning sound designer, DECAP. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics o';

	const { data } = useQuery(['knock-page-data'], getKnockPageData, {
		refetchOnWindowFocus: true
	});

	return (
		<>
			<CustomNextSeo pageTitle={pageTitle} pageDescription={pageDescription} />
			<HeroSection knockPlugin={knockPlugin} />
			<DescriptionSection data={data ? data.secondSection : ''} />
			<ShapesYourDrumsSection data={data ? data.thirdSection : ''} />
			<EasyToUseSection
				data={data ? data.forthSection : ''}
				knockPlugin={knockPlugin}
			/>
			<DrumsThatKnockSection
				data={data ? data.fifthSection : ''}
				knockPlugin={knockPlugin}
			/>
			<AvailableOnIOSSection data={data ? data.iosSection : ''} />
			<ReviewsSection
				reviews={data ? data.sixSection.six_section_knock_page_content : []}
			/>
			<SystemRequirementsSection
				items1={data ? data.sevenSection.seven_section_knock_page_mac : []}
				items1HeaderText='Mac'
				items2={data ? data.sevenSection.seven_section_knock_page_pc : []}
				items2HeaderText='PC'
				backgroundImg={false}
				data={data ? data.sevenSection : ''}
			/>
			<section aria-hidden className='section-pb-v1 bg-primary-1'></section>

			<VideosSection
				data={data ? data.eightSection : ''}
				knockPlugin={knockPlugin}
			/>
		</>
	);
};

export default KnockScreen;
