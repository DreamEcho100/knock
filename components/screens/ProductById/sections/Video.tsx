import CustomNextImage from '@components/shared/common/CustomNextImage';
import type { IProductByIdPageProps } from '@pages/products/[productId]';

const VideoSection = ({}: // video
{
	// video: IProductByIdPageProps['product']['video'];
}) => {
	return (
		<section className='relative bg-primary-1 section-p-v1'>
			<CustomNextImage
				src='/images/Rectangle 46.png'
				width={200}
				height={200}
				className='pointer-events-none select-none aspect-square absolute w-1/2 top-0 right-0 scale-150 -translate-y-[30%%] -translate-x-[40%]'
			/>
			{/* <div className='relative mx-auto my-24 flex flex-col gap-8'>
				<header className='text-center'>
					<h2 className='text-h3 font-semibold text-primary-1 capitalize'>
						watch {video.title}
					</h2>
				</header>
				<div className='flex items-center justify-center'>
					<iframe
						width='800'
						height='400'
						src={video.src}
						title={video.title || 'YouTube video player'}
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
						className='overflow-hidden rounded-2xl'
					></iframe>
				</div>
			</div> */}
			{/* <video src={video.src} poster={video.posterSrc} controls></video> */}
		</section>
	);
};

export default VideoSection;
