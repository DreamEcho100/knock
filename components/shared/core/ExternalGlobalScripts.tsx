import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

const ExternalGlobalScripts = () => {
	const router = useRouter();
	const [isPageReady, setIsPageReady] = useState(false);
	const configRef = useRef<{ isPageReadyId: NodeJS.Timeout | null }>({
		isPageReadyId: null
	});

	useEffect(() => {
		if (!isPageReady) return;
		import('react-facebook-pixel')
			.then((x) => x.default)
			.then((ReactPixel) => {
				ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID as string); // facebookPixelId
				ReactPixel.pageView();

				router.events.on('routeChangeComplete', () => {
					ReactPixel.pageView();
				});
			});
	}, [isPageReady, router.events]);

	useEffect(() => {
		configRef.current.isPageReadyId = setTimeout(() => {
			setIsPageReady(true);
		}, 5000);

		const isPageReadyId = configRef.current.isPageReadyId;

		return () => {
			if (isPageReadyId) {
				configRef.current.isPageReadyId = null;
			}
		};
	}, []);

	if (!isPageReady) return <></>;

	return (
		<>
			<Script
				strategy='lazyOnload'
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
				id='googletagmanager'
			/>
			<Script id='ga-analytics' strategy='lazyOnload'>
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
