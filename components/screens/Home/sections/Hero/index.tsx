import Button from '@components/shared/common/Button'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="relative px-8 py-12">
      <Image
        src="/images/lksdArtboard 1.png"
        alt=""
        width={800}
        height={800}
        priority
        className="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover"
      />

      <div className="relative flex items-center justify-center flex-col text-center">
        <Image
          src="/images/Knock-Plugin-Animation-opt_1080x 1.png"
          alt="knock plugin animation"
          width={800}
          height={800}
          priority
          className="object-cover"
        />
        <h1 className="text-h1 font-bold text-primary-1">THE KNOCK PLUGIN</h1>
        <p className="my-4 mb-6">
          Make your drums KNOCK and punch through the mix.
        </p>
        <Button className="capitalize">Explore it now</Button>
      </div>
    </section>
  )
}

export default HeroSection
