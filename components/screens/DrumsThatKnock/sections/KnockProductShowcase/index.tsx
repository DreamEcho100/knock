import KnockTrademark from '@components/shared/core/KnockTrademark';
import ProductShowcase from '@components/shared/core/ProductShowcase';
import { IDrumsThatKnockPageProps } from '@pages/drums-that-knock';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const KnockProductShowcaseSection = ({
	knockPlugin,
	data
}: {
	knockPlugin: IDrumsThatKnockPageProps['knockPlugin'];
	data: any;
}) => {
	const router = useRouter();
	return (
		<section className='bg-primary-1 text-primary-2 section-p-v1'>
			<ProductShowcase
				product={knockPlugin}
				textContainer={{
					h2: {
						children: (
							<>
								{data ? (
									<Link href={data.buttonUrl} className='flex flex-wrap'>
										{/* {knockPlugin.title.split(' ').map((item, index) => (
									<span key={index}>
										{item.toLowerCase() === 'knock' ? <KnockTrademark /> : item}
									</span>
								))} */}
										{data.h2 ? <h2>{data.h2}&nbsp; </h2> : '' || ""}
										<KnockTrademark tradeMark={data.tradeMark} />
									</Link>
								) : (
									<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
										<Skeleton
											width={250}
											count={1}
											height={20}
											className={'rounded-3xl mt-5 '}
										/>
									</SkeletonTheme>
								)}
							</>
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
						className: 'lg:max-w-[410px]'
					},
					button: {
						children: data ? data.button : false,
						onClick: () => {
							return;
						},
						href: data.buttonUrl
					}
				}}
				imageContainer={{
					mainImg: {
						// src: '/images/534aaf62a986c03ee09ee62a138d3845.gif',
						src: data
							? process.env.NEXT_PUBLIC_KNOCK_URL_API + data.imageUrl
							: false,
						alt:
							(knockPlugin.images[0] && knockPlugin.images[0]?.altText) || '',
						className: 'lg:px-[5%] cursor-pointer',
						onClick: () => router.push(data.buttonUrl || '/')
					},
					index: {
						className: 'lg:w-[50%]' // scale-[1.5]'
					},
					backgroundImg: { className: 'scale-[3]' }
				}}
				wrapper={{
					className: 'lg:flex-row-reverse lg:justify-center',
					variants: { flexDir: 'col-reverse-lg:row' }
				}}
			/>
		</section>
	);
};

export default KnockProductShowcaseSection;
