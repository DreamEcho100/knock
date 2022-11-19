import TwoCardContainer from '@components/shared/core/TwoCardContainer';

const SystemRequirementsSection = ({
	...twoCardContainerProps
}: Parameters<typeof TwoCardContainer>[0]) => {
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

				<TwoCardContainer {...twoCardContainerProps} />
			</div>
		</section>
	);
};

export default SystemRequirementsSection;
