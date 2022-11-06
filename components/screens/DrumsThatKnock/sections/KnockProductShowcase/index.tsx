import KnockTrademark from '@components/shared/core/KnockTrademark';
import ProductShowcase from '@components/shared/core/ProductShowcase';

const KnockProductShowcaseSection = () => {
	return (
		<section className='bg-primary-1 text-primary-2 px-8 py-16 md:px-16'>
			<ProductShowcase
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
							'This is the last plugin you will ever need to make your drums knock and punch through your mix. This plugin was meticulously crafted by DECAP. It is inspired by the signature sound of Drums That Knock, which has helped shaped the sonics of modern music.'
					},
					button: { children: 'Buy it now' }
				}}
				imageContainer={{
					mainImg: {
						src: '/images/534aaf62a986c03ee09ee62a138d3845.gif',
						alt: '',
						className: 'max-w-md'
					},

					backgroundImg: false
				}}
				wrapper={{ className: 'lg:flex-row-reverse gap-8 lg:px-20' }}
			/>
		</section>
	);
};

export default KnockProductShowcaseSection;
