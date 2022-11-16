import type { VariantProps } from 'class-variance-authority';

import { Navigation, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CustomNextImage from '@components/shared/common/CustomNextImage';
import { cva, cx } from 'class-variance-authority';

const handleReviewCardVariants = cva(
	'relative rounded-2xl w-full px-6 py-12 bg-primary-5 flex',
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
	reviews: {
		image?: {
			src: string;
			alt: string;
		};
		review: string;
		reviewedBy: string;
	}[];
	reviewCardVariants?: VariantProps<typeof handleReviewCardVariants>;
	containerVariants?: VariantProps<typeof handleContainerVariants>;
}) => {
	return (
		<div className={handleContainerVariants(containerVariants)}>
			<Swiper
				modules={[Navigation, A11y, Autoplay]}
				slidesPerView={1}
				navigation
				spaceBetween={20}
				autoplay={{
					delay: 15000
				}}
				loop
				className='swiper-wrapper-items-center scale-105'
			>
				{reviews.map((item, index) => (
					<SwiperSlide
						key={index}
						className='my-8 w-full px-3 flex items-center justify-center scale-95'
					>
						<div className='flex items-center justify-center relative w-full'>
							<div
								className={handleReviewCardVariants({
									...reviewCardVariants
								})}
							>
								<div
									className={cx(
										'sm:flex sm:min-w-fit items-center justify-center'
									)}
								>
									{item.image && (
										<CustomNextImage
											src={item.image.src}
											alt={item.image.alt}
											width={250}
											height={250}
											className={cx(
												'bg-black rounded-full aspect-square object-cover',

												'sm:block sm:w-28 sm:h-28'
											)}
										/>
									)}
								</div>
								<div
									className={cx(
										'w-16 h-16 absolute top-8 -translate-y-full left-8',
										'sm:w-20 sm:h-20 sm:top-10'
									)}
								>
									{item.image && (
										<CustomNextImage
											src='/svgs/double-quates.svg'
											alt={item.image.alt}
											width={250}
											height={250}
											className='aspect-square w-full h-full'
										/>
									)}
								</div>
								<div className='flex flex-col p-4'>
									<q>{item.review}</q>
									<span className='border-b-[0.0125rem] border-text-primary-4 w-12 mb-2 mt-3'></span>
									<div className='flex items-end gap-4'>
										<cite
											className='flex items-end'
											style={{ fontStyle: 'normal' }}
										>
											{item.reviewedBy}
										</cite>
									</div>
									{item.image && (
										<CustomNextImage
											src={item.image.src}
											alt={item.image.alt}
											width={250}
											height={250}
											className='bg-black block sm:hidden rounded-full aspect-square w-8 h-8 object-cover'
										/>
									)}
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Reviews;
