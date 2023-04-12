import type { GetServerSideProps, NextPage } from 'next';

import KnockScreen from '@components/screens/Knock';
import type { IProduct } from 'types';
import { getOneProductByHandle } from 'server/controllers/products';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getKnockMainSection, getKnockPageData } from '@utils/core/API';

export interface IKnockPluginPageProps {
	knockPlugin: IProduct; // ShopifyBuy.Product;
}

const KnockPluginPage: NextPage<IKnockPluginPageProps> = (props) => {
	return <KnockScreen {...props} />;
};

export default KnockPluginPage;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const knockPlugin = JSON.parse(
		JSON.stringify(await getOneProductByHandle('knock-plugin'))
	);

	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59'
	);

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['knock-page-data'], getKnockPageData);
	await queryClient.prefetchQuery(['knock-main-section'], getKnockMainSection);

	return {
		props: {
			knockPlugin,
			dehydratedState: dehydrate(queryClient)
		}
	};
};
