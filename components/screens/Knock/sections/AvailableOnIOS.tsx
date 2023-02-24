import ProductShowcase from '@components/shared/core/ProductShowcase';
import React from 'react';
import { BsApple } from 'react-icons/bs';

type Props = {};

const AvailableOnIOSSection = (props: Props) => {
	return (
		<section className='bg-primary-1 text-primary-2 section-p-v1'>
			<ProductShowcase
				// product={knockPlugin}
				textContainer={{
					h2: {
						children: 'AVAILABLE ON IOS'
					},
					p: {
						children: (
							<>
								KNOCK is now available for both iPad and iPhone on the Apple
								Store. Use KNOCK in your favorite mobile DAW that supports AUv3
								plugins.
							</>
						)
					},
					button: {
						children: (
							<>
								<BsApple /> App Store
							</>
						),
						onClick: () => ''
					}
				}}
				imageContainer={{
					mainImg: {
						src: '/images/7f06f68fcc36f36e4fc8dee2d1991a8ad6be59e0.png',
						alt: '',
						className: 'scale-[1.4]'
					},
					backgroundImg: {
						src: '/images/Rectangle 48.png',
						variants: { translateY: null, translateX: 'small' }
					}
				}}
				wrapper={{
					className: 'gap-4 lg:justify-center lg:gap-10',
					variants: { flexDir: 'col-reverse-lg:row-reverse' }
				}}
			/>
		</section>
	);
};

export default AvailableOnIOSSection;
