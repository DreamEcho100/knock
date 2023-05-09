import CustomNextImage from '@components/shared/common/CustomNextImage';
import KnockTrademark from '@components/shared/core/KnockTrademark';

const HeroSection = ({ data }: { data: any }) => {
	return (
		<section className='bg-primary-1 section-p-v1 leading-[1] sm:leading-[1.7]'>
			<div className='relative py-4 my-6 flex items-center justify-center text-center text-primary-1 min-h-fit max-h-[30rem]'>
				<CustomNextImage
					src='/images/Group 179.png'
					width={800}
					height={800}
					priority
					className='absolute top-0 bottom-0 left-0 right-0 object-contain w-full h-full pointer-events-none select-none'
					style={{ transform: 'translate(5%, -3%) scale(2.8, 2.6)' }}
				/>
				<div className='relative flex flex-col items-center justify-center gap-4 py-10 text-center text-primary-2 sm:p-0'>
					<h1 className='font-semibold uppercase text-h2 text-primary-1'>
						{data && data.br ? data.br : ''}
						<span className='flex flex-wrap items-center justify-center text-center'>
							{data && data.h2 ? <>{data.h2}&nbsp;</> : ''}
							<KnockTrademark tradeMark={data ? data.tradeMark : ''} />
						</span>
					</h1>
					{data
						? data.p.map((el: any) =>
								el.tradeMark ? (
									<p
										key={el.id}
										className='text-[1rem] sm:text-2xl flex flex-wrap items-center justify-center text-center'
									>
										{el.text}&nbsp;
										<KnockTrademark tradeMark={el.tradeMark} />
									</p>
								) : (
									<p
										key={el.id}
										className='text-[1rem] sm:text-2xl max-w-[600px]'
									>
										{el.text}
									</p>
								)
						  )
						: ''}
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
