import Description from '@components/shared/core/Description';
import KnockTrademark from '@components/shared/core/KnockTrademark';

const AboutSection = () => {
	return (
		<section className='bg-primary-1 section-p-v1'>
			<div
				className='
					flex gap-4 flex-col items-center justify-center text-center'
			>
				<h2 className='text-h2 text-primary-1 capitalize font-semibold flex flex-wrap justify-center'>
					MAKE YOUR DRUMS&nbsp;
					<KnockTrademark />
				</h2>
				<Description>
					DECAP is a Billboard Top 10, platinum-certified producer, sound
					designer, and the creator of Drums That Knock. The series garnered
					over 5 million downloads, and it has helped shape the sound of modern
					rap, r&b, and pop music. Drums That Knock are being used on grammy
					winning songs, and trusted by producers all over the world.
				</Description>
			</div>
		</section>
	);
};

export default AboutSection;
