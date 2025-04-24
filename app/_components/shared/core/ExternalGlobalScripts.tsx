'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

const ExternalGlobalScripts = () => {
	const pathname = usePathname();
	let searchParams = useSearchParams();

	const [isPageReady, setIsPageReady] = useState(false);
	const configRef = useRef<{ isPageReadyTimeoutId: NodeJS.Timeout | null }>({
		isPageReadyTimeoutId: null,
	});
	const reactFacebookPixelLazyImport = useQuery({
		queryKey: ['react-facebook-pixel'],
		queryFn: () =>
			import('react-facebook-pixel').then(
				({ default: reactFacebookPixel }) => reactFacebookPixel,
			),
		enabled: isPageReady,
	});

	useEffect(() => {
		if (!reactFacebookPixelLazyImport.data) return;

		const reactFacebookPixel = reactFacebookPixelLazyImport.data;

		reactFacebookPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID!); // facebookPixelId
		reactFacebookPixel.pageView();
	}, [isPageReady, reactFacebookPixelLazyImport.data]);

	useEffect(() => {
		if (!reactFacebookPixelLazyImport.data) return;

		const reactFacebookPixel = reactFacebookPixelLazyImport.data;

		reactFacebookPixel.pageView();
	}, [pathname, searchParams?.toString()]);

	useEffect(() => {
		configRef.current.isPageReadyTimeoutId = setTimeout(() => {
			setIsPageReady(true);
		}, 5000);

		const isPageReadyId = configRef.current.isPageReadyTimeoutId;

		return () => {
			if (isPageReadyId) {
				configRef.current.isPageReadyTimeoutId = null;
			}
		};
	}, []);

	if (!isPageReady) return <></>;

	return (
		<>
			<Script
				strategy="lazyOnload"
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
				id="googletagmanager"
			/>
			<Script id="ga-analytics" strategy="lazyOnload">
				{`
            window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
			page_path: window.location.pathname,
			});
          `}
			</Script>
		</>
	);
};

export default ExternalGlobalScripts;
