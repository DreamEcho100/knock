'use client';
import type { ReactNode } from 'react';

import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';
import MainContent from './components/MainContent';
import Actions from './components/Actions';
import { ToastContainer } from 'react-toastify';

export const commonClasses = 'leading-relaxed text-primary-2 mx-auto';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<MainHeader />
			<Actions />
			<MainContent>{children}</MainContent>
			<MainFooter />

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</>
	);
};

export default DefaultLayout;
