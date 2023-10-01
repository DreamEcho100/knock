import type { Metadata } from 'next';
import { type PropsWithChildren } from 'react';
import Providers from './components/providers';
import SEODefaults from '~/utils/core/next-seo.config';

import '~/app/styles/globals.css';
import '~/app/styles/swiper.css';
import 'react-toastify/dist/ReactToastify.css';
import { sourceSansPro } from './libs/fonts/index';
import { cx } from 'class-variance-authority';

export const metadata: Metadata = SEODefaults;

export default function RootLayout(props: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta charSet="UTF-8" />
				<link rel="preload" href="/svg/bbblurry.svg" />
			</head>
			<body
				style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
				className={cx('dark', sourceSansPro.variable, sourceSansPro.className)}
			>
				<Providers>{props.children}</Providers>
			</body>
		</html>
	);
}
