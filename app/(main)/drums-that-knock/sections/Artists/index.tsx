'use client';
import { Navigation, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import KnockTrademark from '~/app/components/shared/core/KnockTrademark';
import CustomNextImage from '~/app/components/shared/common/CustomNextImage';
import Reviews from '~/app/components/shared/core/Reviews';

const ArtistsSection = ({ reviews, data }: { reviews: any; data: any }) => {
	return (
		<>
			<section className="bg-primary-2 section-p-v1 pb-0">
				<div className="flex flex-col gap-2 lg:px-8 sm:gap-4">
					<header className="text-center flex items-center justify-center">
						<h2 className="text-h4 font-semibold capitalize flex flex-wrap justify-center">
							{data.h2}&nbsp;
							<KnockTrademark tradeMark={data.tradeMark} />
						</h2>
					</header>
					<div className="max-w-[1200px] w-full mx-auto">
						<Swiper
							modules={[Navigation, A11y, Autoplay]}
							navigation
							slidesPerView="auto"
							breakpoints={{
								400: { slidesPerView: 4 },
								700: { slidesPerView: 6 },
								800: { slidesPerView: 8, spaceBetween: 5 },
							}}
							autoplay={{
								delay: 5000,
							}}
							loop
							className="select-none"
						>
							{data.artist_section_dtk_page_content.map((item: any) => (
								<SwiperSlide
									key={item.id}
									className="p-2 flex flex-col justify-center items-center text-center"
								>
									<CustomNextImage
										src={process.env.NEXT_PUBLIC_KNOCK_URL_API + item.imageUrl}
										alt={item.alt}
										width={100}
										height={100}
										className="rounded-full"
									/>
									<p className="select-auto">{item.name}</p>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</section>
			<section className="bg-primary-1 section-p-v1 pb-0">
				<div className="-translate-y-6">
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
