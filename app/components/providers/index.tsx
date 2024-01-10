'use client';
import type { PropsWithChildren } from 'react';

import { Suspense } from 'react';
import ReactQueryProvider from './ReactQuery';
import { SharedCustomerStateProvider } from './CustomerContext';
import DefaultLayout from '../DefaultLayout';
import dynamic from 'next/dynamic';

const DynamicTopProgressBar = dynamic(
	() => import('~/app/components/shared/common/TopProgressBar'),
	{ ssr: false },
);

export default function Providers(props: PropsWithChildren) {
	return (
		<ReactQueryProvider>
			<SharedCustomerStateProvider>
				<DefaultLayout>
					{props.children}
					<Suspense fallback={null}>
						<DynamicTopProgressBar />
					</Suspense>
				</DefaultLayout>
			</SharedCustomerStateProvider>
		</ReactQueryProvider>
	);
}
