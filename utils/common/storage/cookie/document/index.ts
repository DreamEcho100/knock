/*
interface SetCookieInterface {
	cookieName: string;
	cookieValue?: string;
	options: {
    path: string;
    sameSite: 'Strict' | 'strict' | 'Lax' | 'lax' | 'None' | 'none';
    secure: boolean;
    expires?: Date;
    domain?: string;
    httpOnly?: boolean;
	};
}
*/

type SetCookieOptionsType = {
	path?: string;
	sameSite?: 'Strict' | 'strict' | 'Lax' | 'lax' | 'None' | 'none';
	secure?: boolean;
	maxAge?: number;
	expires?: Date;
	domain?: string;
	httpOnly?: boolean;
};

export const setCookie = (
	cookieName: string,
	cookieValue = '',
	{
		path = '/',
		sameSite = 'lax',
		secure = true,
		...options
	}: SetCookieOptionsType
): void => {
	let cookieString = `${cookieName}=${cookieValue};Path=${path};SameSite=${sameSite};${
		secure && ' secure;'
	}`;

	if (options.expires) cookieString += `Expires=${options.expires};`;
	if (options.maxAge) cookieString += `max-age=${options.maxAge};`;
	if (options.domain) cookieString += `Domain=${options.domain};`;
	if (options.httpOnly) cookieString += 'HttpOnly;';

	document.cookie = cookieString;
};

export const getCookie = <T = string>(cookieName: string, source?: string) => {
	if (!source) {
		if (typeof window === 'undefined') return undefined;
		source = document.cookie;
	}

	const decodedCookie = decodeURIComponent(source);
	const cookieArray = decodedCookie.split(';');
	let cookieValue;

	cookieArray.find((cookie) => {
		if (cookie.trim().startsWith(`${cookieName}=`)) {
			cookieValue = cookie.substr(cookie.indexOf('=') + 1);
			return true;
		}
	});

	return cookieValue as unknown as T;
};

export const checkCookieByName = (cookieName: string): boolean =>
	!!getCookie(cookieName);
export const checkCookieByNameAndValue = (
	cookieName: string,
	cookieValue: string
): boolean => {
	const result = getCookie(cookieName);
	return !!result && result === cookieValue;
};

export const removeCookie = (
	cookieName: string,
	options: SetCookieOptionsType | {} = {}
): void =>
	setCookie(cookieName, '', {
		...options,
		expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT')
	});
