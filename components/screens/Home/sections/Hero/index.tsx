import Button from '@components/shared/common/Button'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="bg-primary-1">
      <div
        className="section-content
				px-8 py-12 flex items-center justify-center flex-col text-center"
      >
        <div className="relative flex items-center justify-center">
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
            unoptimized
            width={800}
            height={800}
            priority
            className="object-cover mb-6 w-11/12 relative"
          />
        </div>
        <h1 className="text-h1 font-bold text-primary-1">KNOCK PLUGIN</h1>
        <p className="mb-6 max-w-[350px]">
          Make your drums KNOCK and punch through the mix.
        </p>
        <Button className="capitalize">Explore it now</Button>
      </div>
    </section>
  )
}

export default HeroSection
