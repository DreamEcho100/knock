import type { ReactNode } from 'react';

import classes from '@styles/content.module.css';
import Head from 'next/head';

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
	return (
		<>
			<Head>
				<title>{head.title} | KNOCK Plugin - Make Your Drums Knock</title>
				{typeof head.description === 'string' && (
					<meta name='description' content={head.description} />
				)}
			</Head>
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
