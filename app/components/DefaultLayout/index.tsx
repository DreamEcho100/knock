'use client';
import type { ReactNode } from 'react';

import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';
import MainContent from './components/MainContent';
import dynamic from 'next/dynamic';
const LazyLoadedActions = dynamic(
	() => import('./components/LazyLoadedActions'),
);

export const commonClasses = 'leading-relaxed text-primary-2 mx-auto';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<MainHeader />
			<LazyLoadedActions />
			<MainContent>{children}</MainContent>
			<MainFooter />
		</>
	);
};

export default DefaultLayout;
