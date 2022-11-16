import CustomNextImage from '@components/shared/common/CustomNextImage';
import Button from '@components/shared/core/Button';
import KnockTrademark from '@components/shared/core/KnockTrademark';

const HeroSection = () => {
	return (
		<section className='bg-primary-1 section-p-v1 section-h-v1'>
			<div className='h-full flex items-center justify-center flex-col gap-1 text-center'>
				<div className='relative flex items-center justify-center max-w-3xl'>
					<CustomNextImage
						src='/images/Group 179.png'
						width={800}
						height={800}
						priority
						className='absolute top-0 right-0 left-0 bottom-0 w-full h-full object-contain pointer-events-none'
						style={{ transform: 'translate(8%, -2%) scale(2.5)' }}
					/>

					<CustomNextImage
						src='/images/534aaf62a986c03ee09ee62a138d3845.gif'
						alt='knock plugin animation'
						width={800}
						height={800}
						priority
						unoptimized
						className='object-cover mb-6 w-3/4 relative'
					/>
				</div>
				<h1 className='text-h2 font-semibold text-primary-1 flex flex-wrap justify-center'>
					<KnockTrademark />
					PLUGIN
				</h1>
				<p className='mb-6 max-w-[300px]'>
					Make your drums KNOCK and punch through the mix.
				</p>
				<Button className='capitalize' href='/knock'>
					Explore it now
				</Button>
			</div>
		</section>
	);
};

export default HeroSection;
