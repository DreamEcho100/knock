import KnockScreen from './screen';
import type { IProduct } from 'types';
import {
	getAllProducts,
	getOneProductByHandle,
} from 'server/controllers/products';
import { type Metadata, type ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getClassInstanceValues } from '~/app/libs/utils';
import { cache } from 'react';

export interface IKnockPluginBoutiqueProps {
	knockPluginBoutique: IProduct; // ShopifyBuy.Product;
}

type Props = {
	params: { pluginsBoutique: string };
};

export const revalidate = 360;

const getPageData = cache(async (props: Props) => {
	const data = await getOneProductByHandle(props.params.pluginsBoutique).then(
		(res) => getClassInstanceValues(res),
	);

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
	const paths = await getAllProducts({
		typesToExclude: ['Sound Editing Software'],
	}).then((products: any) =>
		products.map((product: any) => ({
			params: { pluginsBoutique: product.handle },
		})),
	);

	return {
		paths,
		fallback: 'blocking',
	};
}

export default async function KnockPluginBoutique(props: Props) {
	const knockPluginBoutique = await getPageData(props);

	return <KnockScreen knockPluginBoutique={knockPluginBoutique} />;
}
