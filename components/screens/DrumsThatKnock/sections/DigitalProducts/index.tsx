// interface Props {}

import { ProductCardWithDetails } from '@components/shared/core/Card/product/default'
import fakeProductsData from 'data/fakeProducts'

const DigitalProductsSection = () => {
  return (
    <section className="bg-primary-1">
      <div
        className="relative sm:p-8 md:p-16 justify-items-center"
        style={{
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
          gap: '1rem',
        }}
      >
        {fakeProductsData.map((item) => (
          <ProductCardWithDetails
            key={item.id}
            link={{ children: item.title, href: `/products/${item.id}` }}
            {...item}
            toAddToCart
            productData={item}
            intent="bottomCorners"
          />
        ))}
      </div>
    </section>
  )
}

export default DigitalProductsSection
