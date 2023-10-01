'use client';
import KnockTrademark from '~/app/components/shared/core/KnockTrademark';
import ProductShowcase from '~/app/components/shared/core/ProductShowcase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type IProduct } from '~/types';

const KnockProductShowcaseSection = ({
	knockPlugin,
	data,
}: {
	knockPlugin: IProduct;
	data: any;
}) => {
	const router = useRouter();
	return (
		<section className="bg-primary-1 text-primary-2 section-p-v1">
			<ProductShowcase
				product={knockPlugin}
				textContainer={{
					h2: {
						children: (
							<Link href={data.buttonUrl} className="flex flex-wrap">
								{data.h2 ? <h2>{data.h2}&nbsp; </h2> : '' || ''}
								<KnockTrademark tradeMark={data.tradeMark} />
							</Link>
						),
					},
					p: {
						children: data.p,
						className: 'lg:max-w-[410px]',
					},
					button: {
						children: data.button,
						onClick: () => {
							return;
						},
						href: data.buttonUrl,
					},
				}}
				imageContainer={{
					mainImg: {
						// src: '/images/534aaf62a986c03ee09ee62a138d3845.gif',
						src: process.env.NEXT_PUBLIC_KNOCK_URL_API + data.imageUrl,
						alt:
							(knockPlugin.images[0] && knockPlugin.images[0]?.altText) ?? '',
						className: 'lg:px-[5%] cursor-pointer',
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onClick: () => router.push(data.buttonUrl || '/'),
					},
					index: {
						className: 'lg:w-[50%]', // scale-[1.5]'
					},
					backgroundImg: { className: 'scale-[3]' },
				}}
				wrapper={{
					className: 'lg:flex-row-reverse lg:justify-center',
					variants: { flexDir: 'col-reverse-lg:row' },
				}}
			/>
		</section>
	);
};

export default KnockProductShowcaseSection;
