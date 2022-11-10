import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import ProductByIdScreen from '@components/screens/ProductById';
import { getIdFromGid } from '@utils/core/shopify';
import { IProduct } from 'types';
import { getAllProducts, getOneProductById } from 'server/controllers/products';

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
	const product = JSON.parse(
		JSON.stringify(await getOneProductById(productId))
	);

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
	const paths = await getAllProducts('').then((products:any) =>
		products.map((product:any) => ({
			params: { productId: getIdFromGid(product.id) }
		}))
	);

	return {
		paths,
		fallback: 'blocking'
	};
};

export default ProductByIdPage;
