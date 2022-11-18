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

const ArtistsSection = ({ reviews }: Parameters<typeof Reviews>['0']) => {
	return (
		<>
			<section className='bg-primary-2 section-p-v1 pb-0'>
				<div className='flex flex-col gap-2 lg:px-8 sm:gap-4'>
					<header className='text-center flex items-center justify-center'>
						<h2 className='text-h4 font-semibold capitalize flex flex-wrap justify-center'>
							SOME ARTISTS WHO HAVE USED DRUMS THAT&nbsp;
							<KnockTrademark />
						</h2>
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
							{artists.map((item) => (
								<SwiperSlide
									key={item.image.src + item.image.alt}
									className='p-2 flex flex-col justify-center items-center text-center'
								>
									<CustomNextImage
										src={item.image.src}
										alt={item.image.alt}
										width={100}
										height={100}
										className='rounded-full'
									/>
									<p className='select-auto'>{item.name}</p>
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
