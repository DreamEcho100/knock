import type { ICheckoutIdAndKey } from 'types';
import { getCookie } from '@utils/common/storage/cookie/document';
import { getIdFromGid } from './shopify';

export const getUserCheckoutIdAndKeyFromCookie = (gid?: string) => {
	if (!gid) return null;
	const str = getCookie(`user-${getIdFromGid(gid)}-checkoutIdAndKey`);

	if (!str) return null;

	return JSON.parse(str) as ICheckoutIdAndKey;
};
