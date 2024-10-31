import KnockTrademark from '~/app/_components/shared/core/KnockTrademark';
import CustomNextImage from '~/app/_components/shared/common/CustomNextImage';
import AddItemOnHeroSectionButton from '~/app/_components/shared/core/AddItemOnHeroSectionButton';
import { type CSSProperties } from 'react';
import type { Product } from '~/libs/shopify/types';

const HeroSection = ({
	knockClipperPlugin,
	knockClipperMainSection,
}: {
	knockClipperPlugin: Product;
	knockClipperMainSection: any;
}) => {
	return (
		<section
			className="bg-primary-1 section-p-v1 section-h-v1"
			style={
				{
					'--pt-multi': 1.3,
					'--pb-multi': 2,
					'--h': 'fit-content',
					'--max-h': 'fit-content',
				} as CSSProperties
			}
		>
			<div className="h-full flex items-center justify-center flex-col text-center">
				<div className="relative flex items-center justify-center max-w-[900px] mb-8">
					<CustomNextImage
						src="/images/Rectangle 48.png"
						width={700}
						height={700}
						priority
						className="pointer-events-none select-none absolute top-0 right-0 left-0 bottom-0 w-full h-full object-contain scale-75"
						style={{ transform: 'translate(18%, 2%) scale(2.4, 2)' }}
					/>

					<CustomNextImage
						src={
							process.env.NEXT_PUBLIC_KNOCK_URL_API +
							knockClipperMainSection.main.mainImageUrl
						}
						width={400}
						height={400}
						priority
						className="object-cover relative"
						style={{ aspectRatio: '16 / 16' }}
					/>
				</div>
				<h2 className="text-h3 font-semibold text-primary-1 mt-4 mb-3 flex flex-wrap justify-center uppercase">
					<KnockTrademark tradeMark={knockClipperMainSection.main.tradeMark} />
					{knockClipperMainSection.main.h2}
				</h2>
				<p className="text-primary-2 mt-2 mb-5 leading-6 max-w-[350px] sm:text-[1.3rem]">
					{knockClipperMainSection.main.p}
				</p>
				<AddItemOnHeroSectionButton
					product={knockClipperPlugin}
					buttonProps={{
						children: knockClipperMainSection
							? knockClipperMainSection.main.buttonText
							: false,
					}}
				/>
			</div>
		</section>
	);
};

export default HeroSection;
