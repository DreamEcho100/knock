'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

const ExternalGlobalScripts = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const id = useId();

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

	const searchParamsStringified = useMemo(
		() => searchParams?.toString(),
		[searchParams],
	);

	useEffect(() => {
		if (!reactFacebookPixelLazyImport.data) {
			if (reactFacebookPixelLazyImport.error) {
				console.error(
					'Failed to load Facebook Pixel:',
					reactFacebookPixelLazyImport.error,
				);
			}
			return;
		}

		const ReactPixel = reactFacebookPixelLazyImport.data;

		try {
			ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '');
			ReactPixel.pageView();
		} catch (error) {
			console.error('Facebook Pixel initialization error:', error);
		}
	}, [reactFacebookPixelLazyImport.data, reactFacebookPixelLazyImport.error]);

	useEffect(() => {
		if (!reactFacebookPixelLazyImport.data) return;

		const reactFacebookPixel = reactFacebookPixelLazyImport.data;
		pathname;
		searchParamsStringified;

		reactFacebookPixel.pageView();
	}, [reactFacebookPixelLazyImport.data, pathname, searchParamsStringified]);

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
				id={`${id}-googletagmanager`}
			/>
			<Script id={`${id}-ga-analytics`} strategy="lazyOnload">
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
