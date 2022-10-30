import Button from '@components/shared/core/Button'
import Image from 'next/image'

const OneProductShowCaseSection = () => {
  return (
    <section className="bg-primary-2">
      <div
        className="section-content
				flex p-4 flex-col
				sm:px-8 sm:py-py-20 sm:flex-row
			"
      >
        <div
          className="flex gap-4 flex-col items-center text-center mb-12 
				  	sm:p-8 sm:items-start sm:text-align-initial sm:flex-grow sm:w-1/2 sm:justify-center"
        >
          <h2 className="text-h2 font-bold text-primary-1 flex">
            <span className="flex">
              KNOCK
              <sup className="mt-[1rem]">
                <Image
                  src="/images/Trademark Artboard 1 copy 3.png"
                  width={10}
                  height={10}
                  priority
                  alt="KNOCK logo"
                  className="aspect-square w-2 h-2"
                />
              </sup>
            </span>
            Clipper
          </h2>
          <p className="text-primary-2">
            Adjustable hard + soft clipper module from KNOCK.
          </p>
          <Button>Explore it now</Button>
        </div>
        <div
          className="flex items-center
					sm:flex-grow sm:w-1/2"
        >
          <Image
            src="/images/knock-clipper.png"
            alt="knock clipper"
            width={800}
            height={800}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default OneProductShowCaseSection
