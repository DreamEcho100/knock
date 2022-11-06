import type { ICartProduct } from '@context/Customer/ts';

import type { IProduct } from 'types';

export const convertProductToCartItem = ({
	product,
	preferredImage,
	selectedAmount
}: {
	product: IProduct;
	preferredImage?: ICartProduct['preferredImage'];
	selectedAmount?: ICartProduct['selectedAmount'];
}) => {
	return {
		...product,
		preferredImage: preferredImage
			? preferredImage
			: product.images && product.images[0]
			? {
					src: product.images[0].src,
					alt: product.images[0].altText || ''
			  }
			: null,
		price: product.variants[0].price.amount,
		selectedAmount: selectedAmount ? selectedAmount : 1
	};
};
