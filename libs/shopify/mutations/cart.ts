import cartFragment from '../fragments/cart';

export const addToCartMutation = /* GraphQL */ `
	mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
		cartLinesAdd(cartId: $cartId, lines: $lines) {
			cart {
				...cart
			}
		}
	}
	${cartFragment}
`;

export const createCartMutation = /* GraphQL */ `
	mutation createCart($lineItems: [CartLineInput!]) {
		cartCreate(input: { lines: $lineItems }) {
			cart {
				...cart
			}
		}
	}
	${cartFragment}
`;

export const editCartItemsMutation = /* GraphQL */ `
	mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
		cartLinesUpdate(cartId: $cartId, lines: $lines) {
			cart {
				...cart
			}
		}
	}
	${cartFragment}
`;

export const removeFromCartMutation = /* GraphQL */ `
	mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
		cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
			cart {
				...cart
			}
		}
	}
	${cartFragment}
`;

export const cartDiscountCodesUpdateMutation = /* GraphQL */ `
	mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
		cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
			cart {
				...cart
			}
			userErrors {
				field
				message
			}
			warnings {
				code
				message
			}
		}
	}
	${cartFragment}
`;

export const cartBuyerIdentityUpdateMutation = /* GraphQL */ `
	mutation cartBuyerIdentityUpdate(
		$buyerIdentity: CartBuyerIdentityInput!
		$cartId: ID!
	) {
		cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
			cart {
				...cart
			}
			userErrors {
				field
				message
			}
			warnings {
				code
				message
			}
		}
	}
	${cartFragment}
`;
