import Description from '~/app/_components/shared/core/Description';

export default function DescriptionSection({ data }: { data: any }) {
	return (
		<section className="bg-primary-2 section-p-v1">
			<Description
				variants={{ 'max-w': 'none' }}
				className="max-w-[600px] mx-auto"
			>
				{data.p}
			</Description>
		</section>
	);
}
