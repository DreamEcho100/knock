/**
 *
 * **Warning:** Doesn't work with circler references
 */
export function getClassInstanceValues<TValue>(obj: TValue) {
	const objCopy: Record<PropertyKey, unknown> = {};

	let key: keyof TValue;
	for (key in obj) {
		if (typeof obj[key] === 'function') continue;
		objCopy[key] =
			obj[key] && typeof obj[key] === 'object'
				? Array.isArray(obj[key])
					? (obj[key] as unknown[]).map((item) =>
							obj[key] && typeof obj[key] === 'object'
								? getClassInstanceValues(item as Record<PropertyKey, unknown>)
								: item,
					  )
					: getClassInstanceValues(obj[key] as Record<PropertyKey, unknown>)
				: obj[key];
	}

	return objCopy as TValue;
}
