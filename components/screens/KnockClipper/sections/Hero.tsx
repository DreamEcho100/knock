import KnockTrademark from '@components/shared/core/KnockTrademark';

import type { IKnockClipperPageProps } from '@pages/knock_clipper';
import CustomNextImage from '@components/shared/common/CustomNextImage';
import AddItemOnHeroSectionButton from '@components/shared/core/AddItemOnHeroSectionButton';
const HeroSection = ({
	knockClipperPlugin
}: {
	knockClipperPlugin: IKnockClipperPageProps['knockClipperPlugin'];
}) => {
	return (
		<section className='bg-primary-1 section-p-v1 section-h-v1'>
			<div className='h-full flex items-center justify-center flex-col text-center'>
				<div className='relative flex items-center justify-center max-w-[900px] mb-4'>
					<CustomNextImage
						src='/images/Rectangle 48.png'
						width={1000}
						height={1000}
						priority
						className='pointer-events-none absolute top-0 right-0 left-0 bottom-0 w-full h-full object-contain scale-75 select-none'
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
				<p className='mb-8 text-h5 '>
					Adjustable hard & soft clipper module from KNOCK.
				</p>
				<AddItemOnHeroSectionButton product={knockClipperPlugin} />
			</div>
		</section>
	);
};

export default HeroSection;
