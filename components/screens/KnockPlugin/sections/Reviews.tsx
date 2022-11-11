import { Navigation, A11y, Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { artists } from 'data/fakeData';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CustomNextImage from '@components/shared/common/CustomNextImage';

const ReviewsSection = () => {
	return (
		<section className='bg-primary-1'>
			<div className=''>
				<div className='px-8 pb-12 container-restrictions-2 max-w-screen-lg mx-auto'>
					<Swiper
						modules={[Navigation, A11y, Autoplay, Pagination]}
						slidesPerView={1}
						navigation
						spaceBetween={8}
						pagination={{ clickable: true }}
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
								<SwiperSlide key={index} className='px-0 sm:p-4 pt-6 pb-24'>
									<div className='flex relative'>
										<div
											className='rounded-2xl px-6 sm:px-8 py-16 bg-primary-5 flex flex-col
												sm:pr-[5.5rem] sm:mr-[5.5rem]'
											// style={{ width: 'calc(100% - 5rem)' }}
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
													className='block sm:hidden rounded-full aspect-square w-10 h-10'
												/>
											</div>
										</div>
										<div className='hidden sm:block w-[10rem] h-[10rem] absolute top-1/2 -translate-y-1/2 right-0'>
											<CustomNextImage
												src={item.image.src}
												alt={item.image.alt}
												width={250}
												height={250}
												className='rounded-full aspect-square w-full h-full'
											/>
										</div>
										<div className='w-[5rem] h-[5rem] absolute top-[2rem] -translate-y-full left-[2rem]'>
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
			</div>
		</section>
	);
};

export default ReviewsSection;
