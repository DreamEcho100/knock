import { IProductByIdPageProps } from '@pages/products/[productId]'

const DescriptionSection = ({
  description,
}: {
  description: IProductByIdPageProps['product']['description']
}) => {
  return (
    <section className="bg-primary-1">
      <div
        className="container-restrictions-2
				p-20"
      >
        {description}
      </div>
    </section>
  )
}

export default DescriptionSection
