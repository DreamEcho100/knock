import type { ICustomNextImageProps } from '@components/shared/common/CustomNextImage';

import CustomNextImage from '@components/shared/common/CustomNextImage';
import type { HTMLAttributes } from 'react';

const TwoCardContainer = ({
	items1,
	items2,
	items1HeaderText,
	items2HeaderText,
	items1ListProps = {},
	items2ListProps = {},
	backgroundImg = {}
}: {
	items1: string[];
	items2: string[];
	items1HeaderText?: string;
	items2HeaderText?: string;
	items1ListProps?: HTMLAttributes<HTMLUListElement>;
	items2ListProps?: HTMLAttributes<HTMLUListElement>;
	backgroundImg?: Partial<ICustomNextImageProps> | false;
}) => {
	return (
		<div
			className='relative
			flex justify-center flex-wrap gap-4
			md:flex-nowrap md:gap-8 lg:gap-16'
		>
			{backgroundImg && (
				<CustomNextImage
					src='/images/Rectangle 48.png'
					width={200}
					height={200}
					className='pointer-events-none aspect-square absolute w-1/2 top-0 left-0 scale-150 -translate-y-1/3 -translate-x-1/4'
				/>
			)}
			<div className='relative max-w-[550px] flex flex-col gap-8 bg-primary-4 px-10 py-8 rounded-3xl w-full lg:w-1/2'>
				{items1HeaderText && (
					<header>
						<h3 className='text-h3 font-semibold capitalize'>
							{items1HeaderText}
						</h3>
					</header>
				)}
				<ul
					{...items1ListProps}
					className={`${
						items1ListProps.className || ''
					} flex flex-col flex-wrap gap-x-4 gap-y-8`}
					style={{
						listStyle: "url('/svgs/purple-circle.svg')",
						listStylePosition: 'inside',
						...(items1ListProps.style || {})
					}}
				>
					{items1.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</div>
			<div className='relative max-w-[550px] flex flex-col gap-8 bg-primary-4 px-12 py-8 rounded-3xl w-full lg:w-1/2'>
				{items2HeaderText && (
					<header>
						<h3 className='text-h3 font-semibold capitalize'>
							{items2HeaderText}
						</h3>
					</header>
				)}
				<ul
					{...items2ListProps}
					className={`${
						items2ListProps.className || ''
					} flex flex-col flex-wrap gap-x-4 gap-y-8`}
					style={{
						listStyle: "url('/svgs/purple-circle.svg')",
						listStylePosition: 'inside',
						...(items2ListProps.style || {})
					}}
				>
					{items2.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default TwoCardContainer;
