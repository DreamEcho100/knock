import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';

import DrumsThatKnock from '@components/screens/DrumsThatKnock';
import { IProduct } from 'types';
import { getAllProducts } from 'server/controllers/products';

interface IDrumsThatKnockPageProps {
	products: IProduct[];
}

const DrumsThatKnockPage: NextPage<IDrumsThatKnockPageProps> = ({
	products
}) => {
	return <DrumsThatKnock products={products} />;
};

export default DrumsThatKnockPage;



export const getServerSideProps: GetServerSideProps = async (context) => {
	const category:string = context.query["category"] as string ;
		
	const products = JSON.parse(JSON.stringify(await getAllProducts(category)));
  
	return {
	  props: {
		products,
		revalidate: 5 * 60,
	  },
	};
  };