'use server';

import { TAGS } from '../constants';
import { addToCart, createCart, getCart, removeFromCart, updateCart } from '..';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Cart } from '../types';
// import { CustomError } from '~/libs/utils';

export async function addCartItem(selectedVariantId: string | undefined) {
	const cartId = (await cookies()).get('cartId')?.value;

	if (!cartId || !selectedVariantId) {
		return { type: 'error', message: 'Error adding item to cart' } as const;
	}

	try {
		const cart = await addToCart(cartId, [
			{ merchandiseId: selectedVariantId, quantity: 1 },
		]);
		revalidateTag(TAGS.cart);

		return { type: 'success', data: cart } as const;
	} catch (error) {
		return { type: 'error', message: 'Error adding item to cart' } as const;
	}
}

export async function updateCartItemQuantity(payload: {
	merchandiseId: string;
	quantity: number;
}) {
	const cartId = (await cookies()).get('cartId')?.value;
	if (!cartId) {
		return { type: 'error', message: 'Missing cart ID' } as const;
	}

	const { merchandiseId, quantity } = payload;

	try {
		const cart = await getCart(cartId);
		if (!cart) {
			return { type: 'error', message: 'Error fetching cart' } as const;
		}

		const lineItem = cart.lines.find(
			(line) => line.merchandise.id === merchandiseId,
		);

		let updatedCart: Cart | undefined;
		if (lineItem?.id) {
			if (quantity === 0) {
				updatedCart = await removeFromCart(cartId, [lineItem.id]);
			} else {
				updatedCart = await updateCart(cartId, [
					{
						id: lineItem.id,
						merchandiseId,
						quantity,
					},
				]);
			}
		} else if (quantity > 0) {
			// If the item doesn't exist in the cart and quantity > 0, add it
			updatedCart = await addToCart(cartId, [{ merchandiseId, quantity }]);
		}

		if (!updatedCart) {
			return {
				type: 'error',
				message: 'Error updating item quantity',
			} as const;
		}

		revalidateTag(TAGS.cart);
		return { type: 'success', data: updatedCart } as const;
	} catch (error) {
		console.error(error);
		return { type: 'error', message: 'Error updating item quantity' } as const;
	}
}

export async function removeCartItem(merchandiseId: string) {
	const cartId = (await cookies()).get('cartId')?.value;

	if (!cartId) {
		return { type: 'error', message: 'Missing cart ID' } as const;
	}

	try {
		const cart = await getCart(cartId);
		if (!cart) {
			return { type: 'error', message: 'Error fetching cart' } as const;
		}

		const lineItem = cart.lines.find((line) => line.id === merchandiseId);

		if (lineItem?.id) {
			const cart = await removeFromCart(cartId, [lineItem.id]);

			console.log('\n\n\n___ cart,');
			console.dir(cart, { depth: Number.MAX_SAFE_INTEGER });
			console.log('\n\n\n');

			revalidateTag(TAGS.cart);
			return { type: 'success', data: cart } as const;
		} else {
			return { type: 'error', message: 'Item not found in cart' } as const;
		}
	} catch (error) {
		return { type: 'error', message: 'Error removing item from cart' } as const;
	}
}

export async function redirectToCheckout() {
	const cartId = (await cookies()).get('cartId')?.value;

	if (!cartId) {
		return { type: 'error', message: 'Missing cart ID' } as const;
	}

	const cart = await getCart(cartId);

	if (!cart) {
		return { type: 'error', message: 'Error fetching cart' } as const;
	}

	redirect(cart.checkoutUrl);
}

export async function initCart() {
	const cookiesManger = await cookies();
	// Check if a cart ID cookie exists
	const cartId = cookiesManger.get('cartId')?.value;

	try {
		// If a cart ID cookie exists, fetch the cart
		if (cartId) {
			const cart = await getCart(cartId);

			// If the cart exists, return it
			if (cart) {
				return cart;
			}
		}
	} catch (error) {
		console.error('????', error);
		return { type: 'error', message: 'Error fetching cart' } as const;
	}

	// If the cart ID cookie doesn't exist or the cart doesn't exist, create a new cart
	const cart = await createCart();
	// Set the cart ID cookie
	cookiesManger.set('cartId', cart.id!);
	return cart;
}
