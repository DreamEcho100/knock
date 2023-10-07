import type { IInitialState } from './ts';

export const initIsVisible = (): IInitialState['isVisible'] => ({
	sideNav: false,
	headerCart: false,
	marketingPopup: false,
	banner: true,
});

export const initState = (cart?: IInitialState['cart']): IInitialState => ({
	isVisible: initIsVisible(),
	cart: cart ?? {
		productsData: [],
		// updatedAt: new Date()
		updatedAt: null,
	},
});
