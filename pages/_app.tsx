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

function MyApp({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchIntervalInBackground: false,
						refetchOnWindowFocus: false,
						refetchInterval: 5 * 60 * 1000,
						initialData: {
							isLoading: true,
							isFetching: true,
							data: undefined,
							error: undefined
						}
					}
				}
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<DefaultLayout>
					<Component {...pageProps} />
				</DefaultLayout>
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
