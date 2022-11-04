import type { ReactNode } from 'react';

import classes from '@styles/content.module.css';

interface IProps {
	header: {
		h1Children: ReactNode;
		pChildren?: ReactNode;
	};
	children: ReactNode;
}

const Wrapper = ({ header, children }: IProps) => {
	return (
		<section className='bg-primary-1 p-8 sm:p-16'>
			<div className=''>
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
	);
};

export default Wrapper;
