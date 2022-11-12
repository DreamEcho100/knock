import type { IKnockPluginPageProps } from '@pages/knock';
import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';
import { priceCurrencyFormatter } from '@utils/core/shopify';

export const useAddKnockPluginToCartButtonProps = ({
	knockPlugin,
	text
}: {
	knockPlugin: IKnockPluginPageProps['knockPlugin'];
	text?: string;
}) => {
	const addProductsToCheckoutAndCart = useAddProductsToCheckoutAndCart();

	return {
		onClick: () =>
			addProductsToCheckoutAndCart.mutate({
				products: [{ ...knockPlugin, quantity: 1 }]
			}),

		children: text ? (
			text
		) : knockPlugin.variants[0].compareAtPrice ? (
			<>
				Buy it now{' '}
				<span className='bg-secondary-2'>
					{priceCurrencyFormatter(
						knockPlugin.variants[0].price.amount,
						knockPlugin.variants[0].price.currencyCode
					)}
				</span>
				<del>
					{priceCurrencyFormatter(
						knockPlugin.variants[0].compareAtPrice.amount,
						knockPlugin.variants[0].compareAtPrice.currencyCode
					)}
				</del>
			</>
		) : (
			`Buy it now ${priceCurrencyFormatter(
				knockPlugin.variants[0].price.amount,
				knockPlugin.variants[0].price.currencyCode
			)}`
		)
	};
};
