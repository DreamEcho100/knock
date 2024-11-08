import { productFragment } from './product';

const cartFragment = /* GraphQL */ `
	fragment cart on Cart {
		id
		checkoutUrl
		cost {
			subtotalAmount {
				amount
				currencyCode
			}
			totalAmount {
				amount
				currencyCode
			}
			totalTaxAmount {
				amount
				currencyCode
			}
		}
		discountAllocations {
			targetType
			discountedAmount {
				amount
				currencyCode
			}
		}
		discountCodes {
			applicable
			code
		}
		lines(first: 100) {
			edges {
				node {
					id
					quantity
					cost {
						totalAmount {
							amount
							currencyCode
						}
					}
					discountAllocations {
						targetType
						discountedAmount {
							amount
							currencyCode
						}
						... on CartAutomaticDiscountAllocation {
							__typename
							discountedAmount {
								amount
								currencyCode
							}
							targetType
							title
						}
						... on CartCodeDiscountAllocation {
							__typename
							code
							discountedAmount {
								amount
								currencyCode
							}
							targetType
						}
					}
					merchandise {
						... on ProductVariant {
							id
							title
							selectedOptions {
								name
								value
							}
							price {
								amount
								currencyCode
							}
							product {
								...product
							}
						}
					}
				}
			}
		}
		totalQuantity
		buyerIdentity {
			countryCode
			email
			phone
			customer {
				id
			}
		}
	}
	${productFragment}
`;

export default cartFragment;

/*

						... on CartCustomDiscountAllocation {
							__typename
							targetType
							title
							discountedAmount {
								amount
								currencyCode
							}
						}
*/
