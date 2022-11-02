import { IProductByIdPageProps } from '@pages/products/[productId]'
import Image from 'next/image'

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
        className="relative
				flex gap-4 flex-wrap px-8 py-20
				md:flex-nowrap lg:px-0 md:justify-center md:gap-8"
      >
        <Image
          src="/images/Rectangle 48.png"
          alt=""
          width={200}
          height={200}
          className="pointer-events-none aspect-square absolute w-1/2 top-0 left-0 scale-150 -translate-y-1/3 -translate-x-1/4"
        />
        <div className="relative max-w-[550px] bg-primary-4 px-12 py-8 rounded-3xl w-full lg:w-1/2">
          <ul
            className="flex flex-col flex-wrap gap-y-4"
            style={{
              listStyle: "url('/svgs/purple-circle.svg')",
              listStylePosition: 'inside',
            }}
          >
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="relative max-w-[550px] flex flex-col gap-4 bg-primary-4 px-12 py-8 rounded-3xl w-full lg:w-1/2">
          <header>
            <h3 className="text-h3 font-bold capitalize">
              files included {filesIncluded.count}:
            </h3>
          </header>
          <ul
            className="flex flex-col flex-wrap gap-4 text-[90%]"
            // style={{ listStyle: "url('/svgs/purple-circle.svg')" }}
            style={{
              listStyle: "url('/svgs/purple-circle.svg')",
              display: 'grid',
              // gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              whiteSpace: 'break-spaces',
              listStylePosition: 'inside',
            }}
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
