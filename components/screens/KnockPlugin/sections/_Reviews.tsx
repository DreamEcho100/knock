import { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CustomNextImage from '@components/shared/common/CustomNextImage';

const reviewsImages = [
	'/images/knock/testimonials/AJ Hall.jpeg',
	'/images/knock/testimonials/IMG_0096.jpeg',
	'/images/knock/testimonials/IMG_0112.jpeg',
	'/images/knock/testimonials/IMG_0292.jpeg',
	'/images/knock/testimonials/IMG_2175.PNG',
	'/images/knock/testimonials/IMG_2176.PNG',
	'/images/knock/testimonials/IMG_2252.jpeg',
	'/images/knock/testimonials/IMG_2277.PNG',
	'/images/knock/testimonials/IMG_2404.PNG',
	'/images/knock/testimonials/IMG_2823.jpeg',
	'/images/knock/testimonials/IMG_2856.jpeg',
	'/images/knock/testimonials/IMG_2950.jpeg',
	'/images/knock/testimonials/IMG_3151.jpeg',
	'/images/knock/testimonials/Screen Shot 2021-11-06 at 11.49.45 PM.png',
	'/images/knock/testimonials/Screen Shot 2021-11-06 at 11.51.18 PM.png',
	'/images/knock/testimonials/Screen Shot 2022-01-05 at 6.03.23 PM.png',
	'/images/knock/testimonials/Screen Shot 2022-03-03 at 11.09.02 PM.png',
	'/images/knock/testimonials/Screen Shot 2022-03-03 at 11.09.22 PM.png',
	'/images/knock/testimonials/Screen Shot 2022-03-03 at 11.10.20 PM.png',
	'/images/knock/testimonials/Screen Shot 2022-03-03 at 11.10.48 PM.png',
	'/images/knock/testimonials/Screen Shot 2022-06-02 at 10.22.13 PM.png',
	'/images/knock/testimonials/Screen Shot 2022-06-30 at 3.59.36 PM.png',
	'/images/knock/testimonials/ScreenShot_20221111011110.jpeg',
	'/images/knock/testimonials/Untitled.jpg'
];

const ReviewsSection = () => {
	return (
		<section className='bg-primary-1'>
			<div className=''>
				<div className='px-8 pb-12 container-restrictions-2 max-w-screen-lg mx-auto'>
					<Swiper
						modules={[Navigation, Pagination, Autoplay, A11y]}
						slidesPerView={1}
						navigation
						spaceBetween={8}
						pagination={{ clickable: true }}
						autoplay={{
							delay: 7500
						}}
					>
						{reviewsImages.map((item, index) => (
							<SwiperSlide key={index} className='px-8 pt-24 pb-12'>
								<div className='w-full h-full aspect-square'>
									<CustomNextImage
										unoptimized
										src={item}
										alt={`Knock plugin review ${index + 1}`}
										width={250}
										height={250}
										className='w-full h-full object-contain'
									/>
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
