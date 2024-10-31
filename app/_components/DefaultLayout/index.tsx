'use client';
import type { ReactNode } from 'react';

import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';
import MainContent from './components/MainContent';
import Actions from './components/Actions';

export const commonClasses = 'leading-relaxed text-primary-2 mx-auto';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<MainHeader />
			<Actions />
			<MainContent>{children}</MainContent>
			<MainFooter />
		</>
	);
};

export default DefaultLayout;
