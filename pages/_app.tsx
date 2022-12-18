import type { AppProps } from 'next/app';

import dynamic from 'next/dynamic';
import {
	Hydrate,
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

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

	useEffect(() => {
		import('react-facebook-pixel')
			.then((x) => x.default)
			.then((ReactPixel) => {
				ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID as string); // facebookPixelId
				ReactPixel.pageView();

				router.events.on('routeChangeComplete', () => {
					ReactPixel.pageView();
				});
			});
	}, [router.events]);

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
			<Script
				strategy='afterInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
			/>
			<Script id='ga-analytics'>
				{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
			</Script>
		</QueryClientProvider>
	);
}

export default MyApp;
