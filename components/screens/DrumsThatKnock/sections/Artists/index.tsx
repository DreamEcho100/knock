// import Swiper core and required modules
import { Navigation, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination'
// import 'swiper/css/scrollbar'

import { artists } from 'data';
import KnockTrademark from '@components/shared/core/KnockTrademark';
import CustomNextImage from '@components/shared/common/CustomNextImage';
import Reviews from '@components/shared/core/Reviews';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ArtistsSection = ({ reviews, data }: { reviews: any; data: any }) => {
	const array = [1, 2, 3, 4, 5, 6, 7, 8];

	return (
		<>
			<section className='bg-primary-2 section-p-v1 pb-0'>
				<div className='flex flex-col gap-2 lg:px-8 sm:gap-4'>
					<header className='text-center flex items-center justify-center'>
						{data ? (
							<h2 className='text-h4 font-semibold capitalize flex flex-wrap justify-center'>
								{data.h2}&nbsp;
								<KnockTrademark tradeMark={data.tradeMark} />
							</h2>
						) : (
							<div className='w-[100%] h-[30px]  md:w-[40%] '>
								<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
									<Skeleton
										width={'100%'}
										count={1}
										height={'100%'}
										className={'rounded-3xl mt-5 '}
									/>
								</SkeletonTheme>
							</div>
						)}
					</header>
					<div className='w-[1200px] max-w-full mx-auto'>
						<Swiper
							modules={[Navigation, A11y, Autoplay]}
							navigation
							slidesPerView='auto'
							breakpoints={{
								400: { slidesPerView: 4 },
								700: { slidesPerView: 6 },
								800: { slidesPerView: 8, spaceBetween: 5 }
							}}
							autoplay={{
								delay: 5000
							}}
							loop
							className='select-none'
						>
							{data
								? data.artist_section_dtk_page_content.map((item: any) => (
										<SwiperSlide
											key={item.id}
											className='p-2 flex flex-col justify-center items-center text-center'
										>
											<CustomNextImage
												src={
													process.env.NEXT_PUBLIC_KNOCK_URL_API + item.imageUrl
												}
												alt={item.alt}
												width={100}
												height={100}
												className='rounded-full'
											/>
											<p className='select-auto'>{item.name}</p>
										</SwiperSlide>
								  ))
								: array.map((el) => (
										<SwiperSlide
											key={el}
											className='p-2 flex flex-col justify-center items-center text-center'
										>
											<div>
												<SkeletonTheme
													baseColor='#000'
													highlightColor='#7d7b78'
												>
													<Skeleton
														width={100}
														count={1}
														height={100}
														className={'rounded-3xl mt-5  '}
														style={{ borderRadius: '50%' }}
													/>
												</SkeletonTheme>
											</div>
										</SwiperSlide>
								  ))}
						</Swiper>
					</div>
				</div>
			</section>
			<section className='bg-primary-1 section-p-v1 pb-0'>
				<div className='-translate-y-6'>
					<Reviews
						reviews={reviews}
						reviewCardVariants={{ 'min-h': 'extra-sm', 'max-w': 'extra-sm' }}
						containerVariants={{ 'max-w': 'screen-sm' }}
					/>
				</div>
			</section>
		</>
	);
};

export default ArtistsSection;
