import type { GetStaticProps, NextPage } from 'next';

import DrumsThatKnock from '@components/screens/DrumsThatKnock';
import { IProduct } from 'types';
import { getAllProducts } from '@utils/core/API';

interface IDrumsThatKnockPageProps {
	products: IProduct[];
}

const DrumsThatKnockPage: NextPage<IDrumsThatKnockPageProps> = ({
	products
}) => {
	return <DrumsThatKnock products={products} />;
};

export default DrumsThatKnockPage;

export const getStaticProps: GetStaticProps = async () => {
	const products = await getAllProducts();

	return {
		props: {
			products,
			revalidate: 5 * 60
		}
	};
};
