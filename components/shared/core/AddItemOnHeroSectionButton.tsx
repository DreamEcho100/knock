import { IProduct } from 'types';
import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';
import { priceCurrencyFormatter } from '@utils/core/shopify';
import Button from './Button';
import { useMemo } from 'react';
import { cx } from 'class-variance-authority';

const AddItemOnHeroSectionButton = ({
	product,
	buttonProps: _buttonProps = {},
	hideButton
}: {
	product: IProduct;
	buttonProps?: Parameters<typeof Button>[0];
	hideButton?: boolean;
}) => {
	const addProductsToCheckoutAndCart = useAddProductsToCheckoutAndCart();

	const buttonProps = {
		onClick: () =>
			addProductsToCheckoutAndCart.mutate({
				products: [{ ...product, quantity: 1 }]
			}),
		children: 'Buy it now',
		className: 'capitalize text-h6',
		..._buttonProps
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
		<div className='flex flex-col gap-[0.35rem] items-center justify-center relative'>
			<div className='flex flex-wrap gap-[0.35rem] text-[95%]'>
				{prices.compareToPrice && (
					<del className='line-through font-normal'>
						{prices.compareToPrice}
					</del>
				)}
				<span
					className={cx(
						prices.compareToPrice ? 'text-bg-secondary-2' : '',
						'font-semibold'
					)}
				>
					{prices.price}
				</span>
			</div>
			{!hideButton && <Button {...buttonProps} />}
		</div>
	);
};

export default AddItemOnHeroSectionButton;
