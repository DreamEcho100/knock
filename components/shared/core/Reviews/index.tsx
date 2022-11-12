import type { VariantProps } from 'class-variance-authority';

import { Navigation, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CustomNextImage from '@components/shared/common/CustomNextImage';
import { cva, cx } from 'class-variance-authority';

const handleReviewCardVariants = cva(
	'relative rounded-2xl w-full px-6 sm:px-10 py-12 bg-primary-5 flex flex-col',
	{
		variants: {
			'min-h': {
				sm: 'min-h-[8rem]',
				md: 'min-h-[14rem]'
			},
			'max-w': {
				sm: 'max-w-[30rem]'
			},
			withReviewerImage: {
				true: 'sm:pr-[5.5rem] sm:mr-[4.5rem] sm:py-16'
			}
		},
		defaultVariants: {
			'min-h': 'md',
			withReviewerImage: true
		}
	}
);

const handleContainerVariants = cva(
	'container-restrictions-2 max-w-screen-sm mx-auto',
	{
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
	}
);

('container-restrictions-2 max-w-screen-sm mx-auto');

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
				// scrollbar={{ draggable: true }}
				autoplay={{
					delay: 15000
				}}
				className='swiper-wrapper-items-center'
			>
				{reviews.map((item, index) => (
					<SwiperSlide
						key={index}
						className='my-8 w-full px-3 flex items-center justify-center'
					>
						<div className='flex items-center justify-center relative w-full'>
							<div
								className={handleReviewCardVariants({
									...reviewCardVariants,
									withReviewerImage:
										reviewCardVariants.withReviewerImage || !!item.image
								})}
							>
								<div
									className={cx(
										'hidden absolute top-1/2 -translate-y-1/2 right-0',
										'sm:block sm:w-36 sm:h-36'
									)}
								>
									{item.image && (
										<CustomNextImage
											src={item.image.src}
											alt={item.image.alt}
											width={250}
											height={250}
											className='bg-black rounded-full aspect-square w-full h-full object-cover translate-x-1/2'
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
								<q>{item.review}</q>
								<span className='border-b-[0.0125rem] border-text-primary-4 w-12 mb-2 mt-3'></span>
								<div className='flex items-end gap-4'>
									<cite
										className='flex items-end'
										style={{ fontStyle: 'normal' }}
									>
										{item.reviewedBy}
									</cite>
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
