import ProductShowcase from '~/app/_components/shared/core/ProductShowcase';
import type { Product } from '~/libs/shopify/types';

export default function EasyToUseSection({
	product,
	data,
}: {
	product: Product;
	data: any;
}) {
	return (
		<section className="bg-primary-1 text-primary-2 section-p-v1">
			<ProductShowcase
				product={product}
				textContainer={{
					h2: {
						children: data.h2,
					},
					p: {
						children: data.p,
					},
					button: { children: data ? data.button : '' },
				}}
				imageContainer={{
					mainImg: {
						src: data
							? process.env.NEXT_PUBLIC_KNOCK_URL_API + data.imageUrl
							: false,
						alt: '',
						className: 'lg:px-[10%]',
					},
				}}
				wrapper={{
					className: 'gap-4 lg:justify-center lg:gap-10',
					variants: { flexDir: 'col-reverse-lg:row' },
				}}
			/>
		</section>
	);
}
