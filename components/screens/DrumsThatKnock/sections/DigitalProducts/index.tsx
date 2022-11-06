// interface Props {}

import { ProductCardWithDetails } from '@components/shared/core/Card/product/default';

import { getIdFromGid } from '@utils/core/shopify';

import { IProduct } from 'types';

const DigitalProductsSection = ({ products }: { products: IProduct[] }) => {
	return (
		<section className='bg-primary-1'>
			<div
				className='relative px-8 py-16 md:px-16 justify-items-center'
				style={{
					zIndex: 2,
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
					gap: '3rem 2rem'
				}}
			>
				{products.map((item) => (
					<ProductCardWithDetails
						price={0}
						key={item.id}
						link={{
							children: item.title,
							href: `/products/${getIdFromGid(item.id)}`
						}}
						{...item}
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
