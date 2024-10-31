// import { IHomePageProps } from '@pages/index';
import { getHomePageData, getMainSection } from '~/utils/core/API';
import {
	AboutSection,
	HeroSection,
	OneProductShowCaseSection,
	LatestSamplesSection,
} from './sections';
import { getProducts } from '~/libs/shopify';

export const revalidate = 360;

export default async function HomeScreen() {
	const [homePageData, heroSection, products] = await Promise.all([
		getHomePageData(),
		getMainSection(),
		getProducts().then((products) => {
			const typesToExclude = ['Sound Editing Software', 'Tutorial'];

			return products.filter(
				(product) => !typesToExclude.includes(product.productType),
			);
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
