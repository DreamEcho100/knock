import KnockTrademark from '@components/shared/core/KnockTrademark'
import ProductShowcase from '@components/shared/core/ProductShowcase'

const OneProductShowCaseSection = () => {
  return (
    <section
      className="bg-primary-2 text-primary-2 px-4 py-20
				sm:px-20
				md:px-32"
    >
      <ProductShowcase
        textContainer={{
          h2: {
            children: (
              <>
                <KnockTrademark />
                &nbsp;Clipper
              </>
            ),
          },
          p: {
            children: 'Adjustable hard + soft clipper module from KNOCK.',
          },
          button: { children: 'Explore it now' },
        }}
        imageContainer={{
          mainImg: {
            src: '/images/knock-clipper.png',
            alt: '',
          },
          backgroundImg: false,
        }}
      />
    </section>
  )
}

export default OneProductShowCaseSection
