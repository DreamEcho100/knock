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
							<Link href='/knock-plugin' className='flex flex-wrap'>
								{knockPlugin.title.split(' ').map((item, index) => (
									<span key={index}>
										{item.toLowerCase() === 'knock' ? <KnockTrademark /> : item}
									</span>
								))}
							</Link>
						)
					},
					p: {
						children: knockPlugin.description
					},
					button: { children: 'Buy it now' }
				}}
				imageContainer={{
					mainImg: {
						// src: '/images/534aaf62a986c03ee09ee62a138d3845.gif',
						src: knockPlugin.images[0] && knockPlugin.images[0]?.src,
						alt:
							(knockPlugin.images[0] && knockPlugin.images[0]?.altText) || '',
						className: 'max-w-md'
					},

					backgroundImg: false
				}}
				wrapper={{
					className: 'lg:flex-row-reverse gap-8 lg:px-20 flex-col-reverse'
				}}
			/>
		</section>
	);
};

export default KnockProductShowcaseSection;
