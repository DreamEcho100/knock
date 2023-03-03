import type { IKnockClipperPageProps } from '@pages/knock-clipper';

import KnockTrademark from '@components/shared/core/KnockTrademark';
import ProductShowcase from '@components/shared/core/ProductShowcase';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ProductShowcaseSection = ({
	knockClipperPlugin,
	data
}: {
	knockClipperPlugin: IKnockClipperPageProps['knockClipperPlugin'];
	data: any;
}) => {
	return (
		<section className='bg-primary-1 text-primary-2 px-8 py-16 md:section-p-v1'>
			<ProductShowcase
				product={knockClipperPlugin}
				textContainer={{
					h2: {
						children: data ? (
							<>
								<KnockTrademark tradeMark={data.tradeMark} />
								{data.h2}
							</>
						) : (
							<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
								<Skeleton
									width={250}
									count={1}
									height={20}
									className={'rounded-3xl mt-5 '}
								/>
							</SkeletonTheme>
						)
					},
					p: {
						children: data ? (
							data.p
						) : (
							<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
								<Skeleton
									width={150}
									count={1}
									height={20}
									className={'rounded-3xl '}
								/>
							</SkeletonTheme>
						),
						className: 'max-w-[420px]'
					},
					button: { children: data ? data.button : false }
				}}
				imageContainer={{
					mainImg: {
						src: data
							? process.env.NEXT_PUBLIC_KNOCK_URL_API + data.imageUrl
							: false,
						alt: '',
						className: 'px-[5%] lg:px-[10%]'
					},

					backgroundImg: {
						className: '-translate-x-[30%] scale-[2]'
					}
				}}
				wrapper={{
					className: 'gap-10 lg:justify-center',
					variants: { flexDir: 'col-reverse-lg:row-reverse' }
				}}
			/>
		</section>
	);
};

export default ProductShowcaseSection;
