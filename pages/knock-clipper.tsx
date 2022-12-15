import KnockClipperScreen from '@components/screens/KnockClipper';
import { IProduct } from 'types';
import type { GetServerSideProps, NextPage } from 'next';
import { getOneProductByHandle } from 'server/controllers/products';

export interface IKnockClipperPageProps {
	knockClipperPlugin: IProduct;
}

const KnockClipperPage: NextPage<IKnockClipperPageProps> = (props) => {
	return <KnockClipperScreen {...props} />;
};

export default KnockClipperPage;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const knockClipperPlugin = JSON.parse(
		JSON.stringify(await getOneProductByHandle('knock-clipper')) // knockclipper-pluginboutique
	);

	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59'
	);

	return {
		props: {
			knockClipperPlugin
		}
	};
};
