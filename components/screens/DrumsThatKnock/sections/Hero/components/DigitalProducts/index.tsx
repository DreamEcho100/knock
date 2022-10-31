// interface Props {}

import { ProductCardWithDetails } from '@components/shared/core/Card/product/default'

const imgBasePath = '/images'

const productsData = [
  {
    title: 'Complete Knock Bundle v2 (All Digital Products)',
    image: {
      src: '/images/b950da41a211bb9edbff5ef4b34e8aac.png',
    },
    price: 649,
    discountPrice: 349,
    id: 'complete-knock-bundle-v2-all-digital-products',
  },
  {
    title: 'Drums That Knock X',
    image: {
      src: '/images/5e56d0c1a9de63c6d45b0b33ab7fa460.png',
    },
    price: 60,
    id: 'drums-that-knock-x',
  },
  {
    title: 'Drums That Knock Free Vol. 1',
    image: {
      src: '/images/222b967772e622d9c0b15b193d0a0d2f.png',
    },
    price: 0,
    id: 'drums-that-knock-free-vol-1',
  },
  {
    title: 'Drums That Knock Vol. 9',
    image: {
      src: '/images/d8052bdee8691b19d9186254f48089a8.png',
    },
    price: 50,
    id: 'drums-that-knock-vol-9',
  },
  {
    title: 'Drums That Knock Vol. 8',
    image: {
      src: '/images/2bb45e831d618a9f677bddb3f0893dc3.png',
    },
    price: 50,
    id: 'drums-that-knock-vol-8',
  },
  {
    title: 'Drums That Knock Vol. 7',
    image: {
      src: '/images/e0f7a127c4e107611754a50a9d47de05.png',
    },
    price: 50,
    id: 'drums-that-knock-vol-7',
  },
  {
    title: 'Drums That Knock Vol. 6',
    image: {
      src: '/images/909397a749632dfcbfd55ad0fc995adc.png',
    },
    price: 45,
    id: 'drums-that-knock-vol-6',
  },
  {
    title: 'Drums That Knock Vol. 5',
    image: {
      src: '/images/13416298d22e6cc6691a4f250ae542c1.png',
    },
    price: 45,
    id: 'drums-that-knock-vol-5',
  },
  {
    title: 'Drums That Knock Vol. 4',
    image: {
      src: '/images/cc1f0742b4f2db09bfa1a4cb5846105b.png',
    },
    price: 45,
    id: 'drums-that-knock-vol-4',
  },
  {
    title: 'Drums That Knock Vol. 2',
    image: {
      src: '/images/304a832fe6aa45c352cce67b8a86936c.png',
    },
    price: 40,
    id: 'drums-that-knock-vol-2',
  },
  {
    title: 'Drums That Knock Vol. 1',
    image: {
      src: '/images/e7e615077ea5957213cc360d8203569e.png',
    },
    price: 40,
    id: 'drums-that-knock-vol-1',
  },
  {
    title: 'Melodies That Knock Vol. 1',
    image: {
      src: '/images/a9cb7e3899a1dd711e6203b675e47ed8.png',
    },
    price: 40,
    id: 'melodies-that-knock-vol-1',
  },
  {
    title: 'Melodies That Knock Vol. 2',
    image: {
      src: '/images/8c101716d61752d123f9e8ca72e5fd06.png',
    },
    price: 40,
    id: 'melodies-that-knock-vol-2',
  },
  {
    title: 'DECAP Ableton Live Masterclass',
    image: {
      src: '/images/9596fac50fb2e22ca27bfe4e5feb63d8.png',
    },
    price: 99,
    id: 'decap-ableton-live-masterclass',
  },
]

const DigitalProductsSection = () => {
  return (
    <div
      className="relative p-8 sm:p-16 justify-items-center md:justify-items-start"
      style={{
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(15.625rem, 1fr))',
        gap: '2rem',
      }}
    >
      {productsData.map((item) => (
        <ProductCardWithDetails
          key={item.id}
          link={{ children: item.title, href: `/products/${item.id}` }}
          {...item}
          toAddToCart
          productData={item}
        />
      ))}
    </div>
  )
}

export default DigitalProductsSection
