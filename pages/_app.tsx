import type { AppProps } from 'next/app';

import dynamic from 'next/dynamic';
import {
	Hydrate,
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query';
import { useState } from 'react';
import DefaultLayout from '@components/layouts/Default';
const DynamicTopProgressBar = dynamic(
	() => import('@components/shared/common/TopProgressBar'),
	{
		ssr: false
	}
);

import '@styles/globals.css';
import '@styles/swiper.css';
import '@styles/customNProgressStyles.css';
import { SharedCustomerStateProvider } from 'context/Customer';
import Head from 'next/head';

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
						<DynamicTopProgressBar />
						<Head>
							<meta charSet='UTF-8' />
							<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
							<meta
								name='viewport'
								content='width=device-width, initial-scale=1.0'
							/>
							<meta
								name='description'
								content='The KNOCK Plugin created by DECAP will help you make Drums That Knock hard and punch through your mix. Easy to use for music producers at all levels.'
							/>
							<title>
								PLUGINS THAT KNOCK | KNOCK Plugin - Make Your Drums Knock
							</title>
						</Head>
						<Component {...pageProps} />
					</DefaultLayout>
				</SharedCustomerStateProvider>
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
