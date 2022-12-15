import type { GetServerSideProps, NextPage } from 'next';

import ProductByIdScreen from '@components/screens/ProductById';
import { IProduct } from 'types';
import { getOneProductById } from 'server/controllers/products';

export interface IProductByIdPageProps {
	product: IProduct;
}

const ProductByIdPage: NextPage<IProductByIdPageProps> = ({ product }) => {
	return <ProductByIdScreen product={product} />;
};

const pages_redirects_map: Record<string, any> = {
	'knock-plugin': '/knock',
	'knock-clipper': '/knock-clipper'
};

export const getServerSideProps: GetServerSideProps = async ({
	params,
	res
}) => {
	const productId = params?.productId;
	if (typeof productId !== 'string')
		throw new Error('productId must be a string');

	if (typeof pages_redirects_map[productId] === 'string')
		return {
			redirect: {
				destination: pages_redirects_map[productId],
				permanent: true
			}
		};

	// !!!
	// Handle errors
	const product = JSON.parse(
		JSON.stringify(await getOneProductById(productId))
	);

	if (!product)
		return {
			notFound: true
		};

	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59'
	);

	return {
		props: {
			product
		}
	};
};
export default ProductByIdPage;
