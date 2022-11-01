import type { IProductByIdPageProps } from '@pages/products/[productId]'

import {
  DescriptionSection,
  FeaturesAndFilesIncludedSection,
  HeroSection,
} from './sections'

const ProductByIdScreen = ({ product }: IProductByIdPageProps) => (
  <>
    <HeroSection product={product} />
    <DescriptionSection description={product.description} />
    <FeaturesAndFilesIncludedSection
      features={product.features}
      filesIncluded={product.filesIncluded}
    />
  </>
)

export default ProductByIdScreen
