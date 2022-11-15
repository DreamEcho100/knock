import Button from '@components/shared/core/Button';
import KnockTrademark from '@components/shared/core/KnockTrademark';

import { useAddKnockPluginToCartButtonProps } from './utils/hookes';

import type { IKnockClipperPageProps } from '@pages/knock_clipper';
import { priceCurrencyFormatter } from '@utils/core/shopify';
import CustomNextImage from '@components/shared/common/CustomNextImage';
const HeroSection = ({
	knockClipperPlugin
}: {
	knockClipperPlugin: IKnockClipperPageProps['knockClipperPlugin'];
}) => {
	const addKnockPluginToCartButtonProps = useAddKnockPluginToCartButtonProps({
		knockClipperPlugin,
		text: (
			<>
				Buy it now&nbsp;
				{knockClipperPlugin?.variants[0] &&
					knockClipperPlugin.variants[0]?.compareAtPrice?.amount && (
						<del className='text-bg-secondary-2 line-through'>
							{priceCurrencyFormatter(
								knockClipperPlugin.variants[0].compareAtPrice.amount,
								knockClipperPlugin.variants[0].compareAtPrice.currencyCode
							)}
						</del>
					)}
			</>
		)
	});

	return (
		<section className='bg-primary-1 section-p-v1 section-h-v1'>
			<div className='h-full flex items-center justify-center flex-col text-center'>
				<div className='relative flex items-center justify-center max-w-[900px]'>
					<CustomNextImage
						src='/images/Rectangle 48.png'
						width={1000}
						height={1000}
						priority
						className='pointer-events-none absolute top-0 right-0 left-0 bottom-0 w-full h-full object-contain scale-75'
						style={{ transform: 'translate(8%, -2%) scale(2)' }}
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
				<h2 className='text-h2 font-semibold text-primary-1 mt-4 mb-4 flex flex-wrap justify-center'>
					<KnockTrademark />
					Clipper
				</h2>
				<p className='mb-6 text-h5 sm:leading-10'>
					Adjustable hard & soft clipper module from KNOCK.
				</p>
				<div className='flex items-center justify-center relative'>
					<Button
						className='capitalize  text-h6'
						{...addKnockPluginToCartButtonProps}
					/>
					<span className='p-2' />{' '}
					{knockClipperPlugin?.variants[0] &&
						knockClipperPlugin.variants[0]?.price?.amount && (
							<span className='text-primary-1 font-semibold'>
								{priceCurrencyFormatter(
									knockClipperPlugin.variants[0].price.amount,
									knockClipperPlugin.variants[0].price.currencyCode
								)}
							</span>
						)}
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
