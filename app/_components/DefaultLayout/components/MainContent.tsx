'use client';
import { type PropsWithChildren } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBanner } from '~/utils/core/API';
import { commonClasses } from '..';
import { cx } from 'class-variance-authority';
import { generalStore } from '~/libs/stores/general';
import { useStore } from 'zustand';

export default function MainContent(props: PropsWithChildren) {
	const isBannerVisible = useStore(
		generalStore,
		(state) => state.isVisible.banner,
	);

	/**
	 * Enabled and called on the `Actions` component.
	 *
	 * This one here is used to listen to the changes.
	 */
	const banner = useQuery({
		queryKey: ['banner-data'],
		queryFn: getBanner,
		refetchOnWindowFocus: true,
		enabled: false,
	});

	return (
		<main
			className={cx(
				commonClasses,
				'relative bg-primary-2 w-full flex flex-col',
				banner.data?.disable || !isBannerVisible ? 'mt-10' : 'mt-24',
			)}
		>
			{props.children}
		</main>
	);
}
