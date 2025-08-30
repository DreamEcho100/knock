import KnockTrademark from '~/app/_components/shared/core/KnockTrademark';
import ProductShowcase from '~/app/_components/shared/core/ProductShowcase';
import type { Product } from '~/libs/shopify/types';

const ProductShowcaseSection = ({
	product,
	data,
}: {
	product: Product;
	data: any;
}) => {
	return (
		<section className="bg-primary-1 text-primary-2 px-8 py-16 md:section-p-v1">
			<ProductShowcase
				product={product}
				textContainer={{
					h2: {
						children: (
							<>
								<KnockTrademark tradeMarkPrefix={data.tradeMark} />
								{data.h2}
							</>
						),
					},
					p: {
						children: data.p,
						className: 'max-w-[420px]',
					},
					button: { children: data ? data.button : false },
				}}
				imageContainer={{
					mainImg: {
						src: process.env.NEXT_PUBLIC_KNOCK_URL_API + data.imageUrl,
						alt: '',
						className: 'px-[5%] lg:px-[10%]',
					},

					backgroundImg: {
						className: '-translate-x-[30%] scale-[2]',
					},
				}}
				wrapper={{
					className: 'gap-10 lg:justify-center',
					variants: { flexDir: 'col-reverse-lg:row-reverse' },
				}}
			/>
		</section>
	);
};

export default ProductShowcaseSection;
