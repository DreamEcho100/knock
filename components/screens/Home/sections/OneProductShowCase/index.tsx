import Button from '@components/shared/core/Button'
import KnockTrademark from '@components/shared/core/KnockTrademark'
import ProductShowcase from '@components/shared/core/ProductShowcase'
import Image from 'next/image'

const OneProductShowCaseSection = () => {
  return (
    <section className="bg-primary-2 text-primary-2 px-4 py-20">
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

// (<section className="bg-primary-2">
//   <div
//     className="container-restrictions-1
// 		flex py-20 flex-col
// 		sm:px-8 sm:py-20 sm:flex-row
// 	"
//   >
//     <div
//       className="flex gap-4 flex-col items-center text-center mb-12
// 		  	sm:p-8 sm:items-start sm:text-align-initial sm:flex-grow sm:w-1/2 sm:justify-center"
//     >
//       <h2 className="text-h2 font-bold text-primary-1 flex flex-wrap">
//         <KnockTrademark />
//         &nbsp;Clipper
//       </h2>
//       <p className="text-primary-2">
//         Adjustable hard + soft clipper module from KNOCK.
//       </p>
//       <Button>Explore it now</Button>
//     </div>
//     <div
//       className="flex items-center p-8
// 			sm:flex-grow sm:w-1/2"
//     >
//       <Image
//         src="/images/knock-clipper.png"
//         alt="knock clipper"
//         width={800}
//         height={800}
//         className="object-contain max-h-[24rem]"
//       />
//     </div>
//   </div>
// </section>)
