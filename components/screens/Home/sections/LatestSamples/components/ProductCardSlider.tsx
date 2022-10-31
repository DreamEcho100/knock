import ProductBasicCard from '@components/shared/core/Card/product/default'
import { Navigation, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

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