import type { ICheckoutIdAndKey } from 'types';
import { getCookie } from '@utils/common/storage/cookie/document';
import { getIdFromGid } from './shopify';

export const getUserCheckoutIdAndKeyFromCookie = () => {
	const str = getCookie('checkoutIdAndKey');

	if (!str) return null;

	return JSON.parse(str) as ICheckoutIdAndKey;
};
