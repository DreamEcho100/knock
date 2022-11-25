import Description from '@components/shared/core/Description';

const DescriptionSection = () => {
	return (
		<section className='bg-primary-2 section-p-v1'>
			<Description variants={{ 'max-w': 'none' }} className='max-w-[610px]'>
				KNOCK Clipper is a premium quality, user adjustable hard / soft clipper
				designed by DECAP. It is the CLIP module from his acclaimed plugin,
				KNOCK. It is inspired by the signature sound of his popular drum kit
				series DRUMS THAT KNOCK, which has helped shaped the sonics of modern
				music.
			</Description>
		</section>
	);
};

export default DescriptionSection;
