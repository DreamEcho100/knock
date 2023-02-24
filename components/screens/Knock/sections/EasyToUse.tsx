import ProductShowcase from '@components/shared/core/ProductShowcase';
import { IKnockPluginPageProps } from '@pages/knock';

const EasyToUseSection = ({
	knockPlugin
}: {
	knockPlugin: IKnockPluginPageProps['knockPlugin'];
}) => {
	return (
		<section className='bg-primary-1 text-primary-2 section-p-v1'>
			<ProductShowcase
				product={knockPlugin}
				textContainer={{
					h2: {
						children: 'EASY TO USE'
					},
					p: {
						children: (
							<>
								KNOCK is optimized for extreme ease of use for beginners and
								professionals alike. Use KNOCK to make your drums slap, and take
								you to the next level. Whether you are new to producing, or a
								seasoned pro, KNOCK will seamlessly fit into your workflow.
								It&apos;s lightweight on your CPU too - use it
								<br />
								on a bunch of tracks!
							</>
						)
					},
					button: { children: 'Add To Cart' }
				}}
				imageContainer={{
					mainImg: {
						src: '/images/laptop final 1.png',
						alt: '',
						className: 'lg:px-[10%]'
					}
				}}
				wrapper={{
					className: 'gap-4 lg:justify-center lg:gap-10',
					variants: { flexDir: 'col-reverse-lg:row' }
				}}
			/>
		</section>
	);
};

export default EasyToUseSection;
