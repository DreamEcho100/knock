import type { CartItem } from '~/libs/shopify/types';

export const convertProductToCartItem = ({
	product,
	preferredImage,
	selectedAmount,
}: {
	product: CartItem;
	preferredImage?: CartItem['merchandise']['product']['featuredImage'];
	selectedAmount?: CartItem['merchandise']['product']['featuredImage'];
}) => {
	return {
		...product,
		preferredImage: preferredImage
			? preferredImage
			: product.merchandise.product.featuredImage
				? {
						src: product.merchandise.product.featuredImage.url,
						alt: product.merchandise.product.featuredImage.altText ?? '',
					}
				: null,
		// price:
		// 	typeof product.cost.perItem === 'string'
		// 		? parseFloat(product.cost.perItem)
		// 		: product.cost.perItem,
		selectedAmount: product.quantity
			? product.quantity
			: selectedAmount
				? selectedAmount
				: 1,
	};
};
