import KnockTrademark from '@components/shared/core/KnockTrademark';

import type { IKnockClipperPageProps } from '@pages/knock-clipper';
import CustomNextImage from '@components/shared/common/CustomNextImage';
import AddItemOnHeroSectionButton from '@components/shared/core/AddItemOnHeroSectionButton';
import { type CSSProperties } from 'react';
const HeroSection = ({
	knockClipperPlugin
}: {
	knockClipperPlugin: IKnockClipperPageProps['knockClipperPlugin'];
}) => {
	return (
		<section
			className='bg-primary-1 section-p-v1 section-h-v1'
			style={
				{
					'--pt-multi': 1.3,
					'--pb-multi': 2,
					'--h': 'fit-content',
					'--max-h': 'fit-content'
				} as CSSProperties
			}
		>
			<div className='h-full flex items-center justify-center flex-col text-center'>
				<div className='relative flex items-center justify-center max-w-[900px] mb-8'>
					<CustomNextImage
						src='/images/Rectangle 48.png'
						width={700}
						height={700}
						priority
						className='pointer-events-none select-none absolute top-0 right-0 left-0 bottom-0 w-full h-full object-contain scale-75'
						style={{ transform: 'translate(18%, 2%) scale(2.4, 2)' }}
					/>

					<CustomNextImage
						src='/images/abc59a63fe5ed68da58bff746fd14cce.png'
						width={400}
						height={400}
						priority
						unoptimized
						className='object-cover relative'
						style={{ aspectRatio: '16 / 16' }}
					/>
				</div>
				<h2 className='text-h3 font-semibold text-primary-1 mt-4 mb-3 flex flex-wrap justify-center uppercase'>
					<KnockTrademark />
					Clipper
				</h2>
				<p className='text-primary-2 mt-2 mb-5 leading-6 max-w-[350px] sm:text-[1.3rem]'>
					Adjustable hard & soft clipper module from KNOCK.
				</p>
				<AddItemOnHeroSectionButton
					product={knockClipperPlugin}
					buttonProps={{ children: 'Add To Cart' }}
				/>
			</div>
		</section>
	);
};

export default HeroSection;
