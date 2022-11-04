import KnockTrademark from '@components/shared/core/KnockTrademark';
import Image from 'next/image';

const HeroSection = () => {
	return (
		<section className='bg-primary-1'>
			<div
				className='overflow-hidden
					relative flex items-center justify-center text-primary-1 p-8 py-16 h-screen max-h-[30rem]'
			>
				<Image
					src='/images/Group 179.png'
					alt=''
					width={800}
					height={800}
					priority
					className='absolute top-0 right-0 left-0 bottom-0 w-full h-full object-contain'
					style={{ transform: 'translate(8%, 5%) scale(1.5)' }}
				/>
				<div className='relative flex flex-col items-center justify-center text-center gap-4 text-primary-2'>
					<h1 className='font-bold text-h2 uppercase text-primary-1'>
						DRUMS <br />
						<div className='flex flex-wrap'>
							THAT&nbsp;
							<KnockTrademark />
						</div>
					</h1>
					<p className='text-[2rem] max-w-[800px]'>
						Designed from scratch by DECAP. Premium quality, groundbreaking as
						always.
					</p>
					<p className='text-[2rem] flex flex-wrap'>
						These drums &nbsp;
						<KnockTrademark />.
					</p>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
