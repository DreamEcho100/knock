import type { GetServerSideProps, NextPage } from 'next';

import KnockPluginScreen from 'components/screens/KnockPlugin';
import type { IProduct } from 'types';
import { getOneProductByHandle } from 'server/controllers/products';

export interface IKnockPluginPageProps {
	knockPlugin: IProduct; // ShopifyBuy.Product;
}

const KnockPluginPage: NextPage<IKnockPluginPageProps> = (props) => {
	return <KnockPluginScreen {...props} />;
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
