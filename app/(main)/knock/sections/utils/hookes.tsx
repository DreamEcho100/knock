import { useStore } from 'zustand';
import {
	cartStore,
	getCartLineItemPendingUpsertOrUpdateKey,
} from '~/libs/shopify/stores/cart';
import type { Product, ProductVariant } from '~/libs/shopify/types';
import { priceCurrencyFormatter } from '~/utils/core/shopify';

export function useAddKnockPluginToCartButtonProps({
	variant,
	product,
	text,
}: {
	variant: ProductVariant;
	product: Product;
	text?: string;
}) {
	const isPending = useStore(
		cartStore,
		(state) =>
			state.pendingActions[
				getCartLineItemPendingUpsertOrUpdateKey(product.id, variant.id)
			],
	);

	return {
		onClick: () => cartStore.getState().upsertCartItem(variant, product),
		disabled: isPending,
		children: text ? (
			text
		) : variant.compareAtPrice ? (
			<>
				Buy it now{' '}
				<span className="bg-secondary-2">
					{priceCurrencyFormatter(
						variant.price.amount,
						variant.price.currencyCode,
					)}
				</span>
				<del>
					{priceCurrencyFormatter(
						variant.compareAtPrice.amount,
						variant.compareAtPrice.currencyCode,
					)}
				</del>
			</>
		) : (
			`Buy it now ${priceCurrencyFormatter(
				variant.price.amount,
				variant.price.currencyCode,
			)}`
		),
	};
}
