'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Actions_ = dynamic(() => import('./Actions_'), { ssr: false });

export default function Actions() {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => setIsActive(true), 5000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	if (!isActive) return <></>;

	return <Actions_ />;
}
