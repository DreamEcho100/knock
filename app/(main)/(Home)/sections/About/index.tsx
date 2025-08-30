import Description from '~/app/_components/shared/core/Description';
import KnockTrademark from '~/app/_components/shared/core/KnockTrademark';

const AboutSection = ({ data }: { data: any }) => {
	return (
		<section className="bg-primary-1 section-p-v1">
			<div
				className="
					flex gap-4 flex-col items-center justify-center text-center"
			>
				<h2 className="text-h3 text-primary-1 capitalize font-semibold flex flex-wrap justify-center">
					{data.h2}&nbsp;
					<KnockTrademark tradeMarkPrefix={data.tradeMark} />
				</h2>
				<Description>{data.p}</Description>
			</div>
		</section>
	);
};

export default AboutSection;
