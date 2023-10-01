import ProductShowcase from '~/app/components/shared/core/ProductShowcase';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { type IProduct } from '~/types';

export default function EasyToUseSection({
	knockPlugin,
	data,
}: {
	knockPlugin: IProduct;
	data: any;
}) {
	return (
		<section className="bg-primary-1 text-primary-2 section-p-v1">
			<ProductShowcase
				product={knockPlugin}
				textContainer={{
					h2: {
						children: data ? (
							data.h2
						) : (
							<SkeletonTheme baseColor="#000" highlightColor="#7d7b78">
								<Skeleton
									width={350}
									count={1}
									height={20}
									className={'rounded-3xl '}
								/>
							</SkeletonTheme>
						),
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
