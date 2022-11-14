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
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

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
					{/* <GoogleReCaptchaProvider */}
					{/* reCaptchaKey='6LdjpwUjAAAAAJTSe4mdrNT3x0CFHfr0uaxEDC_H'
						container={{
							// optional to render inside custom element
							element: <div></div>,
							parameters: {
								theme: 'dark' // optional, default undefined
							}
						}}
					> */}
					<DefaultLayout>
						<DynamicTopProgressBar />
						<Head>
							<title>
								PLUGINS THAT KNOCK | KNOCK Plugin - Make Your Drums Knock
							</title>
							<meta
								name='description'
								content='The KNOCK Plugin created by DECAP will help you make Drums That Knock hard and punch through your mix. Easy to use for music producers at all levels.'
							/>
						</Head>
						<Component {...pageProps} />
					</DefaultLayout>
					{/* </GoogleReCaptchaProvider> */}
				</SharedCustomerStateProvider>
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
