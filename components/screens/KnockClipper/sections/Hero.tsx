import Button from '@components/shared/core/Button'
import KnockTrademark from '@components/shared/core/KnockTrademark'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="bg-primary-1">
      <div
        className=" overflow-hidden
				px-8 pt-24 pb-24 flex items-center justify-center flex-col text-center"
      >
        <div className="relative flex items-center justify-center max-w-[900px]">
          <Image
            src="/images/Rectangle 48.png"
            alt=""
            width={800}
            height={800}
            priority
            className="pointer-events-none absolute top-0 right-0 left-0 bottom-0 w-full h-full object-contain scale-75"
            style={{ transform: 'translate(8%, -2%) scale(1.5)' }}
          />

          <Image
            src="/images/abc59a63fe5ed68da58bff746fd14cce.png"
            alt=""
            width={600}
            height={600}
            priority
            unoptimized
            className="object-cover mb-6 relative"
            style={{ aspectRatio: '16 / 14' }}
          />
        </div>
        <h2 className="text-h2 font-bold text-primary-1 mt-4 mb-4 flex flex-wrap">
          <KnockTrademark />
          Clipper
        </h2>
        <p className="mb-6 text-[1.75rem] leading-10">
          Adjustable hard & soft clipper module from KNOCK.
        </p>
        <div className="flex items-center justify-center">
          <Button className="capitalize  text-[1.375rem]">
            Buy it now
            <del className="mx-2">$29</del>
          </Button>
          <span className="p-2" />{' '}
          <span className="text-primary-1 font-bold">$15</span>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
