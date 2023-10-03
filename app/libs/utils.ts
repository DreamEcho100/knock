/**
 *
 * **Warning:** Doesn't work with circler references
 */
export function getClassInstanceValues<TValue>(item: TValue): TValue {
	if (Array.isArray(item)) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return (item as unknown[]).map((subItem) =>
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			subItem && typeof subItem === 'object'
				? getClassInstanceValues(subItem)
				: subItem,
		) as TValue;
	}

	const itemCopy: Record<PropertyKey, unknown> = {};

	let key: keyof TValue;
	for (key in item) {
		if (typeof item[key] === 'function') continue;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		itemCopy[key] =
			item[key] && typeof item[key] === 'object'
				? Array.isArray(item[key])
					? (item[key] as unknown[]).map((subItem) =>
							// eslint-disable-next-line @typescript-eslint/no-unsafe-return
							subItem && typeof subItem === 'object'
								? getClassInstanceValues(subItem)
								: subItem,
					  )
					: getClassInstanceValues(item[key] as Record<PropertyKey, unknown>)
				: item[key];
	}

	return itemCopy as TValue;
}
