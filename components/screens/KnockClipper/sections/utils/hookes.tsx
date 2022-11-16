import type { IKnockClipperPageProps } from '@pages/knock_clipper';
import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';
import { priceCurrencyFormatter } from '@utils/core/shopify';
import { ReactNode } from 'react-markdown/lib/react-markdown';

export const useAddKnockPluginToCartButtonProps = ({
	knockClipperPlugin,
	text
}: {
	knockClipperPlugin: IKnockClipperPageProps['knockClipperPlugin'];
	text?: ReactNode;
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
				<span className='text-bg-secondary-2'>
					{priceCurrencyFormatter(
						knockClipperPlugin.variants[0].price.amount,
						knockClipperPlugin.variants[0].price.currencyCode
					)}
				</span>
				&nbsp;
				<del className='line-through'>
					{priceCurrencyFormatter(
						knockClipperPlugin.variants[0].compareAtPrice.amount,
						knockClipperPlugin.variants[0].compareAtPrice.currencyCode
					)}
				</del>
			</>
		) : (
			`Buy it now ${priceCurrencyFormatter(
				knockClipperPlugin.variants[0].price.amount,
				knockClipperPlugin.variants[0].price.currencyCode
			)}`
		)
	};
};
