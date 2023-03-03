import ProductShowcase from '@components/shared/core/ProductShowcase';
import React from 'react';
import { BsApple } from 'react-icons/bs';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const AvailableOnIOSSection = ({ data }: { data: any }) => {
	return (
		<section className='bg-primary-1 text-primary-2 section-p-v1'>
			<ProductShowcase
				// product={knockPlugin}
				textContainer={{
					h2: {
						children: data ? (
							data.h2
						) : (
							<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
								<Skeleton
									width={350}
									count={1}
									height={30}
									className={'rounded-3xl '}
								/>
							</SkeletonTheme>
						)
					},
					p: {
						children: data ? (
							<>{data.p}</>
						) : (
							<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
								<Skeleton
									width={300}
									count={1}
									height={100}
									className={'rounded-3xl '}
								/>
							</SkeletonTheme>
						)
					},
					button: {
						children: data ? (
							<>
								<BsApple /> {data.button}
							</>
						) : (
							false
						),
						onClick: () => window.open(data.buttonUrl || '/', '_blank')
					}
				}}
				imageContainer={{
					mainImg: {
						src: data
							? process.env.NEXT_PUBLIC_KNOCK_URL_API + data.imageUrl
							: false,
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
