import CustomNextImage from '@components/shared/common/CustomNextImage';
import Button from '@components/shared/core/Button';
import KnockTrademark from '@components/shared/core/KnockTrademark';

const HeroSection = () => {
	return (
		<section className='bg-primary-1'>
			<div
				className=' overflow-hidden
				px-8 pt-24 pb-16 flex items-center justify-center flex-col text-center'
			>
				<div className='relative flex items-center justify-center max-w-[900px]'>
					<CustomNextImage
						src='/images/Group 179.png'
						width={800}
						height={800}
						priority
						className='absolute top-0 right-0 left-0 bottom-0 w-full h-full object-contain pointer-events-none'
						style={{ transform: 'translate(8%, -2%) scale(2)' }}
					/>

					<CustomNextImage
						src='/images/534aaf62a986c03ee09ee62a138d3845.gif'
						alt='knock plugin animation'
						width={800}
						height={800}
						priority
						unoptimized
						className='object-cover mb-6 w-11/12 relative'
					/>
				</div>
				<h2 className='text-h2 font-bold text-primary-1 mt-12 flex flex-wrap justify-center'>
					<KnockTrademark />
					PLUGIN
				</h2>
				<p className='mb-6 max-w-[350px]'>
					Make your drums KNOCK and punch through the mix.
				</p>
				<Button className='capitalize' href='/knock-plugin'>
					Explore it now
				</Button>
			</div>
		</section>
	);
};

export default HeroSection;
