import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import KnockScreen from '@components/screens/knock-pluginboutique';
import type { IProduct } from 'types';
import {
	getAllProducts,
	getOneProductByHandle
} from 'server/controllers/products';

export interface IKnockPluginBoutiqueProps {
	knockPluginBoutique: IProduct; // ShopifyBuy.Product;
}

const KnockPluginBoutique: NextPage<IKnockPluginBoutiqueProps> = (props) => {
	return <KnockScreen {...props} />;
};

export default KnockPluginBoutique;

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const productId = params?.pluginsBoutique;
	if (typeof productId !== 'string')
		throw new Error('productId must be a string');

	// !!!
	// Handle errors
	const knockPluginBoutique = JSON.parse(
		JSON.stringify(await getOneProductByHandle(productId))
	);

	if (!knockPluginBoutique)
		return {
			notFound: true
		};

	return {
		props: {
			knockPluginBoutique
		}
	};
};

export const getStaticPaths: GetStaticPaths<{
	pluginsBoutique: string;
}> = async (context) => {
	const paths = await getAllProducts({
		typesToExclude: ['Sound Editing Software']
	}).then((products: any) =>
		products.map((product: any) => ({
			params: { pluginsBoutique: product.handle }
		}))
	);

	return {
		paths,
		fallback: 'blocking'
	};
};
