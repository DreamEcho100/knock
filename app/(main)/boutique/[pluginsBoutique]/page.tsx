import KnockScreen from './screen';
import { type Metadata, type ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import type { Product } from '~/libs/shopify/types';
import { getProduct, getProducts } from '~/libs/shopify';

export interface IKnockPluginBoutiqueProps {
	knockPluginBoutique: Product; // ShopifyBuy.Product;
}

type Props = {
	params: { pluginsBoutique: string };
};

export const revalidate = 360;

const getPageData = cache(async (props: Props) => {
	const data = await getProduct({ handle: props.params.pluginsBoutique });

	if (!data) {
		notFound();
	}

	return data;
});

export async function generateMetadata(
	props: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	// read route params
	const productData = await getPageData(props);

	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images ?? [];

	return {
		title: productData.title,
		description: productData.description,
		openGraph: {
			images: [
				...productData.images.map((image) => image.url),
				...previousImages,
			],
		},
	};
}

export async function getStaticPaths() {
	const paths = await getProducts().then((products) => {
		const paths = [];

		const typesToExclude = ['Sound Editing Software'];

		for (const product of products) {
			if (!typesToExclude.includes(product.productType)) {
				paths.push({ params: { pluginsBoutique: product.handle } });
			}
		}

		return paths;
	});

	return {
		paths,
		fallback: 'blocking',
	};
}

export default async function KnockPluginBoutique(props: Props) {
	const knockPluginBoutique = await getPageData(props);

	return <KnockScreen knockPluginBoutique={knockPluginBoutique} />;
}
