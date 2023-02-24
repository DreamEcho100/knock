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
import ExternalGlobalScripts from '@components/shared/core/ExternalGlobalScripts';
import 'react-loading-skeleton/dist/skeleton.css';
import { getCookie } from '@utils/common/storage/cookie/document';

function MyApp({ Component, pageProps }: AppProps) {
	const [openPopUp, setOpenPop] = useState(false);
	const [openBanner, setBanner] = useState(true);

	const isHidingPopup = getCookie('hide-marketing-popup');

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


	useEffect(() => {
		if (Boolean(isHidingPopup)) {
			setOpenPop(false);
		} else {
			setTimeout(() => {
				setOpenPop(true);
			}, 5000);
		}
	}, [isHidingPopup]);

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<SharedCustomerStateProvider>
					<DefaultLayout
						setBanner={setBanner}
						openBanner={openBanner}
						openPopUp={openPopUp}
						setOpenPop={setOpenPop}
					>
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
