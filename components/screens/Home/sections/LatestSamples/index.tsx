import Button from '@components/shared/core/Button';
import ProductBasicCard from '@components/shared/core/Card/product/default';
import KnockTrademark from '@components/shared/core/KnockTrademark';
import type { IHomePageProps } from '@pages/index';
import { getIdFromGid } from '@utils/core/shopify';
import { useMemo } from 'react';
import ProductCardSlider from './components/ProductCardSlider';

const LatestSamplesSection = ({
	products
}: {
	products: IHomePageProps['products'];
}) => {
	const filteredProducts = useMemo(() => {
		const filteredProducts: typeof products = [];

		products.forEach((item) => {
			if (item.handle === 'drums-that-knock-vol-9') filteredProducts[0] = item;
			if (item.handle === 'drums-that-knock-x') filteredProducts[1] = item;
		});

		return filteredProducts.filter(Boolean);
	}, [products]);
	return (
		<section className='bg-primary-2 section-p-v1'>
			<div
				className='
				flex flex-col
				md:flex-row
				gap-4
				lg:gap-6'
			>
				<div
					className='flex gap-4 flex-col items-center text-center p-4
						md:p-8 md:items-start md:text-align-initial md:flex-grow md:w-1/2 md:justify-center'
				>
					<h2
						className='text-h3 font-semibold text-primary-1 text-center flex flex-wrap justify-center
								md:text-align-initial md:justify-start'
					>
						DRUMS THAT&nbsp;
						<KnockTrademark />
						SAMPLE PACKS
					</h2>
					<p className='text-primary-2 text-h6 mb-2'>
						Designed from scratch by DECAP. <br /> Premium quality,
						groundbreaking as always.
					</p>
					<Button className='hidden md:block' href='/drums-that-knock'>
						Explore it now
					</Button>
				</div>
				{/* <div className='md:flex-grow md:w-1/2 flex justify-center items-center'>
					<ProductCardSlider products={products} />
				</div> */}
				<div
					className='md:flex-grow md:w-1/2 justify-center items-center gap-8'
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr'
					}}
				>
					{filteredProducts
						.filter(
							(item) =>
								item.handle === 'drums-that-knock-vol-9' ||
								item.handle === 'drums-that-knock-x'
						)
						.map((item) => (
							<ProductBasicCard
								key={item.id}
								link={{
									children: item.title,
									href: `/products/${getIdFromGid(item.id)}`
								}}
								{...item}
							/>
						))}
					{/*
					 */}
				</div>
				<div className='md:hidden flex justify-center items-center p-5'>
					<Button href='/drums-that-knock'>Explore it now</Button>
				</div>
			</div>
		</section>
	);
};

export default LatestSamplesSection;
