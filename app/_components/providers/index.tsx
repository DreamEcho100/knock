'use client';
import type { PropsWithChildren } from 'react';

import { Suspense } from 'react';
import ReactQueryProvider from './ReactQuery';
import DefaultLayout from '../DefaultLayout';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';

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
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="dark"
					/>
				</Suspense>
			</DefaultLayout>
		</ReactQueryProvider>
	);
}
