import type { ICartProduct } from '@context/Customer/ts';

import type { ILineItem } from 'types';

export const convertProductToCartItem = ({
	product,
	preferredImage,
	selectedAmount
}: {
	product: ILineItem;
	preferredImage?: ICartProduct['preferredImage'];
	selectedAmount?: ICartProduct['selectedAmount'];
}) => {
	return {
		...product,
		preferredImage: preferredImage
			? preferredImage
			: product.variant.image
			? {
					src: product.variant.image.src,
					alt: product.variant.image.altText || ''
			  }
			: null,
		price:
			typeof product.variant.price.amount === 'string'
				? parseFloat(product.variant.price.amount)
				: product.variant.price.amount,
		selectedAmount: product.quantity
			? product.quantity
			: selectedAmount
			? selectedAmount
			: 1
	};
};
