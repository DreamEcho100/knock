'use client';
import ProductBasicCard from '~/app/_components/shared/core/Card/product/default';
import { Navigation, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import type { Product } from '~/libs/shopify/types';

const ProductCardSlider = ({ products }: { products: Product[] }) => {
	return (
		<Swiper
			modules={[Navigation, A11y, Autoplay]}
			navigation
			autoplay={{
				delay: 7500,
			}}
			slidesPerView="auto"
			breakpoints={{
				500: {
					slidesPerView: 2,
				},
			}}
			loop
		>
			{products
				.filter((product) => product.title.startsWith('Drums That Knock Vol.'))
				.map((item) => (
					<SwiperSlide
						key={item.id}
						className="px-4 flex flex-col items-center justify-center text-center"
					>
						<ProductBasicCard
							key={item.id}
							link={{
								children: item.title,
								href: `/products/${item.handle}`,
							}}
							productData={item}
						/>
					</SwiperSlide>
				))}
		</Swiper>
	);
};

export default ProductCardSlider;
