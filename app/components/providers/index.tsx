'use client';
import { type PropsWithChildren } from 'react';
import ReactQueryProvider from './ReactQuery';
import { SharedCustomerStateProvider } from './CustomerContext';
import DefaultLayout from '../DefaultLayout';

export default function Providers(props: PropsWithChildren) {
	return (
		<ReactQueryProvider>
			<SharedCustomerStateProvider>
				<DefaultLayout>{props.children}</DefaultLayout>
			</SharedCustomerStateProvider>
		</ReactQueryProvider>
	);
}
