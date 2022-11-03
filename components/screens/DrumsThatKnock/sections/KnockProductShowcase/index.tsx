import KnockTrademark from '@components/shared/core/KnockTrademark'
import ProductShowcase from '@components/shared/core/ProductShowcase'
import Image from 'next/image'
import Link from 'next/link'
import twClasses from 'utils/core/tailwind'

const KnockProductShowcaseSection = () => {
  return (
    <section className="bg-primary-1 text-primary-2 px-4 py-20">
      <ProductShowcase
        textContainer={{
          h2: {
            children: (
              <>
                <KnockTrademark />
                Clipper
              </>
            ),
          },
          p: {
            children:
              'This is the last plugin you will ever need to make your drums knock and punch through your mix. This plugin was meticulously crafted by DECAP. It is inspired by the signature sound of Drums That Knock, which has helped shaped the sonics of modern music.',
          },
          button: { children: 'Buy it now' },
        }}
        imageContainer={{
          mainImg: {
            src: '/images/534aaf62a986c03ee09ee62a138d3845.gif',
            alt: '',
          },

          backgroundImg: false,
        }}
        wrapper={{ className: 'lg:flex-row-reverse' }}
      />
    </section>
  )
}

export default KnockProductShowcaseSection

// (<section className="bg-primary-1">
//   <div
//     className="container-restrictions-1
// 		flex p-4 flex-col items-center
// 		md:items-stretch md:flex-row
// 		md:px-8 md:py-20 md:gap-8
// 	"
//   >
//     <div
//       className="flex justify-center items-center
// 	md:flex-grow md:w-1/2"
//     >
//       <Image
//         src="/images/534aaf62a986c03ee09ee62a138d3845.gif"
//         alt=""
//         width={800}
//         height={800}
//         unoptimized
//         className="object-contain"
//       />
//     </div>
//     <div
//       className="flex flex-col gap-2items-center text-center mb-12 gap-4
// 		md:p-4 md:items-start md:text-align-initial md:flex-grow md:w-1/2 md:justify-center"
//     >
//       <h2 className="text-h2 text-primary-1 capitalize font-bold flex flex-wrap">
//         <KnockTrademark />
//       </h2>
//       <p className="flex">
//         This is the last plugin you will ever need to make your drums knock
//         &nbsp and punch through your mix. This plugin was meticulously
//         crafted by DECAP. It is inspired by the signature sound of Drums
//         That Knock, which has helped shaped the sonics of modern music.
//       </p>
//       <Link
//         href="/"
//         className={`${twClasses.button.default()} uppercase m-auto md:m-0`}
//       >
//         learn more
//       </Link>
//     </div>
//   </div>
// </section>)
