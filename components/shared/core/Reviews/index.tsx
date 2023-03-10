import type { VariantProps } from 'class-variance-authority';

import { Navigation, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CustomNextImage, {
	ICustomNextImageProps
} from '@components/shared/common/CustomNextImage';
import { cva, cx } from 'class-variance-authority';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const handleReviewCardVariants = cva(
	'relative rounded-2xl w-full px-6 py-12 flex',
	{
		variants: {
			'min-h': {
				'extra-sm': 'min-h-[7rem]',
				sm: 'min-h-[8rem]',
				md: 'min-h-[14rem]'
			},
			'max-w': {
				'extra-sm': 'max-w-[28rem]',
				sm: 'max-w-[30rem]'
			}
		},
		defaultVariants: {
			'min-h': 'md'
		}
	}
);

const handleContainerVariants = cva('max-w-screen-sm mx-auto', {
	variants: {
		'max-w': {
			'screen-lg': 'max-w-screen-lg',
			'screen-sm': 'max-w-screen-sm',
			'screen-md': 'max-w-screen-md'
		}
	},
	defaultVariants: {
		'max-w': 'screen-lg'
	}
});

('max-w-screen-sm mx-auto');

const Reviews = ({
	reviews,
	reviewCardVariants = {},
	containerVariants
}: {
	reviews: any;
	reviewCardVariants?: VariantProps<typeof handleReviewCardVariants>;
	containerVariants?: VariantProps<typeof handleContainerVariants>;
}) => {
	return (
		<div className={handleContainerVariants(containerVariants)}>
			{reviews.length ? (
				<Swiper
					modules={[Navigation, A11y, Autoplay]}
					slidesPerView={1}
					navigation
					spaceBetween={20}
					autoplay={{
						delay: 15000
					}}
					loop
					className='swiper-wrapper-items-center select-none'
				>
					{reviews.map((item: any) => (
						<SwiperSlide
							key={item.id}
							className='my-8 w-full px-3 flex items-center justify-center'
						>
							<div className='flex items-center justify-center relative w-full'>
								<div
									className={handleReviewCardVariants({
										...reviewCardVariants
									})}
								>
									<div className='flex flex-col gap-6 p-4 text-center w-fit mx-auto relative'>
										<div
											className={cx(
												'w-16 h-16 absolute top-0 -translate-y-full left-0'
												// 'sm:w-20 sm:h-20 sm:top-10'
											)}
										>
											<CustomNextImage
												src='/svgs/double-quates.svg'
												alt='double-quates'
												width={250}
												height={250}
												priority
												className='aspect-square w-full h-full scale-90'
											/>
										</div>
										<q className='select-auto'>{item.review}</q>
										<div className='flex justify-center gap-2'>
											<CustomNextImage
												src={
													item.imageUrl
														? process.env.NEXT_PUBLIC_KNOCK_URL_API +
														  item.imageUrl
														: '/images/icon1.png'
												}
												width={250}
												height={250}
												className='bg-black block rounded-full aspect-square w-20 h-20 object-cover'
											/>
											<div className='flex flex-col items-center justify-between'>
												<span />
												<span className='border-b-[0.0125rem] border-text-primary-4 w-12 mb-2 mt-3 translate-y-[1ch]' />
												<div className='flex items-end gap-4'>
													<cite
														className='flex items-end select-auto'
														style={{ fontStyle: 'normal' }}
													>
														{item.reviewBy}
													</cite>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<div className='w-[100%] h-[400px]  md:w-[100%] '>
					<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
						<Skeleton
							width={'100%'}
							count={1}
							height={'100%'}
							className={'rounded-3xl  '}
						/>
					</SkeletonTheme>
				</div>
			)}
		</div>
	);
};

export default Reviews;
