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
		<section className='bg-primary-2 section-p-v1 pb-0'>
			<div className='flex flex-col gap-4'>
				<header className='text-center flex items-center justify-center'>
					<h2 className='text-h2 font-bold capitalize flex flex-wrap justify-center'>
						SOME ARTISTS WHO HAVE USED DRUMS THAT&nbsp;
						<KnockTrademark />
					</h2>
				</header>
				<div>
					<Swiper
						modules={[Navigation, A11y, Autoplay]}
						slidesPerView={1}
						spaceBetween={10}
						navigation
						autoplay={{
							delay: 5000
						}}
						breakpoints={{
							300: { slidesPerView: 3 },
							520: { slidesPerView: 4 },
							720: { slidesPerView: 6 }
						}}
					>
						{'br'
							.repeat(2)
							.split('br')
							.map(() => artists)
							.flat(1)
							.map((item, index) => (
								<SwiperSlide
									key={index}
									className='translate-y-2 p-2 gap-2 flex flex-col justify-center items-center text-center'
								>
									<CustomNextImage
										src={item.image.src}
										alt={item.image.alt}
										width={120}
										height={120}
										className='rounded-full'
									/>
									<p>{item.name}</p>
								</SwiperSlide>
							))}
					</Swiper>
				</div>
				<div className='-translate-y-6'>
					<Reviews
						reviews={reviews}
						reviewCardVariants={{ 'min-h': 'sm', 'max-w': 'sm' }}
					/>
				</div>
			</div>
		</section>
	);
};

export default ArtistsSection;
