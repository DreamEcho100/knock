'use client';
import { priceCurrencyFormatter } from '~/utils/core/shopify';
import Button from './Button';
import { useMemo } from 'react';
import { cx } from 'class-variance-authority';
import type { Product } from '~/libs/shopify/types';
import {
	cartStore,
	getCartLineItemPendingUpsertOrUpdateKey,
} from '~/libs/shopify/stores/cart';
import { useStore } from 'zustand';

export default function AddItemOnHeroSectionButton({
	product,
	buttonProps: _buttonProps = {},
	hideButton,
}: {
	product: Product;
	buttonProps?: Parameters<typeof Button>[0];
	hideButton?: boolean;
}) {
	const variant = product.variants[0];
	const isPending = useStore(
		cartStore,
		(state) =>
			state.pendingActions[
				getCartLineItemPendingUpsertOrUpdateKey(
					product.id,
					product.variants[0].id,
				)
			],
	);
	const buttonProps = {
		onClick: async () => {
			await cartStore.getState().upsertCartItem(variant, product);
			cartStore.getState().setIsOpen(true);
		},
		children: 'Buy it now',
		className: 'capitalize text-h6',
		..._buttonProps,
		classesIntent: { isLoading: isPending, ..._buttonProps.classesIntent },
	};

	const prices = useMemo(() => {
		const prices: { price: string; compareToPrice?: string } = {
			price: priceCurrencyFormatter(
				product.variants[0].price.amount,
				product.variants[0].price.currencyCode,
			),
			compareToPrice: product?.variants[0]?.compareAtPrice
				? priceCurrencyFormatter(
						product.variants[0].compareAtPrice.amount,
						product.variants[0].compareAtPrice.currencyCode,
					)
				: undefined,
		};

		return prices;
	}, [product.variants]);

	return (
		<div className="flex flex-col gap-[0.35rem] items-center justify-center relative">
			{buttonProps.children && (
				<div className="flex flex-wrap gap-[0.35rem] text-[95%]">
					{prices.compareToPrice && (
						<del className="line-through font-normal">
							{prices.compareToPrice}
						</del>
					)}
					<span
						className={cx(
							prices.compareToPrice ? 'text-bg-secondary-2' : '',
							'font-semibold',
						)}
					>
						{prices.price}
					</span>
				</div>
			)}
			{!hideButton && <Button {...buttonProps} />}
		</div>
	);
}
