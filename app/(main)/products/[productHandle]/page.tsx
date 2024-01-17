import {
	getAllProducts,
	getOneCustomProductByHandle,
} from '~/server/controllers/products';
import { notFound, redirect } from 'next/navigation';
import ProductByHandleScreen from './screen';
import { type Metadata, type ResolvingMetadata } from 'next';
import { defaultSiteName3 } from '~/utils/core/next-seo.config';
import { cache } from 'react';

type Props = {
	params: { productHandle: string };
};

const pages_redirects_map: Record<string, string> = {
	'knock-plugin': '/knock',
	'knock-clipper': '/knock-clipper',
};

const getPageData = cache(async (props: Props) => {
	if (props.params.productHandle.search('boutique') !== -1) {
		notFound();
	}

	if (typeof pages_redirects_map[props.params.productHandle] === 'string') {
		redirect(pages_redirects_map[props.params.productHandle]);
	}

	const product = await getOneCustomProductByHandle(props.params.productHandle);

	if (!product) {
		notFound();
	}

	return product;
});

export const revalidate = 360;
export async function generateMetadata(
	props: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const productData = await getPageData(props);

	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images ?? [];

	return {
		title: `${productData.title} | ${defaultSiteName3}`,
		description: productData.originalDescription,
		openGraph: {
			images: [
				...productData.images.map((image) => image.url),
				...previousImages,
			],
		},
	};
}
export async function getStaticPaths() {
	const paths = await getAllProducts().then((products) =>
		products
			.filter(
				(item) =>
					!pages_redirects_map[item.handle] ||
					item.handle.search('boutique') === -1,
			)
			.map((product) => ({
				params: { productHandle: product.handle },
			})),
	);

	return {
		paths,
		fallback: 'blocking',
	};
}

export default async function ProductByHandlePage(props: Props) {
	const product = await getPageData(props);

	return <ProductByHandleScreen product={product} />;
}
