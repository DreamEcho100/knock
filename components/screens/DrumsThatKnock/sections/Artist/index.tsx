// import Swiper core and required modules
import { Navigation, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination'
// import 'swiper/css/scrollbar'
import Image from 'next/image';
import { artists } from 'data/fakeData';
import KnockTrademark from '@components/shared/core/KnockTrademark';

const ArtistSection = () => {
	return (
		<section className='bg-primary-2'>
			<div className='px-8 py-16 flex flex-col gap-12'>
				<header className='text-center flex items-center justify-center'>
					<h2 className='text-[2rem] font-bold capitalize flex flex-wrap justify-center'>
						SOME ARTISTS WHO HAVE USED DRUMS THAT &nbsp;
						<KnockTrademark />
					</h2>
				</header>
				<div className='px-8'>
					<Swiper
						modules={[Navigation, A11y]}
						slidesPerView={1}
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
									className='p-2 gap-2 flex flex-col justify-center text-center'
								>
									<Image
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
			</div>
		</section>
	);
};

export default ArtistSection;
