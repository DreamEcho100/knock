import KnockScreen from './screen';
import type { IProduct } from 'types';
import {
	getAllProducts,
	getOneProductByHandle,
} from 'server/controllers/products';
import { type Metadata, type ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

export interface IKnockPluginBoutiqueProps {
	knockPluginBoutique: IProduct; // ShopifyBuy.Product;
}

type Props = {
	params: { pluginsBoutique: string };
};

export const revalidate = 360;

async function getPageData(props: Props) {
	const data = await getOneProductByHandle(props.params.pluginsBoutique).then(
		(res) => JSON.parse(JSON.stringify(res)) as IProduct,
	);

	if (!data) {
		notFound();
	}

	return data;
}

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
				...productData.images.map((image) => image.src),
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
