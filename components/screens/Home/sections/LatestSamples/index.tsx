import Button from '@components/shared/core/Button';
import ProductBasicCard from '@components/shared/core/Card/product/default';
import KnockTrademark from '@components/shared/core/KnockTrademark';
import type { IHomePageProps } from '@pages/index';
import { getIdFromGid } from '@utils/core/shopify';
import { useMemo } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const LatestSamplesSection = ({
	products,
	data
}: {
	products: IHomePageProps['products'];
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
		<section className='bg-primary-2 section-p-v1'>
			<div className='flex flex-col gap-4 md:flex-row lg:gap-6'>
				<div className='flex flex-col items-center gap-4 p-4 text-center md:p-8 md:items-start md:text-align-initial md:flex-grow md:w-1/2 md:justify-center'>
					{data ? (
						<h2 className='flex flex-wrap justify-center font-semibold text-center text-h3 text-primary-1 md:text-align-initial md:justify-start'>
							{data.h2[0]}&nbsp;
							<KnockTrademark tradeMark={data.tradeMark} />
							{data.h2[1]}
						</h2>
					) : (
						<div className='w-[100%] h-[30px]  md:w-[40%] '>
							<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
								<Skeleton
									width={'100%'}
									count={1}
									height={'100%'}
									className={'rounded-3xl mt-5  '}
								/>
							</SkeletonTheme>
						</div>
					)}
					{data ? (
						<p className='mb-2 text-primary-2 text-h6'>
							{data.p[0]} <br /> {data.p[1]}
						</p>
					) : (
						<div className='w-[70%] h-[50px]  md:w-[50%] '>
							<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
								<Skeleton
									width={'100%'}
									count={1}
									height={'100%'}
									className={'rounded-3xl mt-5  '}
								/>
							</SkeletonTheme>
						</div>
					)}
					{data ? (
						<Button className='hidden md:block' href={data.buttonUrl}>
							{data.button}
						</Button>
					) : (
						<div className='w-[50%] h-[50px]  md:w-[30%] '>
							<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
								<Skeleton
									width={'100%'}
									count={1}
									height={'100%'}
									className={'rounded-3xl mt-5  '}
								/>
							</SkeletonTheme>
						</div>
					)}
				</div>
				{/* <div className='flex items-center justify-center md:flex-grow md:w-1/2'>
					<ProductCardSlider products={products} />
				</div> */}
				<div className='md:w-1/2 md:flex-grow grid grid-cols-[repeat(auto-fit,_minmax(10rem,_1fr))] gap-8'>
					{data ? (
						filteredProducts
							.filter(
								(item) =>
									item.handle === (data ? data.itemOneHandle : '') ||
									item.handle === (data ? data.itemTwoHandle : '')
							)
							.map((item) => (
								<>
									<ProductBasicCard
										cardVariants={{ 'max-w': null }}
										link={{
											children: item.title,
											href: `/products/${getIdFromGid(item.id)}`
										}}
										productData={item}
									/>
								</>
							))
					) : (
						<>
							<div className='h-64'>
								<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
									<Skeleton
										width={'100%'}
										count={1}
										height={'100%'}
										className={'rounded-3xl mt-5  '}
									/>
								</SkeletonTheme>
							</div>
							<div className='h-64'>
								<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
									<Skeleton
										width={'100%'}
										count={1}
										height={'100%'}
										className={'rounded-3xl mt-5'}
									/>
								</SkeletonTheme>
							</div>
						</>
					)}
					{/*
					 */}
				</div>
				<div className='flex items-center justify-center p-5 md:hidden'>
					{data ? (
						<Button href={data.buttonUrl}>{data.button}</Button>
					) : (
						<div className='w-[50%] h-[50px]  md:w-[30%] '>
							<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
								<Skeleton
									width={'100%'}
									count={1}
									height={'100%'}
									className={'rounded-3xl mt-5  '}
								/>
							</SkeletonTheme>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default LatestSamplesSection;
