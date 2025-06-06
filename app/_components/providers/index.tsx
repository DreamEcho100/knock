'use client';
import type { PropsWithChildren } from 'react';

import { Suspense } from 'react';
import ReactQueryProvider from './ReactQuery';
import DefaultLayout from '../DefaultLayout';
import dynamic from 'next/dynamic';
import ExternalGlobalScripts from '../shared/core/ExternalGlobalScripts';
// import { ToastContainer } from 'react-toastify';

const DynamicTopProgressBar = dynamic(
	() => import('~/app/_components/shared/common/TopProgressBar'),
	{ ssr: false },
);

export default function Providers(props: PropsWithChildren) {
	return (
		<ReactQueryProvider>
			<DefaultLayout>
				{props.children}
				<Suspense fallback={null}>
					<DynamicTopProgressBar />
					<ExternalGlobalScripts />
				</Suspense>
			</DefaultLayout>
		</ReactQueryProvider>
	);
}
