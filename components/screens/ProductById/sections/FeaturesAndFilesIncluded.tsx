import { IProductByIdPageProps } from '@pages/products/[productId]';
import TwoCardContainer from '@components/shared/core/TwoCardContainer';

const FeaturesAndFilesIncludedSection = ({}: // features,
// filesIncluded
{
	// features: IProductByIdPageProps['product']['features'];
	// filesIncluded: IProductByIdPageProps['product']['filesIncluded'];
}) => {
	return (
		<section className='bg-primary-1  section-p-v1'>
			{/* <TwoCardContainer
				items1={features}
				items2={filesIncluded.details}
				items2HeaderText={`files included ${filesIncluded.count}:`}
				items2ListProps={{
					style: {
						display: 'grid',
						// gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
						gridTemplateColumns: '1fr 1fr',
						gap: '1rem',
						whiteSpace: 'break-spaces'
					},
					className: 'text-[90%]'
				}}
			/> */}
		</section>
	);
};

export default FeaturesAndFilesIncludedSection;
