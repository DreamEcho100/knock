// interface Props {}

import { ProductCardWithDetails } from '@components/shared/core/Card/product/default';
import { grtIdFromGid } from '@utils/core/shopify';

import fakeProductsData from 'data/fakeProducts';

import { IProduct } from 'types';

const DigitalProductsSection = ({ products }: { products: IProduct[] }) => {
	console.log('products', products);
	return (
		<section className='bg-primary-1'>
			<div
				className='relative sm:p-8 md:p-16 justify-items-center'
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
							href: `/products/${grtIdFromGid(item.id)}`
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
