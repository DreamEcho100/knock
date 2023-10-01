// import { IHomePageProps } from '@pages/index';
import { getHomePageData, getMainSection } from '~/utils/core/API';
import {
	AboutSection,
	HeroSection,
	OneProductShowCaseSection,
	LatestSamplesSection,
} from './sections';
import { getAllProducts } from '~/server/controllers/products';

export const runtime = 'edge';
export const revalidate = 360;

export default async function HomeScreen() {
	const [homePageData, heroSection, products] = await Promise.all([
		getHomePageData(),
		getMainSection(),
		getAllProducts({
			typesToExclude: ['Sound Editing Software', 'Tutorial'],
		}),
	]);

	return (
		<>
			<HeroSection data={heroSection} />
			<OneProductShowCaseSection data={homePageData.secondSection} />
			<AboutSection data={homePageData.thirdSection} />
			<LatestSamplesSection
				data={homePageData.forthSection}
				products={products}
			/>
		</>
	);
}
