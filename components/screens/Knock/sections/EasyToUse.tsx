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
						children:
							"KNOCK is optimized for extreme ease of use for beginners and professionals alike. Use KNOCK to make your drums slap, and take you to the next level. Whether you are new to producing, or a seasoned pro, KNOCK will seamlessly fit into your workflow. It's lightweight on your CPU too - use it on a bunch of tracks!"
					},
					button: { children: 'Buy it now' }
				}}
				imageContainer={{
					mainImg: {
						src: '/images/laptop final 1.png',
						alt: ''
					}
				}}
				wrapper={{
					className: 'flex-col-reverse gap-4 lg:justify-between'
				}}
			/>
		</section>
	);
};

export default EasyToUseSection;
