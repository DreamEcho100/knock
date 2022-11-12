import CustomNextImage from '@components/shared/common/CustomNextImage';
import KnockTrademark from '@components/shared/core/KnockTrademark';

const HeroSection = () => {
	return (
		<section className='bg-primary-1 section-p-v1 leading-[1] sm:leading-[1.7]'>
			<div
				className='overflow-hidden
					relative flex items-center justify-center text-center text-primary-1 h-screen min-h-fit max-h-[30rem]'
			>
				<CustomNextImage
					src='/images/Group 179.png'
					width={800}
					height={800}
					priority
					className='absolute top-0 right-0 left-0 bottom-0 w-full h-full object-contain'
					style={{ transform: 'translate(8%, 5%) scale(1.5)' }}
				/>
				<div className='relative flex flex-col items-center justify-center text-center gap-4 text-primary-2'>
					<h1 className='font-bold text-h2 uppercase text-primary-1'>
						DRUMS <br />
						<div className='flex flex-wrap items-center justify-center text-center'>
							THAT&nbsp;
							<KnockTrademark />
						</div>
					</h1>
					<p className='text-[1rem] sm:text-3xl max-w-[800px]'>
						Designed from scratch by DECAP. Premium quality, groundbreaking as
						always.
					</p>
					<p className='text-[1rem] sm:text-3xl flex flex-wrap items-center justify-center text-center'>
						These drums &nbsp;
						<KnockTrademark />.
					</p>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
