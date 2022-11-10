import type { IProductByIdPageProps } from '@pages/products/[productId]';

import MdToHTMLFormatter from '@components/shared/common/Format/MdToHTML';

import classes from '@styles/content.module.css';
import Description from '@components/shared/core/Description';

const DescriptionSection = ({
	description
}: {
	description: IProductByIdPageProps['product']['description'];
}) => {
	return (
		<section
			className='bg-primary-1 p-8 
				sm:py-20'
		>
			<Description>{description}</Description>
		</section>
	);
};

export default DescriptionSection;
