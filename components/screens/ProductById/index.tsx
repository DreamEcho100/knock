import type { IProductByIdPageProps } from '@pages/products/[productId]';

import {
	DescriptionSection,
	FeaturesAndFilesIncludedSection,
	HeroSection,
	VideoSection
} from './sections';

import { defaultSiteName3 } from '@utils/core/next-seo.config';
import CustomNextSeo from '@components/shared/common/CustomNextSeo';

const ProductByIdScreen = ({ product }: IProductByIdPageProps) => {
	const pageTitle = `${product.title} | ${defaultSiteName3}`;
	const pageDescription = product.description;

	return (
		<>
			<CustomNextSeo pageTitle={pageTitle} pageDescription={pageDescription} />
			<HeroSection product={product} />
			{/* <DescriptionSection description={product.description} /> */}
			{/* <FeaturesAndFilesIncludedSection
			features={product.features}
			filesIncluded={product.filesIncluded}
		/>
		<VideoSection video={product.video} /> */}
		</>
	);
};

export default ProductByIdScreen;
