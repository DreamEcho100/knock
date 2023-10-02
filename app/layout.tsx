import type { Metadata } from 'next';
import { type PropsWithChildren } from 'react';
import Providers from './components/providers';
import SEODefaults from '~/utils/core/next-seo.config';

import '~/app/styles/globals.css';
import '~/app/styles/swiper.css';
import 'react-toastify/dist/ReactToastify.css';
import { decapv16, sourceSansPro } from './libs/fonts';
import { cx } from 'class-variance-authority';
import dynamic from 'next/dynamic';

const DynamicTopProgressBar = dynamic(
	() => import('~/app/components/shared/common/TopProgressBar'),
	{ ssr: false },
);

export const metadata: Metadata = SEODefaults;

export default function RootLayout(props: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="preload" href="/svg/bbblurry.svg" />
			</head>
			<body
				className={cx(
					'dark',
					sourceSansPro.variable,
					sourceSansPro.className,
					decapv16.variable,
				)}
			>
				<Providers>
					<DynamicTopProgressBar />
					{props.children}
				</Providers>
			</body>
		</html>
	);
}
