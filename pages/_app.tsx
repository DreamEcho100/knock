import type { AppProps } from 'next/app';

import {
	Hydrate,
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query';
import { useState } from 'react';
import DefaultLayout from '@components/layouts/Default';

import '@styles/globals.css';
import '@styles/swiper.css';
import { SharedCustomerStateProvider } from 'context/Customer';

function MyApp({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchIntervalInBackground: false,
						refetchOnWindowFocus: false,
						refetchInterval: 5 * 60 * 1000
					}
				}
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<SharedCustomerStateProvider>
					<DefaultLayout>
						<Component {...pageProps} />
					</DefaultLayout>
				</SharedCustomerStateProvider>
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
