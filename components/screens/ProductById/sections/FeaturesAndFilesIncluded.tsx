import { IProductByIdPageProps } from '@pages/products/[productId]'

const FeaturesAndFilesIncludedSection = ({
  features,
  filesIncluded,
}: {
  features: IProductByIdPageProps['product']['features']
  filesIncluded: IProductByIdPageProps['product']['filesIncluded']
}) => {
  return (
    <section className="bg-primary-1">
      <div
        className="container-restrictions-2
				flex gap-4 flex-wrap p-8
				lg:flex-nowrap lg:p-0"
      >
        <div className="bg-primary-4 px-12 py-8 rounded-3xl mx-auto w-full lg:w-1/2">
          <ul
            className="flex flex-col flex-wrap gap-y-4"
            style={{ listStyle: "url('/svgs/purple-circle.svg')" }}
          >
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="bg-primary-4 px-16 py-8 rounded-3xl w-full lg:w-1/2">
          <ul
            className="flex flex-col flex-wrap gap-y-4"
            style={{ listStyle: "url('/svgs/purple-circle.svg')" }}
          >
            {filesIncluded.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default FeaturesAndFilesIncludedSection
