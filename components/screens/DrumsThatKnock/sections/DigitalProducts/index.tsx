// interface Props {}

import { ProductCardWithDetails } from '@components/shared/core/Card/product/default';
import { IDrumsThatKnockPageProps } from '@pages/drums-that-knock';

import { getIdFromGid } from '@utils/core/shopify';

import { IProduct } from 'types';

const DigitalProductsSection = ({
	products
}: {
	products: IDrumsThatKnockPageProps['products'];
}) => {
	return (
		<section className='bg-primary-1 section-p-v1'>
			<div
				className='relative justify-items-center'
				style={{
					zIndex: 2,
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
					gap: '3rem 1rem'
				}}
			>
				{products.map((item) => (
					<ProductCardWithDetails
						key={item.id}
						link={{
							children: item.title,
							href: `/products/${getIdFromGid(item.id)}`
						}}
						{...item}
						price={
							typeof item.variants[0].price.amount === 'string'
								? parseFloat(item.variants[0].price.amount)
								: item.variants[0].price.amount
						}
						toAddToCart
						productData={item}
						intent='bottomCorners'
					/>
				))}
			</div>
		</section>
	);
};

export default DigitalProductsSection;
