import { Navigation, Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { artists } from 'data/fakeData'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import CustomNextImage from '@components/shared/common/CustomNextImage'

const ReviewsSection = () => {
  return (
    <section className="bg-primary-1">
      <div className="container-restrictions-1">
        <div className="px-8 pb-12 container-restrictions-2">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
            navigation
            spaceBetween={8}
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            autoplay
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {artists
              .map((item) => ({
                ...item,
                review:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
              }))
              .map((item, index) => (
                <SwiperSlide key={index} className="px-8 pt-24 pb-12">
                  <div className="flex relative">
                    <div
                      className="rounded-2xl px-8 py-16 bg-primary-3 flex flex-col
												sm:pr-[6rem] sm:mr-[6rem]"
                      // style={{ width: 'calc(100% - 5rem)' }}
                    >
                      <q>{item.review}</q>
                      <span className="border-b-[0.0125rem] border-text-primary-3 w-8 my-2"></span>
                      <div className="flex items-end gap-4">
                        <cite className="flex items-end">{item.name}</cite>
                        <CustomNextImage
                          src={item.image.src}
                          alt={item.image.alt}
                          width={250}
                          height={250}
                          className="block sm:hidden rounded-full aspect-square w-10 h-10"
                        />
                      </div>
                    </div>
                    <div className="hidden sm:block w-[10rem] h-[10rem] absolute top-1/2 -translate-y-1/2 right-0">
                      <CustomNextImage
                        src={item.image.src}
                        alt={item.image.alt}
                        width={250}
                        height={250}
                        className="rounded-full aspect-square w-full h-full"
                      />
                    </div>
                    <div className="w-[5rem] h-[5rem] absolute top-[2rem] -translate-y-full left-[2rem]">
                      <CustomNextImage
                        src="/svgs/double-quates.svg"
                        alt={item.image.alt}
                        width={250}
                        height={250}
                        className="aspect-square w-full h-full"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
