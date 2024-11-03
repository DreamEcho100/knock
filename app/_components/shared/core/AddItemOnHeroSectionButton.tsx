'use client';
import { priceCurrencyFormatter } from '~/utils/core/shopify';
import Button from './Button';
import { useMemo } from 'react';
import { cx } from 'class-variance-authority';
import type { Product } from '~/libs/shopify/types';
import { cartStore } from '~/libs/shopify/stores/cart';
import { getProduct } from '~/libs/shopify';

const knobPluginHandle = 'knock-plugin';
const discountCode = 'DTKLIM2024';
const drumsThatKnockLimitedEdition2024Handle =
	'drums-that-knock-limited-edition-2024';

async function applyKnobPluginSpecificLogic() {
	const config = {
		itemsKeyMap: {
			discountCode,
			drumsThatKnockLimitedEdition2024Handle,
			knobPluginHandle,
		},
		itemsKeyToInfoMap: {
			knobPluginHandle: {
				initiallyInCart: false,
			},
			discountCode: {
				initiallyApplied: false,
			},
			drumsThatKnockLimitedEdition2024Handle: {
				initiallyInCart: false,
			},
		},
		cleanups: [] as (() => Promise<void>)[],
	};

	const initialCartStore = cartStore.getState();

	for (const line of initialCartStore.cart.lines) {
		if (
			line.merchandise.product.handle === config.itemsKeyMap.knobPluginHandle
		) {
			config.itemsKeyToInfoMap.knobPluginHandle.initiallyInCart = true;
		}

		if (
			line.merchandise.product.handle ===
			config.itemsKeyMap.drumsThatKnockLimitedEdition2024Handle
		) {
			config.itemsKeyToInfoMap.drumsThatKnockLimitedEdition2024Handle.initiallyInCart =
				true;
		}
	}

	for (const discountCode of initialCartStore.cart.discountCodes) {
		if (discountCode.code === config.itemsKeyMap.discountCode) {
			config.itemsKeyToInfoMap.discountCode.initiallyApplied = true;
		}
	}

	if (
		config.itemsKeyToInfoMap.knobPluginHandle.initiallyInCart &&
		config.itemsKeyToInfoMap.discountCode.initiallyApplied &&
		config.itemsKeyToInfoMap.drumsThatKnockLimitedEdition2024Handle
			.initiallyInCart
	) {
		return;
	}

	try {
		async function discountCodeHandler() {
			if (config.itemsKeyToInfoMap.discountCode.initiallyApplied) {
				return;
			}

			await cartStore.getState().updateCartDiscountCodes([discountCode]);

			config.cleanups.push(async () => {
				await cartStore.getState().updateCartDiscountCodes(
					cartStore
						.getState()
						.cart.discountCodes.filter((code) => code.code !== discountCode)
						.map((code) => code.code),
				);
			});
		}

		async function newProductHandler() {
			if (
				config.itemsKeyToInfoMap.drumsThatKnockLimitedEdition2024Handle
					.initiallyInCart
			) {
				return;
			}
			const result = await getProduct(drumsThatKnockLimitedEdition2024Handle);

			const variant = result?.variants[0];

			if (!variant) {
				return;
			}

			await cartStore.getState().upsertCartItem(result.variants[0], result);

			const drumsThatKnockLimitedEdition2024InCart = cartStore
				.getState()
				.cart.lines.find(
					(line) =>
						line.merchandise.product.handle ===
						drumsThatKnockLimitedEdition2024Handle,
				);

			if (!drumsThatKnockLimitedEdition2024InCart) {
				throw new Error('Drums that knock limited edition 2024 not in cart');
			}

			config.cleanups.push(async () => {
				await cartStore
					.getState()
					.updateCartItem('delete', drumsThatKnockLimitedEdition2024InCart.id);
			});
		}

		await Promise.allSettled([discountCodeHandler(), newProductHandler()]).then(
			(results) => {
				results.forEach((result) => {
					if (result.status === 'rejected') {
						throw result.reason;
					}
				});
			},
		);

		const discountCodeInCart = cartStore
			.getState()
			.cart.discountCodes.find((code) => code.code === discountCode);

		if (!discountCodeInCart || !discountCodeInCart.applicable) {
			throw new Error('Discount code is not applicable');
		}
	} catch (error) {
		console.error(error);
		await Promise.all([...config.cleanups.map((cleanup) => cleanup())]);
	}
}

const AddItemOnHeroSectionButton = ({
	product,
	buttonProps: _buttonProps = {},
	hideButton,
}: {
	product: Product;
	buttonProps?: Parameters<typeof Button>[0];
	hideButton?: boolean;
}) => {
	const variant = product.variants[0];
	const buttonProps = {
		onClick: async () => {
			await cartStore.getState().upsertCartItem(variant, product);
			cartStore.getState().setIsOpen(true);

			if (product.handle === knobPluginHandle) {
				await applyKnobPluginSpecificLogic();
			}
		},
		children: 'Buy it now',
		className: 'capitalize text-h6',
		..._buttonProps,
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
};

export default AddItemOnHeroSectionButton;
