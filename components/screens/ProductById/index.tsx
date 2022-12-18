import type { IProductByIdPageProps } from '@pages/products/[productId]';
import Head from 'next/head';

import {
	DescriptionSection,
	FeaturesAndFilesIncludedSection,
	HeroSection,
	VideoSection
} from './sections';

import classes from '@styles/content.module.css';
import { NextSeo } from 'next-seo';
import { defaultSiteName3, websiteBasePath } from 'next-seo.config';
import { useRouter } from 'next/router';

const ProductByIdScreen = ({ product }: IProductByIdPageProps) => {
	const router = useRouter();
	const pageTitle = `${product.title} | ${defaultSiteName3}`;
	const pageDescription = product.description;

	return (
		<>
			<NextSeo
				title={pageTitle}
				description={pageDescription}
				canonical={`${websiteBasePath}${router.pathname.replace(
					'[productId]',
					router.query.productId as string
				)}`}
				twitter={{ handle: pageTitle }}
				openGraph={{ title: pageTitle, description: pageDescription }}
			/>
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
