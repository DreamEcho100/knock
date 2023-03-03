import KnockTrademark from '@components/shared/core/KnockTrademark';
import ProductShowcase from '@components/shared/core/ProductShowcase';
import { useRouter } from 'next/router';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const OneProductShowCaseSection = ({ data }: { data: any }) => {
	const router = useRouter();

	return (
		<section className='bg-primary-2 text-primary-2 section-p-v1'>
			<ProductShowcase
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
						className: 'text-h6 max-w-[300px]'
					},
					button: {
						children: data ? data.button : false,
						href: data ? data.buttonUrl : '/'
					}
				}}
				imageContainer={{
					mainImg: {
						src: data
							? process.env.NEXT_PUBLIC_KNOCK_URL_API + data.imageUrl
							: false,
						alt: '',
						onClick: () => router.push(data ? data.buttonUrl : '/'),
						className: 'cursor-pointer',
						priority: true
					},
					backgroundImg: false
				}}
				wrapper={{
					className: 'lg:justify-center',
					variants: { flexDir: 'col-reverse-lg:row' }
				}}
			/>
		</section>
	);
};

export default OneProductShowCaseSection;
