import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import DefaultLayout from '@components/layouts/Default'
import fakeProductsData from 'data/fakeProducts'
import ProductByIdScreen from '@components/screens/ProductById'

export interface IProductByIdPageProps {
  product: typeof fakeProductsData[0]
}

const ProductByIdPage: NextPage<IProductByIdPageProps> = ({ product }) => {
  return (
    <DefaultLayout>
      <ProductByIdScreen product={product} />
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = fakeProductsData.find(
    (product) => product.id === params?.productId,
  )

  if (!product)
    return {
      notFound: true,
    }

  return {
    props: {
      product,
    },
  }
}

export const getStaticPaths: GetStaticPaths<{ productId: string }> = async (
  context,
) => {
  return {
    paths: fakeProductsData.map((product) => ({
      params: { productId: product.id },
    })),
    fallback: 'blocking',
  }
}

export default ProductByIdPage
