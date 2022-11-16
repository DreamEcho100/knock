// interface Props {}

import { ProductCardWithDetails } from '@components/shared/core/Card/product/default';
import { IDrumsThatKnockPageProps } from '@pages/drums-that-knock';

import { getIdFromGid } from '@utils/core/shopify';
import { useMemo } from 'react';

import { IProduct } from 'types';

const productsNames = [
	'Complete Knock Bundle v2 (All Digital Products)',
	'DRUMS THAT KNOCK X',
	'Drums That Knock Free Vol. 1 (Free Download)',
	'Drums That Knock Vol. 9',
	'Drums That Knock Vol. 8',
	'Drums That Knock Vol. 7',
	'Drums That Knock Vol. 6',
	'Drums That Knock Vol. 5',
	'Drums That Knock Vol. 4',
	'Drums That Knock Vol. 3',
	'Drums That Knock Vol. 2',
	'Drums That Knock Vol. 1',
	'Melodies That Knock Vol. 2',
	'Melodies That Knock Vol. 1',
	'DECAP Ableton Live Masterclass'
];

const productsNamesObj = (() => {
	const obj: Record<string, number> = {};

	productsNames.forEach((item, index) => (obj[item] = index));

	return obj;
})();

const DigitalProductsSection = ({
	products
}: {
	products: IDrumsThatKnockPageProps['products'];
}) => {
	const rearrangedProducts = useMemo(() => {
		const itemsNotFound: typeof products = [];
		const foundItems: typeof products = [];

		products.forEach((item) => {
			if (item.title in productsNamesObj)
				return (foundItems[productsNamesObj[item.title]] = item);
			itemsNotFound.push(item);
		});

		return [...foundItems.filter(Boolean), ...itemsNotFound];
	}, [products]);

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
				{rearrangedProducts.map((item) => (
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
