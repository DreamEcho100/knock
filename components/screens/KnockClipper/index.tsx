import CustomNextSeo from '@components/shared/common/CustomNextSeo';
import { IKnockClipperPageProps } from '@pages/knock-clipper';
import { useQuery } from '@tanstack/react-query';
import { getKnockClipperPageData } from '@utils/core/API';
import { defaultSiteName } from '@utils/core/next-seo.config';
import {
	DescriptionSection,
	HeroSection,
	ProductShowcaseSection,
	SystemRequirementsSection,
	VideosSection
} from './sections';

const KnockScreen = ({ knockClipperPlugin }: IKnockClipperPageProps) => {
	const pageTitle = `KNOCK Clipper | ${defaultSiteName}`;
	const pageDescription =
		"This is the only soft clipper you'll ever need. KNOCK Clipper is a premium quality, user adjustable hard &amp; soft clipper designed by DECAP. It is the CLIP module from his acclaimed plugin, KNOCK. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics";
	const { data } = useQuery(
		['knockClipper-page-data'],
		getKnockClipperPageData,
		{
			refetchOnWindowFocus: true
		}
	);

	return (
		<>
			<CustomNextSeo pageTitle={pageTitle} pageDescription={pageDescription} />
			<HeroSection knockClipperPlugin={knockClipperPlugin} />
			<DescriptionSection data={data ? data.secondSection : ''} />
			<ProductShowcaseSection
				data={data ? data.thirdSection : ''}
				knockClipperPlugin={knockClipperPlugin}
			/>
			<SystemRequirementsSection
				items1={
					data ? data.forthSection.forth_section_knock_clipper_page_mac : []
				}
				items1HeaderText='Mac'
				items2={
					data ? data.forthSection.forth_section_knock_clipper_page_pc : []
				}
				items2HeaderText='PC'
				backgroundImg={false}
				data={data ? data.forthSection : ''}
			/>
			<VideosSection data={data ? data.fifthSection : ''} knockClipperPlugin={knockClipperPlugin} />
		</>
	);
};

export default KnockScreen;
