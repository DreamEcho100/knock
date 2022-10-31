// import Swiper core and required modules
import { Navigation, A11y } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles

import 'swiper/css'
import 'swiper/css/navigation'
// import 'swiper/css/pagination'
// import 'swiper/css/scrollbar'
import Image from 'next/image'

const artists = [
  {
    image: {
      src: '/images/people/attachment-eminem-header 1.png',
      alt: '',
    },
    name: 'Artist Name',
  },
  {
    image: {
      src: '/images/people/beyonce-2000x1270-1-696x442 1.png',
      alt: '',
    },
    name: 'Artist ',
  },
  {
    image: {
      src: '/images/people/Dua+Lipa 1.png',
      alt: '',
    },
    name: 'Artist ',
  },
  {
    image: {
      src: '/images/people/G-Eazy 1.png',
      alt: '',
    },
    name: 'Artist ',
  },
  {
    image: {
      src: '/images/people/kapak-132718-745x465-1652258213 1.png',
      alt: '',
    },
    name: 'Artist ',
  },
]

const ArtistSection = () => {
  return (
    <section className="bg-primary-2">
      <div className="section-content px-8 py-16 flex flex-col gap-12">
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
              .map((item) => artists)
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
