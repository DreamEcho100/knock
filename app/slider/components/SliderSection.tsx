'use client'

import type { Settings } from 'react-slick'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SliderSection = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    className: 'w-full overflow-hidden',
    dotsClass: 'bg-white text-black flex',
  }
  return (
    <Slider {...settings}>
      {'break'
        .repeat(9)
        .split('break')
        .map((_, index) => (
          <div
            key={index}
            className={`w-1/2 h-10 flex items-center justify-center text-center bg-green-900 px-8`}
          >
            <h3>{index + 1}</h3>
          </div>
        ))}
    </Slider>
  )
}

export default SliderSection
