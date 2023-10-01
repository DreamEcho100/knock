import Description from '~/app/components/shared/core/Description';

const DescriptionSection = ({ data }: { data: any }) => {
	return (
		<section className="bg-primary-2 section-p-v1">
			<Description variants={{ 'max-w': 'none' }} className="max-w-[610px]">
				{data.p}
			</Description>
		</section>
	);
};

export default DescriptionSection;
