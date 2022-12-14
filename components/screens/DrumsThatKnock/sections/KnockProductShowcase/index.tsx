import KnockTrademark from '@components/shared/core/KnockTrademark';
import ProductShowcase from '@components/shared/core/ProductShowcase';
import { IDrumsThatKnockPageProps } from '@pages/drums-that-knock';
import Link from 'next/link';
import { useRouter } from 'next/router';

const KnockProductShowcaseSection = ({
	knockPlugin
}: {
	knockPlugin: IDrumsThatKnockPageProps['knockPlugin'];
}) => {
	const router = useRouter();
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
							'This is the last plugin you will ever need to make your drums KNOCK and punch through your mix. This plugin was meticulously crafted by DECAP. It is inspired by the signature sound of Drums That Knock, which has helped shaped the sonics of modern music.',
						className: 'lg:max-w-[410px]'
					},
					button: {
						children: 'Learn More',
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
						alt:
							(knockPlugin.images[0] && knockPlugin.images[0]?.altText) || '',
						className: 'lg:px-[5%] cursor-pointer',
						onClick: () => router.push('/knock-clipper')
					},
					index: {
						className: 'lg:w-[50%]' // scale-[1.5]'
					},
					backgroundImg: { className: 'scale-[3]' }
				}}
				wrapper={{
					className: 'lg:flex-row-reverse flex-col-reverse lg:justify-center'
				}}
			/>
		</section>
	);
};

export default KnockProductShowcaseSection;
