import Button from '@components/shared/core/Button'
import ProductBasicCard from '@components/shared/core/Card/product/default'
import Image from 'next/image'

const Card = ({
  image,
  title,
}: {
  image: { src: string; alt?: string }
  title: string
}) => {
  return (
    <div className="bg-primary-2 max-w-[12rem] shadow-lg shadow-black rounded-xl overflow-hidden flex flex-col">
      <div
        // style={{ aspectRatio: 1, }}
        className="aspect-square"
      >
        <Image
          src={image.src}
          alt={image.alt || ''}
          width={800}
          height={800}
          className="w-full h-full"
        />
      </div>
      <div
        className="text-center px-2 py-4 text-primary-2 flex items-center justify-center"
        style={{ fontSize: 'small' }}
      >
        <p className="font-bold">{title}</p>
      </div>
    </div>
  )
}

const LatestSamplesSection = () => {
  return (
    <section className="bg-primary-2">
      <div
        className="section-content
				flex p-4 flex-col px-8 py-12
				md:px-8 md:py-20 md:flex-row"
      >
        <div
          className="flex gap-4 flex-col items-center text-center mb-12 p-4
						md:p-8 md:items-start md:text-align-initial md:flex-grow md:w-1/2 md:justify-center"
        >
          <h2 className="text-h2 font-bold text-primary-1">
            DRUMS THAT KNOCK SAMPLE PACKS
          </h2>
          <p className="text-primary-2">
            Designed from scratch by DECAP. Premium quality, groundbreaking as
            always.
          </p>
          <Button>Explore it now</Button>
        </div>
        <div className="md:flex-grow md:w-1/2 flex justify-center items-center">
          <div className="flex gap-6">
            {[
              {
                image: {
                  src: '/images/d8052bdee8691b19d9186254f48089a8.png',
                  alt: '',
                },
                title: 'Drums That Knock Vol. 9',
                id: 'drums-that-knock-vol-9',
              },
              {
                image: {
                  src: '/images/5e56d0c1a9de63c6d45b0b33ab7fa460.png',
                  alt: '',
                },
                title: 'Drums That Knock Vol. 9',
                id: 'drums-that-knock-vol-9',
              },
            ].map((item, index) => (
              <ProductBasicCard
                key={index}
                link={{ children: item.title, href: `/products/${item.id}` }}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LatestSamplesSection
