import Button from '@components/shared/core/Button'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="bg-primary-1">
      <div
        className="container-restrictions-1
				px-8 pt-24 pb-16 flex items-center justify-center flex-col text-center"
      >
        <div className="relative flex items-center justify-center max-w-[900px]">
          <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover scale-150">
            <div className="flex w-full h-1/2">
              <Image
                src="/images/Rectangle 45.png"
                alt=""
                width={800}
                height={800}
                priority
                className="w-1/2 translate-x-[15%] translate-y-[5%]"
              />
              <Image
                src="/images/Rectangle 48.png"
                alt=""
                width={800}
                height={800}
                priority
                className="w-1/2 -translate-x-[15%] translate-y-[5%]"
              />
            </div>
            <div className="flex w-full h-1/2">
              <Image
                src="/images/Rectangle 46.png"
                alt=""
                width={800}
                height={800}
                priority
                className="w-1/2 translate-x-[15%] -translate-y-[5%]"
              />
              <Image
                src="/images/Rectangle 47.png"
                alt=""
                width={800}
                height={800}
                priority
                className="w-1/2 -translate-x-[15%] -translate-y-[5%]"
              />
            </div>
          </div>

          <Image
            src="/images/534aaf62a986c03ee09ee62a138d3845.gif"
            alt="knock plugin animation"
            width={800}
            height={800}
            priority
            unoptimized
            className="object-cover mb-6 w-11/12 relative"
          />
        </div>
        <h2 className="text-h2 font-bold text-primary-1 mt-12">KNOCK PLUGIN</h2>
        <p className="mb-6 max-w-[350px]">
          Make your drums KNOCK and punch through the mix.
        </p>
        <Button className="capitalize">Explore it now</Button>
      </div>
    </section>
  )
}

export default HeroSection
