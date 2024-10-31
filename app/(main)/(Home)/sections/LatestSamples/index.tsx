'use client';
import Button from '~/app/_components/shared/core/Button';
import ProductBasicCard from '~/app/_components/shared/core/Card/product/default';
import KnockTrademark from '~/app/_components/shared/core/KnockTrademark';
import { useMemo } from 'react';
import { cx } from 'class-variance-authority';
import type { Product } from '~/libs/shopify/types';

const LatestSamplesSection = ({
	products,
	data,
}: {
	products: Product[];
	data: any;
}) => {
	const filteredProducts = useMemo(() => {
		const filteredProducts: typeof products = [];

		products.forEach((item) => {
			if (item.handle === (data ? data.itemOneHandle : ''))
				filteredProducts[0] = item;
			if (item.handle === (data ? data.itemTwoHandle : ''))
				filteredProducts[1] = item;
		});

		return filteredProducts.filter(Boolean);
	}, [products, data]);

	return (
		<section className="bg-primary-2 section-p-v1">
			<div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
				<div className="flex flex-col items-center gap-4 p-4 text-center lg:p-8 lg:items-start lg:text-align-initial lg:flex-grow lg:w-1/2 lg:justify-center">
					<h2 className="flex flex-wrap justify-center font-semibold text-center text-h3 text-primary-1 lg:text-align-initial lg:justify-start">
						{data.h2[0]}&nbsp;
						<KnockTrademark tradeMark={data.tradeMark} />
						{data.h2[1]}
					</h2>
					<p className="mb-2 text-primary-2 text-h6">
						{data.p[0]} <br /> {data.p[1]}
					</p>
					<Button className="hidden lg:block" href={data.buttonUrl}>
						{data.button}
					</Button>
				</div>
				{/* <div className='flex items-center justify-center lg:flex-grow lg:w-1/2'>
					<ProductCardSlider products={products} />
				</div> */}
				<div
					className={cx(
						// 'lg:w-1/2 lg:flex-grow grid grid-cols-1 extra-sm:grid-cols-[repeat(auto-fit,_minmax(10rem,_1fr))] gap-8',
						'flex gap-8 flex-wrap extra-sm:flex-nowrap',
						'max-w-screen-sm mx-auto',
						'lg:max-w-none lg:mx-0',
					)}
				>
					{filteredProducts
						.filter(
							(item) =>
								item.handle === (data ? data.itemOneHandle : '') ||
								item.handle === (data ? data.itemTwoHandle : ''),
						)
						.map((item) => (
							<ProductBasicCard
								key={item.id}
								cardVariants={{ 'max-w': null }}
								className="flex-grow w-full extra-sm:w-1/2"
								link={{
									children: item.title,
									href: `/products/${item.handle}`,
								}}
								productData={item}
							/>
						))}
				</div>
				<div className="flex items-center justify-center p-5 lg:hidden">
					<Button href={data.buttonUrl}>{data.button}</Button>
				</div>
			</div>
		</section>
	);
};

export default LatestSamplesSection;
