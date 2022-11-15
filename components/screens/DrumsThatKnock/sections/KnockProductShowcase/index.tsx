import KnockTrademark from '@components/shared/core/KnockTrademark';
import ProductShowcase from '@components/shared/core/ProductShowcase';
import { IDrumsThatKnockPageProps } from '@pages/drums-that-knock';
import Link from 'next/link';

const KnockProductShowcaseSection = ({
	knockPlugin
}: {
	knockPlugin: IDrumsThatKnockPageProps['knockPlugin'];
}) => {
	return (
		<section className='bg-primary-1 text-primary-2 section-p-v1'>
			<ProductShowcase
				product={knockPlugin}
				textContainer={{
					h2: {
						children: (
							<Link href='/knock' className='flex flex-wrap'>
								{/* {knockPlugin.title.split(' ').map((item, index) => (
									<span key={index}>
										{item.toLowerCase() === 'knock' ? <KnockTrademark /> : item}
									</span>
								))} */}
								<KnockTrademark />
							</Link>
						)
					},
					p: {
						children:
							'This is the last plugin you will ever need to make your drums KNOCK and punch through your mix. This plugin was meticulously crafted by DECAP. It is inspired by the signature sound of Drums That Knock, which has helped shaped the sonics of modern music.'
						// knockPlugin.description
					},
					button: {
						children: 'Explore them',
						onClick: () => {
							return;
						},
						href: '/knock'
					}
				}}
				imageContainer={{
					mainImg: {
						// src: '/images/534aaf62a986c03ee09ee62a138d3845.gif',
						src: knockPlugin.images[0] && knockPlugin.images[0]?.src,
						alt: (knockPlugin.images[0] && knockPlugin.images[0]?.altText) || ''
					},

					backgroundImg: false
				}}
				wrapper={{
					className: 'lg:flex-row-reverse flex-col-reverse lg:justify-between'
				}}
			/>
		</section>
	);
};

export default KnockProductShowcaseSection;
