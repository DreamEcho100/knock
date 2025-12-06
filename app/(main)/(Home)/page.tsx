// import { IHomePageProps } from '@pages/index';
import { getHomePageData, getMainSection } from '~/utils/core/API';
import {
	AboutSection,
	HeroSection,
	OneProductShowCaseSection,
	LatestSamplesSection,
} from './sections';
import { getProducts } from '~/libs/shopify';
import KnockSalePage from '../knock-sale/page';
import { defaultSiteName } from '~/utils/core/next-seo.config';

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

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// export default async function HomeScreen() {
// 	const [homePageData, heroSection, products] = await Promise.all([
// 		getHomePageData(),
// 		getMainSection(),
// 		getProducts().then((products) => {
// 			const typesToExclude = ['Sound Editing Software', 'Tutorial'];

// 			return products.filter(
// 				(product) => !typesToExclude.includes(product.productType),
// 			);
// 		}),
// 	]);

// 	return (
// 		<>
// 			<HeroSection data={heroSection} />
// 			<OneProductShowCaseSection data={homePageData.secondSection} />
// 			<AboutSection data={homePageData.thirdSection} />
// 			<LatestSamplesSection
// 				data={homePageData.forthSection}
// 				products={products}
// 			/>
// 		</>
// 	);
// }
export default KnockSalePage;
