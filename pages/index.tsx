import type { NextPage, GetServerSideProps } from 'next';

import HomeScreen from 'components/screens/Home';
import { getAllProducts } from 'server/controllers/products';
import type { IProduct } from 'types';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getHomePageData, getMainSection } from '@utils/core/API';

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

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['home-page-data'], getHomePageData );
	await queryClient.prefetchQuery(['HeroSection'], getMainSection);

	return {
		props: {
			products,
			dehydratedState: dehydrate(queryClient),
			revalidate: 5 * 60
		}
	};
};
