// import Swiper core and required modules
import { Navigation, A11y } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles

import 'swiper/css'
import 'swiper/css/navigation'
// import 'swiper/css/pagination'
// import 'swiper/css/scrollbar'
import Image from 'next/image'
import { artists } from 'data/fakeData'

const ArtistSection = () => {
  return (
    <section className="bg-primary-2">
      <div className="container-restrictions-1 px-8 py-16 flex flex-col gap-12">
        <header className="text-center">
          <h2 className="text-h2 font-bold capitalize">
            SOME ARTISTS WHO HAVE USED DRUMS THAT KNOCK
          </h2>
        </header>
        <div className="px-8">
          <Swiper
            modules={[Navigation, A11y]}
            slidesPerView={6}
            navigation
            spaceBetween={8}
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            autoplay
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {'br'
              .repeat(2)
              .split('br')
              .map(() => artists)
              .flat(1)
              .map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="p-2 flex flex-col items-center justify-center text-center"
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <p>{item.name}</p>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default ArtistSection
