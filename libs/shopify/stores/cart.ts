'use client';

import type {
	Cart,
	CartItem,
	Product,
	ProductVariant,
} from '~/libs/shopify/types';
import { createStore } from 'zustand';
import {
	addCartItem,
	redirectToCheckout,
	removeCartItem,
	updateCartItemQuantity,
} from '../actions/cart';
import { CustomError, isCustomError, isObject } from '~/libs/utils';

type UpdateType = 'plus' | 'minus' | 'delete';
interface CartStateRules {
	shouldStopIncreaseIfInCart?: boolean;
	shouldOpen?: boolean;
}

type CartState = {
	cart: Cart;
	state: 'idle' | 'loading' | 'active';

	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	toggleIsOpen: () => void;

	generalRules: CartStateRules;

	initCart: (cart: Cart) => void;
	updateCartItem: (
		updateType: UpdateType,
		merchandiseId: string,
		options?: { rules?: CartStateRules },
	) => Promise<void>;
	upsertCartItem: (
		variant: ProductVariant,
		product: Product,
		options?: { rules?: CartStateRules },
	) => Promise<void>;
	pendingActions: Record<string, boolean>;
	setPendingAction: (key: string, value: boolean) => void;
};

function createEmptyCart(): Cart {
	return {
		id: undefined,
		checkoutUrl: '',
		totalQuantity: 0,
		lines: [],
		cost: {
			subtotalAmount: { amount: '0', currencyCode: 'USD' },
			totalAmount: { amount: '0', currencyCode: 'USD' },
			totalTaxAmount: { amount: '0', currencyCode: 'USD' },
		},
		discountAllocations: [],
		discountCodes: [],
	};
}

function calculateItemCost(quantity: number, price: string): string {
	return (Number(price) * quantity).toString();
}

export const getCartLineItemPendingDeleteKey = (id: string) =>
	`cart-line-item-delete-${id}`;
export const getCartLineItemPendingUpdateKey = (id: string) =>
	`cart-line-item-update-${id}`;
export const getCartLineItemPendingUpsertOrUpdateKey = (
	productId: string,
	productVariantId: string,
) => `cart-line-item-upsert-or-update-${productId}-${productVariantId}`;
export const CartLinePendingDeleteKey = 'cart-line-delete';
export const CartLinePendingUpdateKey = 'cart-line-update';

export const cartStore = createStore<CartState>((set, get) => ({
	cart: createEmptyCart(),
	state: 'idle',

	isOpen: false,
	setIsOpen: (isOpen) => {
		set({ isOpen });
	},
	toggleIsOpen: () => {
		set((state) => ({ isOpen: !state.isOpen }));
	},

	generalRules: {
		shouldStopIncreaseIfInCart: true,
	},

	initCart: (cart) => {
		set({ cart, state: 'active' });
	},

	upsertCartItem: async (variant, product, options) => {
		const state = get();
		if (state.state !== 'active') {
			return;
		}

		const pendingKey = getCartLineItemPendingUpsertOrUpdateKey(
			product.id,
			variant.id,
		);
		state.setPendingAction(pendingKey, true);
		const rules = state.generalRules ?? options?.rules;

		const result = await (async () => {
			try {
				let foundMerchandiseId: string | undefined;

				for (const item of state.cart.lines) {
					if (item.merchandise.id === variant.id) {
						foundMerchandiseId = item.id;

						if (rules?.shouldStopIncreaseIfInCart) {
							return { type: 'HALT' } as const;
						}
						break;
					}
				}

				if (foundMerchandiseId) {
					await state.updateCartItem('plus', foundMerchandiseId, options);
					return { type: 'SUCCESS' } as const;
				}

				const result = await addCartItem(variant.id);

				if (result.type === 'error') {
					return {
						type: 'ERROR',
						message: result.message,
					} as const;
				}

				set({ cart: result.data });
				return { type: 'SUCCESS' } as const;
			} catch (error) {
				return {
					type: 'ERROR',
					message:
						error instanceof Error
							? error.message
							: 'Error adding item to cart',
				} as const;
			}
		})();

		switch (result?.type) {
			case 'ERROR':
				console.error(result.message);
				break;
			case 'HALT':
			case 'SUCCESS':
				if (rules?.shouldOpen) {
					state.setIsOpen(true);
				}
				break;
		}

		state.setPendingAction(pendingKey, false);
	},

	updateCartItem: async (updateType, lineId, options) => {
		const state = get();
		if (state.state !== 'active') {
			return;
		}
		let pendingKey: string | undefined;

		try {
			const currentCart = state.cart ?? createEmptyCart();

			if (!state.cart.id) {
				console.error('Cart ID is missing');
				return;
			}
			const rules = state.generalRules ?? options?.rules;

			let actualUpdateType: UpdateType = updateType;
			let foundItem: CartItem | undefined;
			const updatedLines: CartItem[] = [];

			for (const item of currentCart.lines) {
				if (item.id === lineId) {
					foundItem = item;

					if (updateType === 'plus' && rules?.shouldStopIncreaseIfInCart) {
						// If the item is already in the cart, do not add it again
						return;
					}

					const newQuantity =
						updateType === 'plus' ? item.quantity + 1 : item.quantity - 1;

					if (newQuantity <= 0) {
						actualUpdateType = 'delete';
						continue;
					}

					const singleItemAmount =
						Number(item.cost.totalAmount.amount) / item.quantity;
					const newTotalAmount = calculateItemCost(
						newQuantity,
						singleItemAmount.toString(),
					);

					updatedLines.push({
						...item,
						quantity: newQuantity,
						cost: {
							...item.cost,
							totalAmount: {
								...item.cost.totalAmount,
								amount: newTotalAmount,
							},
						},
					});
					continue;
				}

				updatedLines.push(item);
			}

			if (!foundItem) {
				console.error('Item is not found in cart');
				return;
			}

			let updatedCart = {
				...currentCart,
				lines: updatedLines,
				...updateCartTotals(updatedLines),
			};

			switch (actualUpdateType) {
				case 'plus':
				case 'minus': {
					pendingKey = getCartLineItemPendingUpdateKey(lineId);
					state.setPendingAction(pendingKey, true);
					const result = await updateCartItemQuantity({
						merchandiseId: lineId,
						quantity: foundItem.quantity,
					});

					if (result.type === 'error') {
						throw new Error(result.message);
					}

					updatedCart = result.data;

					break;
				}
				case 'delete': {
					pendingKey = getCartLineItemPendingDeleteKey(lineId);
					state.setPendingAction(pendingKey, true);
					const result = await removeCartItem(lineId);

					if (result.type === 'error') {
						throw new Error(result.message);
					}

					updatedCart = result.data;
					break;
				}
			}

			set({
				cart: updatedCart,
			});

			if (rules?.shouldOpen) {
				state.setIsOpen(true);
			}
		} catch (error) {
			console.dir(error, { depth: Number.MAX_SAFE_INTEGER });
		}

		pendingKey && state.setPendingAction(pendingKey, false);
	},

	redirectToCheckout: async () => {
		const state = get();
		if (state.state !== 'active') {
			return;
		}
		await redirectToCheckout();
	},

	pendingActions: {},
	setPendingAction: (key, value) => {
		set((state) => ({
			pendingActions: { ...state.pendingActions, [key]: value },
		}));
	},
}));

/*
function updateCartItem(
	item: CartItem,
	updateType: UpdateType,
): CartItem | null {
	if (updateType === 'delete') return null;

	const newQuantity =
		updateType === 'plus' ? item.quantity + 1 : item.quantity - 1;
	if (newQuantity === 0) return null;

	const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
	const newTotalAmount = calculateItemCost(
		newQuantity,
		singleItemAmount.toString(),
	);

	return {
		...item,
		quantity: newQuantity,
		cost: {
			...item.cost,
			totalAmount: {
				...item.cost.totalAmount,
				amount: newTotalAmount,
			},
		},
	};
}
}
// ...updateCartTotals(updatedLines),
*/

function updateCartTotals(
	lines: CartItem[],
): Pick<Cart, 'totalQuantity' | 'cost'> {
	const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
	const totalAmount = lines.reduce(
		(sum, item) => sum + Number(item.cost.totalAmount.amount),
		0,
	);

	const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? 'USD';

	return {
		totalQuantity,
		cost: {
			subtotalAmount: { amount: totalAmount.toString(), currencyCode },
			totalAmount: { amount: totalAmount.toString(), currencyCode },
			totalTaxAmount: { amount: '0', currencyCode },
		},
	};
}
