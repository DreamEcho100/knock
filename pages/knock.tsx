import type { GetServerSideProps, NextPage } from 'next';

import KnockScreen from '@components/screens/Knock';
import type { IProduct } from 'types';
import { getOneProductByHandle } from 'server/controllers/products';

export interface IKnockPluginPageProps {
	knockPlugin: IProduct; // ShopifyBuy.Product;
}

const KnockPluginPage: NextPage<IKnockPluginPageProps> = (props) => {
	return <KnockScreen {...props} />;
};

export default KnockPluginPage;

export const getServerSideProps: GetServerSideProps = async () => {
	const knockPlugin = JSON.parse(
		JSON.stringify(await getOneProductByHandle('knock-plugin'))
	);

	return {
		props: {
			knockPlugin,
			revalidate: 5 * 60
		}
	};
};
