import type { ReactNode } from 'react';

import classes from '@styles/content.module.css';
import Head from 'next/head';
import { defaultSiteName3, websiteBasePath } from 'next-seo.config';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

interface IProps {
	header: {
		h1Children: ReactNode;
		pChildren?: ReactNode;
	};
	head: {
		title: ReactNode;
		description?: ReactNode;
	};
	children: ReactNode;
	sectionProps?: Record<string, any>;
}

const Wrapper = ({ head, header, children, sectionProps = {} }: IProps) => {
	const router = useRouter();
	const pageTitle = `${head.title} | ${defaultSiteName3}`;
	const pageDescription =
		typeof head.description === 'string' ? head.description : undefined;

	return (
		<>
			<NextSeo
				title={pageTitle}
				description={pageDescription}
				canonical={`${websiteBasePath}${router.pathname}`}
				twitter={{ handle: pageTitle }}
				openGraph={{ title: pageTitle, description: pageDescription }}
			/>
			<section className='bg-primary-1 section-p-v1' {...sectionProps}>
				<div className='md:max-w-[800px] mx-auto'>
					<header className='flex flex-col gap-4 text-text-primary-1'>
						<h1 className='text-h2 font-semibold capitalize'>
							{header.h1Children}
						</h1>
						{header.pChildren && <p>{header.pChildren}</p>}
					</header>
					<div
						className={`${classes.contentContainer} ${classes.contentContainerElements}`}
					>
						{children}
					</div>
				</div>
			</section>
		</>
	);
};

export default Wrapper;
