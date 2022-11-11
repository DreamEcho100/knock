import type { NextPage, GetServerSideProps } from 'next';

import HomeScreen from 'components/screens/Home';
import { getAllProducts } from 'server/controllers/products';
import type { IProduct } from 'types';

export interface IHomePageProps {
	products: IProduct[]; // ShopifyBuy.Product[];
}

const HomePage: NextPage<IHomePageProps> = (props) => {
	return <HomeScreen {...props} />;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
	const products = JSON.parse(
		JSON.stringify(
			await getAllProducts({
				typesToExclude: ['Sound Editing Software', 'Tutorial']
			})
		)
	);

	return {
		props: {
			products,
			revalidate: 5 * 60
		}
	};
};
