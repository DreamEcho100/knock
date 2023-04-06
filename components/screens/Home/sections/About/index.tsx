import Description from '@components/shared/core/Description';
import KnockTrademark from '@components/shared/core/KnockTrademark';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const AboutSection = ({ data }: { data: any }) => {
	return (
		<section className='bg-primary-1 section-p-v1'>
			<div
				className='
					flex gap-4 flex-col items-center justify-center text-center'
			>
				{data ? (
					<h2 className='text-h3 text-primary-1 capitalize font-semibold flex flex-wrap justify-center'>
						{data.h2}&nbsp;
						<KnockTrademark tradeMark={data.tradeMark} />
					</h2>
				) : (
					<div className='w-[100%] h-[30px]  md:w-[40%] '>
						<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
							<Skeleton
								width={'100%'}
								count={1}
								height={'100%'}
								className={'rounded-3xl mt-5 '}
							/>
						</SkeletonTheme>
					</div>
				)}
				{data ? (
					<Description>{data.p}</Description>
				) : (
					<div className='w-[100%]  md:w-[40%] '>
						<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
							<Skeleton
								width={'100%'}
								count={1}
								height={250}
								className={'rounded-3xl mt-5 '}
							/>
						</SkeletonTheme>
					</div>
				)}
			</div>
		</section>
	);
};

export default AboutSection;
