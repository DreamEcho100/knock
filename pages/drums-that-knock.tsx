import type { GetServerSideProps, NextPage } from 'next';

import DrumsThatKnock from '@components/screens/DrumsThatKnock';
import { IProduct } from 'types';
import {
	getAllProducts,
	getOneProductByHandle
} from 'server/controllers/products';

export interface IDrumsThatKnockPageProps {
	products: IProduct[]; // ShopifyBuy.Product[];
	knockPlugin: IProduct; // ShopifyBuy.Product;
}

const DrumsThatKnockPage: NextPage<IDrumsThatKnockPageProps> = ({
	products,
	knockPlugin
}) => {
	return <DrumsThatKnock products={products} knockPlugin={knockPlugin} />;
};

export default DrumsThatKnockPage;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const products = JSON.parse(
		JSON.stringify(
			await getAllProducts({ typesToExclude: ['Sound Editing Software'] })
		)
	);

	const knockPlugin = JSON.parse(
		JSON.stringify(await getOneProductByHandle('knock-plugin'))
	);

	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59'
	);

	return {
		props: {
			products,
			knockPlugin,
			revalidate: 5 * 60
		}
	};
};
