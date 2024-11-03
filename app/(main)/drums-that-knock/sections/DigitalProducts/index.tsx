import CustomNextImage from '~/app/_components/shared/common/CustomNextImage';
import { ProductCardWithDetails } from '~/app/_components/shared/core/Card/product/default';
import type { Product } from '~/libs/shopify/types';

const DigitalProductsSection = ({ products }: { products: Product[] }) => {
	return (
		<section className="bg-primary-1 section-p-v1 relative">
			<div className="pointer-events-none select-none grid grid-rows-4 justify-items-center items-center absolute top-0 right-0 bottom-0 left-0 w-full h-full">
				<CustomNextImage
					className="w-full h-full object-contain scale-x-[2.5] scale-y-[2] translate-y-[20%]"
					src="/images/Rectangle 47.png"
					alt=""
					width={800}
					height={800}
					placeholder="blur"
					blurDataURL="/svg/bbblurry.svg"
				/>
				<CustomNextImage
					className="w-full h-full object-contain scale-x-[2.8] scale-y-[2.4] translate-x-[5%] rtl:-translate-x-[5%]"
					src="/images/Rectangle 46.png"
					alt=""
					width={800}
					height={800}
					placeholder="blur"
					blurDataURL="/svg/bbblurry.svg"
				/>
				<CustomNextImage
					className="w-full h-full object-contain scale-x-[2.8] scale-y-[2.4] translate-x-[15%] rtl:-translate-x-[15%]"
					src="/images/Rectangle 48.png"
					alt=""
					width={800}
					height={800}
					placeholder="blur"
					blurDataURL="/svg/bbblurry.svg"
				/>
				<CustomNextImage
					className="w-full h-full object-contain -translate-y-[10%] scale-x-[1.1] scale-y-[1.1] translate-x-[5%] rtl:-translate-x-[5%]"
					src="/images/Rectangle 45.png"
					alt=""
					width={800}
					height={800}
					placeholder="blur"
					blurDataURL="/svg/bbblurry.svg"
				/>
			</div>
			<div
				className="relative justify-items-center"
				style={{
					zIndex: 2,
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
					gap: '4rem 3rem',
				}}
			>
				{console.log('products', products[products.length - 1]) ||
					products.map((item) => (
						<ProductCardWithDetails
							key={item.id}
							link={{
								children: item.title,
								href: `/products/${item.handle}`,
							}}
							{...item}
							toAddToCart
							productData={item}
							cardVariants={{ intent: 'none', w: 'full' }}
							imageVariants={{ onHover: 'to-dimmer' }}
						/>
					))}
			</div>
		</section>
	);
};

export default DigitalProductsSection;
