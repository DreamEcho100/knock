import type { Settings } from 'react-slick'

import SliderSection from './components/SliderSection'
// https://react-slick.neostack.com/

// Slider
export default function Page() {
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
    <main className="text-white bg-purple-800">
      <h2> Single Item</h2>
      <SliderSection />
    </main>
  )
}
