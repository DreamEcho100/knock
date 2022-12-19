import type { AppProps } from 'next/app';

import dynamic from 'next/dynamic';
import {
	Hydrate,
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query';
import { useState } from 'react';
import DefaultLayout from '@components/layouts/Default';
import { DefaultSeo } from 'next-seo';

const DynamicTopProgressBar = dynamic(
	() => import('@components/shared/common/TopProgressBar'),
	{ ssr: false }
);

import '@styles/globals.css';
import '@styles/swiper.css';
import '@styles/customNProgressStyles.css';
import { SharedCustomerStateProvider } from 'context/Customer';
import Script from 'next/script';
import { useRouter } from 'next/router';
import SEODefaults from '@utils/core/next-seo.config';
import ExternalGlobalScripts from '@components/shared/core/ExternalGlobalScripts';

function MyApp({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchIntervalInBackground: false,
						refetchOnWindowFocus: false,
						refetchInterval: 3 * 60 * 1000
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
						<DefaultSeo {...SEODefaults} />
						<Component {...pageProps} />
					</DefaultLayout>
				</SharedCustomerStateProvider>
			</Hydrate>
			<ExternalGlobalScripts />
		</QueryClientProvider>
	);
}

export default MyApp;
