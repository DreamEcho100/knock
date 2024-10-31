'use client';
import ProductShowcase from '~/app/_components/shared/core/ProductShowcase';
import { BsApple } from 'react-icons/bs';

export default function AvailableOnIOSSection({ data }: { data: any }) {
	return (
		<section className="bg-primary-1 text-primary-2 section-p-v1">
			<ProductShowcase
				textContainer={{
					h2: { children: data.h2 },
					p: { children: data.p },
					button: {
						children: (
							<>
								<BsApple /> {data.button}
							</>
						),
						onClick: () => window.open(data.buttonUrl || '/', '_blank'),
					},
				}}
				imageContainer={{
					mainImg: {
						src: process.env.NEXT_PUBLIC_KNOCK_URL_API + data.imageUrl,
						alt: '',
						className: 'scale-[1.4]',
					},
					backgroundImg: {
						src: '/images/Rectangle 48.png',
						variants: { translateY: null, translateX: 'small' },
					},
				}}
				wrapper={{
					className: 'gap-4 lg:justify-center lg:gap-10',
					variants: { flexDir: 'col-reverse-lg:row-reverse' },
				}}
			/>
		</section>
	);
}
