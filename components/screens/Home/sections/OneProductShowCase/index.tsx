import Button from '@components/shared/common/Button'
import Image from 'next/image'

const OneProductShowCaseSection = () => {
  return (
    <section
      className="flex p-4 flex-col
			sm:px-8 sm:py-12 sm:flex-row"
    >
      <div
        className="flex gap-4 flex-col items-center text-center mb-12 
				sm:p-4 sm:items-start sm:text-align-initial sm:flex-grow sm:w-1/2 sm:justify-center"
      >
        <h2 className="text-h2 font-bold text-primary-1">KNOCK Clipper</h2>
        <p className="text-primary-2">
          Make your drums KNOCK and punch through the mix.
        </p>
        <Button>Explore it now</Button>
      </div>
      <div className="sm:flex-grow sm:w-1/2">
        <Image
          src="/images/knock-clipper.png"
          alt="knock clipper"
          width={800}
          height={800}
          className="object-cover"
        />
      </div>
    </section>
  )
}

export default OneProductShowCaseSection
