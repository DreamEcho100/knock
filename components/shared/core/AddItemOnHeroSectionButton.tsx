import { IProduct } from 'types';
import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';
import { priceCurrencyFormatter } from '@utils/core/shopify';
import Button from './Button';

const AddItemOnHeroSectionButton = ({ product }: { product: IProduct }) => {
	const addProductsToCheckoutAndCart = useAddProductsToCheckoutAndCart();

	const buttonProps = {
		onClick: () =>
			addProductsToCheckoutAndCart.mutate({
				products: [{ ...product, quantity: 1 }]
			})
	};

	if (product?.variants[0] && product.variants[0]?.compareAtPrice)
		return (
			<div className='flex items-center justify-center relative'>
				<Button className='capitalize text-h6' {...buttonProps}>
					Buy it now&nbsp;
					<del className='line-through font-normal'>
						{priceCurrencyFormatter(
							product.variants[0].compareAtPrice.amount,
							product.variants[0].compareAtPrice.currencyCode
						)}
					</del>
				</Button>
				<span className='p-1' />{' '}
				{product?.variants[0] && product.variants[0]?.price?.amount && (
					<span className='text-bg-secondary-2 font-semibold'>
						{priceCurrencyFormatter(
							product.variants[0].price.amount,
							product.variants[0].price.currencyCode
						)}
					</span>
				)}
			</div>
		);

	return (
		<Button className='capitalize  text-h6' {...buttonProps}>
			Buy it now{' '}
			{priceCurrencyFormatter(
				product.variants[0].price.amount,
				product.variants[0].price.currencyCode
			)}
		</Button>
	);
};

export default AddItemOnHeroSectionButton;
