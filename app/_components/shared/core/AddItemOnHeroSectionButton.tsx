'use client';
import { priceCurrencyFormatter } from '~/utils/core/shopify';
import Button from './Button';
import { useMemo } from 'react';
import { cx } from 'class-variance-authority';
import type { Product } from '~/libs/shopify/types';
import { cartStore } from '~/libs/shopify/stores/cart';
import { getProduct } from '~/libs/shopify';

const knobPluginHandle = 'knock-plugin';
/**
 * @danger - This function needs a rollback mechanism
 */
async function applyKnobPluginSpecificLogic() {
	try {
		const isInCart = cartStore
			.getState()
			.cart.lines.some(
				(item) => item.merchandise.product.handle === knobPluginHandle,
			);
		if (!isInCart) {
			return;
		}

		const discountCode = 'DTKLIM2024';
		await cartStore.getState().updateCartDiscountCodes([discountCode]);

		const isDiscountCodeApplied = cartStore
			.getState()
			.cart.discountCodes.some((code) => code.code === discountCode);
		if (!isDiscountCodeApplied) {
			return;
		}
		const drumsThatKnockLimitedEdition2024Handle =
			'drums-that-knock-limited-edition-2024';
		const drumsThatKnockLimitedEdition2024 = await getProduct(
			drumsThatKnockLimitedEdition2024Handle,
		);

		const drumsThatKnockLimitedEdition2024InCart = cartStore
			.getState()
			.cart.lines.find(
				(item) =>
					item.merchandise.product.handle ===
					drumsThatKnockLimitedEdition2024Handle,
			);

		if (!drumsThatKnockLimitedEdition2024) {
			return;
		}

		await cartStore
			.getState()
			.upsertCartItem(
				drumsThatKnockLimitedEdition2024.variants[0],
				drumsThatKnockLimitedEdition2024,
			);

		if (!drumsThatKnockLimitedEdition2024InCart) {
			return;
		}

		const isDiscountCurrentlyApplicable = cartStore
			.getState()
			.cart.discountCodes.find(
				(code) => code.code === discountCode,
			)?.applicable;

		if (isDiscountCurrentlyApplicable) {
			return;
		}

		await Promise.all([
			cartStore.getState().updateCartDiscountCodes(
				cartStore
					.getState()
					.cart.discountCodes.filter((code) => code.code !== discountCode)
					.map((code) => code.code),
			),
			cartStore
				.getState()
				.updateCartItem('delete', drumsThatKnockLimitedEdition2024InCart.id),
		]);
	} catch (error) {
		console.error(error);
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
