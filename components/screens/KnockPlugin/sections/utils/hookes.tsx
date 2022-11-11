import type { IKnockPluginPageProps } from '@pages/knock-plugin';
import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';

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
					{knockPlugin.variants[0].price.amount}&nbsp;
					{knockPlugin.variants[0].price.currencyCode}
				</span>
				<del>
					{knockPlugin.variants[0].compareAtPrice.amount}&nbsp;
					{knockPlugin.variants[0].compareAtPrice.currencyCode}
				</del>
			</>
		) : (
			`Buy it now ${knockPlugin.variants[0].price.amount}${knockPlugin.variants[0].price.currencyCode}`
		)
	};
};
