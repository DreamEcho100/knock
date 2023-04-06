import Description from '@components/shared/core/Description';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const DescriptionSection = ({ data }: { data: any }) => {
	return (
		<section className='bg-primary-2 section-p-v1'>
			{data ? (
				<Description variants={{ 'max-w': 'none' }} className='max-w-[610px]'>
					{data.p}
				</Description>
			) : (
				<div className='flex items-center justify-center'>
					<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
						<Skeleton
							width={500}
							count={1}
							height={300}
							className={'rounded-3xl '}
						/>
					</SkeletonTheme>
				</div>
			)}
		</section>
	);
};

export default DescriptionSection;
