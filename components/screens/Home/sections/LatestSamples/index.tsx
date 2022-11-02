import Button from '@components/shared/core/Button'
import ProductBasicCard from '@components/shared/core/Card/product/default'
import KnockTrademark from '@components/shared/core/KnockTrademark'
import Image from 'next/image'
import ProductCardSlider from './components/ProductCardSlider'

const LatestSamplesSection = () => {
  return (
    <section className="bg-primary-2">
      <div
        className="container-restrictions-1
				flex p-4 flex-col px-8 py-12
				md:px-8 md:py-20 md:flex-row"
      >
        <div
          className="flex gap-4 flex-col items-center text-center mb-12 p-4
						md:p-8 md:items-start md:text-align-initial md:flex-grow md:w-1/2 md:justify-center"
        >
          <h2
            className="text-h2 font-bold text-primary-1 text-center flex flex-wrap
								md:text-align-initial"
          >
            DRUMS THAT&nbsp;
            <KnockTrademark />
            &nbsp;SAMPLE PACKS
          </h2>
          <p className="text-primary-2">
            Designed from scratch by DECAP. <br /> Premium quality,
            groundbreaking as always.
          </p>
          <Button>Explore it now</Button>
        </div>
        <div className="md:flex-grow md:w-1/2 flex justify-center items-center">
          <ProductCardSlider />
        </div>
      </div>
    </section>
  )
}

export default LatestSamplesSection
