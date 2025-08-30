'use client';
import KnockTrademark from '~/app/_components/shared/core/KnockTrademark';
import ProductShowcase from '~/app/_components/shared/core/ProductShowcase';
import { useRouter } from 'next/navigation';

const OneProductShowCaseSection = ({ data }: { data: any }) => {
	const router = useRouter();

	return (
		<section className="bg-primary-2 text-primary-2 section-p-v1">
			<ProductShowcase
				textContainer={{
					h2: {
						children: (
							<>
								<KnockTrademark tradeMarkPrefix={data.tradeMark} />
								{data.h2}
							</>
						),
					},
					p: {
						children: data.p,
						className: 'text-h6 max-w-[300px]',
					},
					button: {
						children: data ? data.button : false,
						href: data ? data.buttonUrl : '/',
					},
				}}
				imageContainer={{
					mainImg: {
						src: data
							? process.env.NEXT_PUBLIC_KNOCK_URL_API + data.imageUrl
							: false,
						alt: '',
						onClick: () => router.push(data ? data.buttonUrl : '/'),
						className: 'cursor-pointer',
						priority: true,
					},
					backgroundImg: false,
				}}
				wrapper={{
					className: 'lg:justify-center',
					variants: { flexDir: 'col-reverse-lg:row' },
				}}
			/>
		</section>
	);
};

export default OneProductShowCaseSection;
