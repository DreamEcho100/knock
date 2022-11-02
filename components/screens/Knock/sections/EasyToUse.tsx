import CustomNextImage from '@components/shared/common/CustomNextImage'
import Button from '@components/shared/core/Button'

const EasyToUseSection = () => {
  return (
    <section className="bg-primary-1 text-primary-2">
      <div
        className="container-restrictions-2
					px-4 py-20 flex flex-col
					lg:flex-row"
      >
        <div
          className="w-full flex flex-col items-center p-4 text-center gap-8
							sm:px-8
							lg:w-1/2 lg:text-align-initial lg:items-start"
        >
          <h2 className="text-h2 font-bold uppercase">EASY TO USE</h2>
          <p>
            KNOCK is optimized for extreme ease of use for beginners and
            professionals alike. Use KNOCK to make your drums slap, and take you
            to the next level. Whether you are new to producing, or a seasoned
            pro, KNOCK will seamlessly fit into your workflow. It&apos;s
            lightweight on your CPU too - use it on a bunch of tracks!
          </p>

          <Button className="capitalize">Buy it now</Button>
        </div>
        <div
          className="w-full
							 lg:w-1/2"
        >
          <CustomNextImage
            src="/images/laptop final 1.png"
            alt=""
            width={800}
            height={500}
            className="mx-auto w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default EasyToUseSection
