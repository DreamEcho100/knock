import TwoCardContainer from '@components/shared/core/TwoCardContainer';

const SystemRequirementsSection = () => {
	return (
		<section className='bg-primary-1 section-p-x-v1'>
			<div className='flex flex-col gap-2 sm:gap-6'>
				<header className='p-4 text-primary-2 text-center flex flex-col justify-center items-center gap-4 sm:gap-6'>
					<h2 className='text-h4 text-primary-1 uppercase font-semibold'>
						System Requirements
					</h2>
					<p className='text-h5'>
						Supported by all major DAWs in 64-bit VST3, AU and AAX format.
					</p>
				</header>

				<TwoCardContainer
					items1={[
						'9 OSX 10.12+ - AU, VST3, AAX (KNOCK Clipper is Fully compatible with both Mac OS Ventura and Apple M1 & M2.)',
						'Intel Core i5, i7, i9, Xeon, Apple M1',
						'8GB RAM required, 16GB recommended',
						'HDD Space requirements: Minimum of 500MB'
					]}
					items1HeaderText='Mac'
					items2={[
						'Intel Core i5, i7, i9, Xeon (all Gen 5 and above), AMD Quad Core',
						'Windows 8.1, 10 - 64 bit  VST3, AAX',
						'8GB RAM required, 16GB recommended',
						'HDD Space requirements: Minimum of 500MB'
					]}
					items2HeaderText='PC'
					backgroundImg={false}
				/>
			</div>
		</section>
	);
};

export default SystemRequirementsSection;
