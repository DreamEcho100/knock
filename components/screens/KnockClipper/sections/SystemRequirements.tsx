import { IProductByIdPageProps } from '@pages/products/[productId]'
import TwoCardContainer from '@components/shared/core/TwoCardContainer'

const SystemRequirementsSection = () => {
  return (
    <section
      className="bg-primary-1 p-8 
				sm:py-20"
    >
      <TwoCardContainer
        items1={[
          '9 OSX 10.12+ - AU, VST3, AAX (KNOCK Clipper is fully compatible with both Mac OS Monterey and Apple M1 & M2.)',
          'Intel Core i5, i7, i9, Xeon, Apple M1',
          '8GB RAM required, 16GB recommended',
          'HDD Space requirements: Minimum of 500MB',
        ]}
        items1HeaderText="Mac"
        items2={[
          'Intel Core i5, i7, i9, Xeon (all Gen 5 and above), AMD Quad Core',
          'Windows 8.1, 10 - 64 bit  VST3, AAX',
          '8GB RAM required, 16GB recommended',
          'HDD Space requirements: Minimum of 500MB',
        ]}
        items2HeaderText="PC"
        backgroundImg={false}
      />
    </section>
  )
}

export default SystemRequirementsSection
