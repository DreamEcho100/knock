import CustomNextImage from '@components/shared/common/CustomNextImage';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const features = [
	{
		title: 'PUNCH',
		description:
			'Transient shaper, amplifies the attack of your drums, making them more snappy and punchy. Add a touch of Punch to bring your drum tracks to life. Great for drum loops or one shots.',
		image: {
			src: '/images/knock/I1_266x266 1.png',
			alt: ''
		}
	},
	{
		title: 'SATURATE',
		description:
			'Adds harmonic distortion while compensating perceived loudness volume. Choose from three selectable modes (soft, medium, hard). Perfect for 808s, one shots, or drum loops.',
		image: {
			src: '/images/knock/Saturate_266x266 1.png',
			alt: ''
		}
	},
	{
		title: 'SUB',
		description:
			'Detects when a kick drum is present, and generates a layered sub frequency tone, giving your kick a deep low end presence. Select the pitch of your sub tone. Perfect for breakbeats, and tuning your kick drum to the key of your song.',
		image: {
			src: '/images/knock/SUB_266x266 1.png',
			alt: ''
		}
	},
	{
		title: 'AIR',
		description:
			'Adds smooth, transparent top end to your drum tracks without even a hint of harshness. There are two user selectable modes (vintage and clean).',
		image: {
			src: '/images/knock/AIR_266x266 1.png',
			alt: ''
		}
	},
	{
		title: 'CLIP',
		description:
			'A user adjustable hard & soft clipper. Push your drums hard without clipping to give your drums a warm, aggressive tone reminiscent of pushing vintage analogue gear into "the red". Select a harder clip curve for a more aggressive tone, or a softer clip curve for a more rounded tone.',
		image: {
			src: '/images/knock/CLERP_266x266 1.png',
			alt: ''
		}
	}
];

const ShapesYourDrumsSection = ({ data }: { data: any }) => {


	return (
		<section className=' text-primary-2 relative bg-primary-1 section-p-v1'>
			<div className='absolute top-0 right-0 bottom-0 left-0 w-full h-full max-w-none overflow-hidden'>
				<CustomNextImage
					src='/images/Pattern[1].png'
					width={800}
					height={800}
					className='pointer-events-none select-none left-0 w-full h-full object-cover scale-[2]'
				/>
			</div>
			<div
				className='absolute top-0 right-0 bottom-0 left-0 w-full h-full max-w-none'
				style={{
					backgroundImage:
						'radial-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9), rgba(0, 0, 0))'
				}}
			>
				<CustomNextImage
					src='/images/Rectangle 105.png'
					width={800}
					height={800}
					className='pointer-events-none select-none left-0 w-full h-full'
				/>
			</div>
			<div
				className='max-w-screen-xl
					relative flex flex-col gap-10 sm:gap-20'
			>
				<header className='text-center'>
					{data ? (
						<h2 className='text-h3 font-semibold uppercase text-primary-1'>
							{data.h2}
						</h2>
					) : (
						<div className='flex items-center justify-center'>
							<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
								<Skeleton
									width={300}
									count={1}
									height={40}
									className={'rounded-3xl '}
								/>
							</SkeletonTheme>
						</div>
					)}
				</header>
				<div className='flex flex-wrap items-baseline justify-center gap-12'>
					{data.third_section_knock_page_content?.map((item: any) => (
						<div
							key={item.id}
							className='text-center w-[18rem] max-w-full flex flex-col items-center justify-start gap-6'
						>
							{item ? (
								<CustomNextImage
									src={process.env.NEXT_PUBLIC_KNOCK_URL_API + item.image}
									width={175}
									height={175}
									className='aspect-square max-w-[10rem]'
								/>
							) : (
								<div className='flex items-center justify-center'>
									<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
										<Skeleton
											width={150}
											count={1}
											height={150}
											className={'rounded-3xl '}
											style={{ borderRadius: '50%' }}
										/>
									</SkeletonTheme>
								</div>
							)}
							{item ? (
								<p className='font-bold'>{item.h3}</p>
							) : (
								<div className='flex items-center justify-center'>
									<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
										<Skeleton width={150} count={1} height={30} />
									</SkeletonTheme>
								</div>
							)}
							{item ? (
								<p className='mt-[-0.75rem]'>{item.p}</p>
							) : (
								<div className='flex items-center justify-center'>
									<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
										<Skeleton width={200} count={1} height={100} />
									</SkeletonTheme>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ShapesYourDrumsSection;
