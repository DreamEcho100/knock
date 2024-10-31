import { type ReadonlyURLSearchParams } from 'next/navigation';

export function ensureStartWith(stringToCheck: string, startsWith: string) {
	return stringToCheck.startsWith(startsWith)
		? stringToCheck
		: `${startsWith}${stringToCheck}`;
}

export function createUrl(
	pathname: string,
	params: URLSearchParams | ReadonlyURLSearchParams,
) {
	const paramsString = params.toString();
	const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

	return `${pathname}${queryString}`;
}

export class CustomError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'CartError';
	}
}

export function isCustomError(error: unknown): error is CustomError {
	return (
		error instanceof CustomError ||
		(isObject(error) && error.name === 'CartError' && !!error.message)
	);
}

export function isObject(object: unknown): object is Record<string, unknown> {
	return (
		typeof object === 'object' && object !== null && !Array.isArray(object)
	);
}

export function findError<T extends object>(error: T): boolean {
	if (Object.prototype.toString.call(error) === '[object Error]') {
		return true;
	}

	const prototype = Object.getPrototypeOf(error) as T | null;
	return prototype === null ? false : findError(prototype);
}
