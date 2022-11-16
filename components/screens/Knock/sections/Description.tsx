import Description from '@components/shared/core/Description';

const DescriptionSection = () => {
	return (
		<section className='bg-primary-2 section-p-v1'>
			<Description variants={{ 'max-w': 'none' }} className='max-w-[600px]'>
				KNOCK is the last plugin you will ever need to make your drums slap and
				punch through your mix. This plugin was meticulously crafted by platinum
				producer & award winning sound designer, DECAP. It is inspired by the
				signature sound of his popular drum kit series DRUMS THAT KNOCK, which
				has helped shaped the sonics of modern music.
			</Description>
		</section>
	);
};

export default DescriptionSection;
