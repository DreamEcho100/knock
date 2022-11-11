import { Navigation, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { artists } from 'data/fakeData';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CustomNextImage from '@components/shared/common/CustomNextImage';
import { cx } from 'class-variance-authority';

const ReviewsSection = () => {
	return (
		<section className='bg-primary-1'>
			<div className='px-8 pb-12 container-restrictions-2 max-w-screen-lg mx-auto'>
				<Swiper
					modules={[Navigation, A11y, Autoplay]}
					slidesPerView={1}
					navigation
					spaceBetween={20}
					// scrollbar={{ draggable: true }}
					autoplay={{
						delay: 15000
					}}
				>
					{artists
						.map((item) => ({
							...item,
							review:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
						}))
						.map((item, index) => (
							<SwiperSlide key={index} className='px-2 sm:p-4 pt-12 pb-12'>
								<div className='flex relative'>
									<div
										className='rounded-2xl px-6 sm:px-10 py-12 bg-primary-5 flex 	flex-col
												sm:pr-[5.5rem] sm:mr-[5.5rem] sm:py-16'
									>
										<q>{item.review}</q>
										<span className='border-b-[0.0125rem] border-text-primary-4 w-12 mb-2 mt-3'></span>
										<div className='flex items-end gap-4'>
											<cite
												className='flex items-end'
												style={{ fontStyle: 'normal' }}
											>
												{item.name}
											</cite>
											<CustomNextImage
												src={item.image.src}
												alt={item.image.alt}
												width={250}
												height={250}
												className='block sm:hidden rounded-full aspect-square w-8 h-8'
											/>
										</div>
									</div>
									<div
										className={cx(
											'hidden absolute top-1/2 -translate-y-1/2 right-0',
											'sm:block sm:w-40 sm:h-40'
										)}
									>
										<CustomNextImage
											src={item.image.src}
											alt={item.image.alt}
											width={250}
											height={250}
											className='rounded-full aspect-square w-full h-full'
										/>
									</div>
									<div
										className={cx(
											'w-16 h-16 absolute top-8 -translate-y-full left-8',
											'sm:w-20 sm:h-20 sm:top-10'
										)}
									>
										<CustomNextImage
											src='/svgs/double-quates.svg'
											alt={item.image.alt}
											width={250}
											height={250}
											className='aspect-square w-full h-full'
										/>
									</div>
								</div>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</section>
	);
};

export default ReviewsSection;
