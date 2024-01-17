'use client';
import { Navigation, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import KnockTrademark from '~/app/components/shared/core/KnockTrademark';
import CustomNextImage from '~/app/components/shared/common/CustomNextImage';
import Reviews from '~/app/components/shared/core/Reviews';
import { AspectRatio } from '~/app/components/shared/common/AspectRatio';
// import { AspectRatio } from '@radix-ui/react-aspect-ratio';

const ArtistsSection = ({ reviews, data }: { reviews: any; data: any }) => {
	return (
		<>
			<section className="pb-0 bg-primary-2 section-p-v1">
				<div className="flex flex-col gap-2 lg:px-8 sm:gap-4">
					<header className="flex items-center justify-center text-center">
						<h2 className="flex flex-wrap justify-center font-semibold capitalize text-h4">
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
								<SwiperSlide key={item.id}>
									<div className="flex flex-col items-center justify-center gap-1 p-2 text-center">
										<AspectRatio ratio={1}>
											<CustomNextImage
												src={
													process.env.NEXT_PUBLIC_KNOCK_URL_API + item.imageUrl
												}
												alt={item.alt}
												width={100}
												height={100}
												className="rounded-full"
											/>
										</AspectRatio>
										<p>{item.name}</p>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</section>
			<section className="pb-0 bg-primary-1 section-p-v1">
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
