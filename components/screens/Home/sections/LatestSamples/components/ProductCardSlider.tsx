import ProductBasicCard from '@components/shared/core/Card/product/default'
import { Navigation, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import fakeProductsData from 'data/fakeProducts'

const ProductCardSlider = () => {
  return (
    <Swiper
      modules={[Navigation, A11y]}
      slidesPerView={2}
      navigation
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      autoplay
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className="p-4"
    >
      {fakeProductsData
        .filter((product) => product.title.startsWith('Drums That Knock Vol.'))
        .map((item, index) => (
          <SwiperSlide
            key={index}
            className="px-4 flex flex-col items-center justify-center text-center"
          >
            <ProductBasicCard
              key={index}
              link={{
                children: item.title,
                href: `/products/${item.id}`,
              }}
              {...item}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default ProductCardSlider
