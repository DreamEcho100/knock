import { IProduct } from 'types';
import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';
import { priceCurrencyFormatter } from '@utils/core/shopify';
import Button from './Button';
import { useMemo } from 'react';

const AddItemOnHeroSectionButton = ({ product }: { product: IProduct }) => {
	const addProductsToCheckoutAndCart = useAddProductsToCheckoutAndCart();

	const buttonProps = {
		onClick: () =>
			addProductsToCheckoutAndCart.mutate({
				products: [{ ...product, quantity: 1 }]
			})
	};

	const prices = useMemo(() => {
		const prices: { price: string; compareToPrice?: string } = {
			price: priceCurrencyFormatter(
				product.variants[0].price.amount,
				product.variants[0].price.currencyCode
			),
			compareToPrice:
				product?.variants[0] && product.variants[0]?.compareAtPrice
					? priceCurrencyFormatter(
							product.variants[0].compareAtPrice.amount,
							product.variants[0].compareAtPrice.currencyCode
					  )
					: undefined
		};

		return prices;
	}, [product.variants]);

	return (
		<div className='flex flex-col mb-[-2ch] mt-[-2.5ch] items-center justify-center relative'>
			<span className='p-2' />{' '}
			<div className=''>
				{prices.compareToPrice && (
					<>
						&nbsp;
						<del className='line-through font-normal'>
							{prices.compareToPrice}
						</del>
						&nbsp;
					</>
				)}
				<span className='text-bg-secondary-2 font-semibold'>
					{prices.price}
				</span>
			</div>
			<Button className='capitalize text-h6' {...buttonProps}>
				Buy it now
			</Button>
		</div>
	);
};

export default AddItemOnHeroSectionButton;
