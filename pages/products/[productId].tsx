import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import fakeProductsData from 'data/fakeProducts';
import ProductByIdScreen from '@components/screens/ProductById';
import { getAllProducts, getProductById } from '@utils/core/API';
import { grtIdFromGid } from '@utils/core/shopify';
import { IProduct } from 'types';

export interface IProductByIdPageProps {
	product: IProduct;
}

const ProductByIdPage: NextPage<IProductByIdPageProps> = ({ product }) => {
	return <ProductByIdScreen product={product} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const productId = params?.productId;
	if (typeof productId !== 'string')
		throw new Error('productId must be a string');

	// !!!
	// Handle errors
	const product = await getProductById(productId);

	if (!product)
		return {
			notFound: true
		};

	return {
		props: {
			product
		}
	};
};

export const getStaticPaths: GetStaticPaths<{ productId: string }> = async (
	context
) => {
	const paths = await getAllProducts().then((products) =>
		products.map((product) => ({
			params: { productId: grtIdFromGid(product.id) }
		}))
	);

	return {
		paths,
		fallback: 'blocking'
	};
};

export default ProductByIdPage;
