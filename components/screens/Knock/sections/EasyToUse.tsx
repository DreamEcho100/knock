import ProductShowcase from '@components/shared/core/ProductShowcase'

const EasyToUseSection = () => {
  return (
    <section className="bg-primary-1 text-primary-2 px-4 py-20">
      <ProductShowcase
        textContainer={{
          h2: {
            children: 'EASY TO USE',
          },
          p: {
            children:
              "KNOCK is optimized for extreme ease of use for beginners and professionals alike. Use KNOCK to make your drums slap, and take you to the next level. Whether you are new to producing, or a seasoned pro, KNOCK will seamlessly fit into your workflow. It's lightweight on your CPU too - use it on a bunch of tracks!",
          },
          button: { children: 'Buy it now' },
        }}
        imageContainer={{
          mainImg: {
            src: '/images/laptop final 1.png',
            alt: '',
          },
        }}
      />
    </section>
  )
}

export default EasyToUseSection
