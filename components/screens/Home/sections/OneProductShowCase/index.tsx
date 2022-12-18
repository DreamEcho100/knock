import KnockTrademark from '@components/shared/core/KnockTrademark';
import ProductShowcase from '@components/shared/core/ProductShowcase';
import { useRouter } from 'next/router';

const OneProductShowCaseSection = () => {
	const router = useRouter();

	return (
		<section className='bg-primary-2 text-primary-2 section-p-v1'>
			<ProductShowcase
				textContainer={{
					h2: {
						children: (
							<>
								<KnockTrademark />
								Clipper
							</>
						)
					},
					p: {
						children: 'Adjustable hard + soft clipper module from KNOCK.',
						className: 'text-h6 max-w-[300px]'
					},
					button: { children: 'Explore it now', href: '/knock-clipper' }
				}}
				imageContainer={{
					mainImg: {
						src: '/images/knock-clipper.png',
						alt: '',
						onClick: () => router.push('/knock-clipper'),
						className: 'cursor-pointer',
						priority: true
					},
					backgroundImg: false
				}}
				wrapper={{
					className: 'flex-col-reverse lg:justify-center'
				}}
			/>
		</section>
	);
};

export default OneProductShowCaseSection;
