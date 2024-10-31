import { createStore } from 'zustand/vanilla';

export interface GeneralStoreStateShape {
	isVisible: {
		sideNav: boolean;
		marketingPopup: boolean;
		banner: boolean;
	};
}

export interface GeneralStoreActionsShape {
	setIsVisible: (
		key: keyof GeneralStoreStateShape['isVisible'],
		valueOrUpdater: boolean | ((isVisible: boolean) => boolean),
	) => void;
	toggleIsVisible: (key: keyof GeneralStoreStateShape['isVisible']) => void;
}

export type GeneralStoreShape = GeneralStoreStateShape &
	GeneralStoreActionsShape;

export const generalStore = createStore<GeneralStoreShape>((set) => ({
	isVisible: {
		sideNav: false,
		marketingPopup: false,
		banner: true,
	},
	setIsVisible: (key, value) =>
		set((state) => ({
			isVisible: {
				...state.isVisible,
				[key]:
					typeof value === 'function' ? value(state.isVisible[key]) : value,
			},
		})),
	toggleIsVisible: (key) =>
		set((state) => ({
			isVisible: { ...state.isVisible, [key]: !state.isVisible[key] },
		})),
}));
