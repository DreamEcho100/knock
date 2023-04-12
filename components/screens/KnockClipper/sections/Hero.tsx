import KnockTrademark from '@components/shared/core/KnockTrademark';

import type { IKnockClipperPageProps } from '@pages/knock-clipper';
import CustomNextImage from '@components/shared/common/CustomNextImage';
import AddItemOnHeroSectionButton from '@components/shared/core/AddItemOnHeroSectionButton';
import { type CSSProperties } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getKnockClipperMainSection } from '@utils/core/API';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
const HeroSection = ({
	knockClipperPlugin
}: {
	knockClipperPlugin: IKnockClipperPageProps['knockClipperPlugin'];
}) => {
	const { data } = useQuery(
		['knockClipperMainSection'],
		getKnockClipperMainSection,
		{
			refetchOnWindowFocus: true
		}
	);

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

					{data && data.main ? (
						<CustomNextImage
							src={process.env.NEXT_PUBLIC_KNOCK_URL_API + data.main.mainImageUrl}
							width={400}
							height={400}
							priority
							unoptimized
							className='object-cover relative'
							style={{ aspectRatio: '16 / 16' }}
						/>
					) : (
						<div className='w-[300px] h-[200px] md:w-[500px] h-[300px]'>
							<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
								<Skeleton
									width={'100%'}
									count={1}
									height={'100%'}
									className={'rounded-3xl '}
								/>
							</SkeletonTheme>
						</div>
					)}
				</div>
				{data && data.main ? (
					<h2 className='text-h3 font-semibold text-primary-1 mt-4 mb-3 flex flex-wrap justify-center uppercase'>
						<KnockTrademark tradeMark={data.main.tradeMark} />
						{data.main.h2}
					</h2>
				) : (
					<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
						<Skeleton
							width={250}
							count={1}
							height={25}
							className={'rounded-3xl  '}
						/>
					</SkeletonTheme>
				)}
				{data && data.main ? (
					<p className='text-primary-2 mt-2 mb-5 leading-6 max-w-[350px] sm:text-[1.3rem]'>
						{data.main.p}
					</p>
				) : (
					<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
						<Skeleton
							width={150}
							count={1}
							height={20}
							className={'rounded-3xl mt-2 '}
						/>
					</SkeletonTheme>
				)}
				<AddItemOnHeroSectionButton
					product={knockClipperPlugin}
					buttonProps={{ children: data ? data.main.buttonText : false }}
				/>
			</div>
		</section>
	);
};

export default HeroSection;
