import type { IProductByIdPageProps } from '@pages/products/[productId]';
import Head from 'next/head';

import {
	DescriptionSection,
	FeaturesAndFilesIncludedSection,
	HeroSection,
	VideoSection
} from './sections';

import classes from '@styles/content.module.css';

const ProductByIdScreen = ({ product }: IProductByIdPageProps) => {
	return (
		<>
			<Head>
				<title>{product.title} | KNOCK Plugin - Make Your Drums Knock</title>
				<meta name='description' content={product.description} />
			</Head>
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
