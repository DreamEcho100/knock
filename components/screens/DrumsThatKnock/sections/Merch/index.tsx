// interface IProps {}

import { ProductCardWithDetails } from '@components/shared/core/Card/product/default'

const productsData = [
  {
    title: 'KNOCK Cat (Beanie Hat)',
    image: {
      src: '/images/052e2ff690dcdf0cddf66aa04bc77eab.png',
    },
    price: 35,
    id: 'knock-cat-beanie-hat',
  },
  {
    title: 'KNOCK Cat (Dad Hat)',
    image: {
      src: '/images/38ae2c9f0e2fc92cfc5ce4be694126ba.png',
    },
    price: 35,
    id: 'knock-cat-dad-hat',
  },
]
const MerchSection = () => {
  return (
    <section
      className="relative p-8 sm:p-16 flex flex-col gap-8 bg-primary-1"
      // style={{
      //   zIndex: 2,
      //   display: 'grid',
      //   gridTemplateColumns: 'repeat(auto-fit, minmax(15.625rem, 1fr))',
      // 	justifyItems: 'center',
      // }}
    >
      <header className="text-center flex items-center justify-center">
        <h2 className="text-h2 font-bold capitalize flex flex-wrap">Merch</h2>
      </header>
      <div className="flex flex-wrap items-center justify-center gap-8">
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
    </section>
  )
}

export default MerchSection
