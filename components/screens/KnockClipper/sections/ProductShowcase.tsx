import type { IKnockClipperPageProps } from '@pages/knock_clipper';

import KnockTrademark from '@components/shared/core/KnockTrademark';
import ProductShowcase from '@components/shared/core/ProductShowcase';

const ProductShowcaseSection = ({
	knockClipperPlugin
}: {
	knockClipperPlugin: IKnockClipperPageProps['knockClipperPlugin'];
}) => {
	return (
		<section className='bg-primary-1 text-primary-2 px-8 py-16 md:section-p-v1'>
			<ProductShowcase
				product={knockClipperPlugin}
				textContainer={{
					h2: {
						children: (
							<>
								<KnockTrademark />
								Clipper
							</>
						)
					},
					p: {
						children:
							'Push your drums hard without ever going above 0db to give your drums a warm, aggressive tone reminiscent of pushing vintage analogue gear into "the red". Select a harder clip curve for a more aggressive tone, or a softer clip curve for a rounder tone. KNOCK Clipper has an optional high quality mode to enable oversampling.'
					},
					button: { children: 'Buy it now' }
				}}
				imageContainer={{
					mainImg: {
						src: '/images/f53123f1bc1e263458b5926c1b1422c3.png',
						alt: '',
						className: 'px-[5%] lg:px-[10%]'
					},

					backgroundImg: {
						className: '-translate-x-[30%] scale-[2]'
					}
				}}
				wrapper={{
					className:
						'lg:flex-row-reverse flex-col-reverse gap-10 lg:justify-center'
				}}
			/>
		</section>
	);
};

export default ProductShowcaseSection;
