import type { IProductByIdPageProps } from '@pages/products/[productId]'

import Button from '@components/shared/core/Button'
import Image from 'next/image'

const HeroSection = ({ product }: IProductByIdPageProps) => {
  return (
    <section className="bg-primary-1">
      <div
        className="container-restrictions-1
			p-20"
      >
        <div
          className="container-restrictions-2
			 flex rounded-3xl overflow-hidden"
        >
          <Image
            src={product.image.src}
            alt=""
            width={200}
            height={200}
            className="aspect-square w-[20rem]"
          />
          <div className="px-16 py-8 flex flex-col gap-4 bg-primary-4">
            <h1 className="text-h2 capitalize font-bold">{product.title}</h1>
            <p>${product.price}</p>
            <p>
              <span className="text-bg-secondary-1">Shipping</span>
              &nbsp;calculated at checkout.
            </p>
            <p>Pay in 4 interest-free installments of $12.50 with</p>
            <Button className="capitalize mt-2">add to cart</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
