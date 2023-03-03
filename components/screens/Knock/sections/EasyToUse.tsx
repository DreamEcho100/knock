import ProductShowcase from '@components/shared/core/ProductShowcase';
import { IKnockPluginPageProps } from '@pages/knock';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const EasyToUseSection = ({
	knockPlugin,
	data
}: {
	knockPlugin: IKnockPluginPageProps['knockPlugin'];
	data: any;
}) => {


	return (
		<section className='bg-primary-1 text-primary-2 section-p-v1'>
			<ProductShowcase
				product={knockPlugin}
				textContainer={{
					h2: {
						children: data ? (
							data.h2
						) : (
							<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
								<Skeleton
									width={350}
									count={1}
									height={20}
									className={'rounded-3xl '}
								/>
							</SkeletonTheme>
						)
					},
					p: {
						children: (
							<>
								{data ? (
									data.p
								) : (
									<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
										<Skeleton
											width={300}
											count={1}
											height={20}
											className={'rounded-3xl '}
										/>
									</SkeletonTheme>
								)}
							</>
						)
					},
					button: { children: data ? data.button : '' }
				}}
				imageContainer={{
					mainImg: {
						src: data
							? process.env.NEXT_PUBLIC_KNOCK_URL_API + data.imageUrl
							: false,
						alt: '',
						className: 'lg:px-[10%]'
					}
				}}
				wrapper={{
					className: 'gap-4 lg:justify-center lg:gap-10',
					variants: { flexDir: 'col-reverse-lg:row' }
				}}
			/>
		</section>
	);
};

export default EasyToUseSection;
