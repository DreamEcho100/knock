import type { IKnockClipperPageProps } from '@pages/knock_clipper';
import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';

export const useAddKnockPluginToCartButtonProps = ({
	knockClipperPlugin,
	text
}: {
	knockClipperPlugin: IKnockClipperPageProps['knockClipperPlugin'];
	text?: string;
}) => {
	const addProductsToCheckoutAndCart = useAddProductsToCheckoutAndCart();

	return {
		onClick: () =>
			addProductsToCheckoutAndCart.mutate({
				products: [{ ...knockClipperPlugin, quantity: 1 }]
			}),

		children: text ? (
			text
		) : knockClipperPlugin.variants[0].compareAtPrice ? (
			<>
				Buy it now{' '}
				<span>
					{knockClipperPlugin.variants[0].price.amount}&nbsp;
					{knockClipperPlugin.variants[0].price.currencyCode}
				</span>
				&nbsp;
				<del className='text-bg-secondary-2'>
					{knockClipperPlugin.variants[0].compareAtPrice.amount}&nbsp;
					{knockClipperPlugin.variants[0].compareAtPrice.currencyCode}
				</del>
			</>
		) : (
			`Buy it now ${knockClipperPlugin.variants[0].price.amount}${knockClipperPlugin.variants[0].price.currencyCode}`
		)
	};
};
