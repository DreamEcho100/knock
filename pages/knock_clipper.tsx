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

export const getServerSideProps: GetServerSideProps = async () => {
	const knockClipperPlugin = JSON.parse(
		JSON.stringify(await getOneProductByHandle('knockclipper-pluginboutique')) // knockclipper-pluginboutique
	);

	return {
		props: {
			knockClipperPlugin,
			revalidate: 5 * 60
		}
	};
};
