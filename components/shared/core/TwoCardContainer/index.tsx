import type { ICustomNextImageProps } from '@components/shared/common/CustomNextImage';

import CustomNextImage from '@components/shared/common/CustomNextImage';
import { HTMLAttributes, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const TwoCardContainer = ({
	items1,
	items2,
	items1HeaderText,
	items2HeaderText,
	items1ListProps = {},
	items2ListProps = {},
	backgroundImg = {},
	data
}: {
	items1: {
		id: number;
		li: string;
	}[];
	items2: {
		id: number;
		li: string;
	}[];
	items1HeaderText?: string;
	items2HeaderText?: string;
	items1ListProps?: HTMLAttributes<HTMLUListElement>;
	items2ListProps?: HTMLAttributes<HTMLUListElement>;
	backgroundImg?: Partial<ICustomNextImageProps> | false;
	data: any;
}) => {
	const array = [1, 2, 3, 4];

	return (
		<div
			className='relative
			flex justify-center flex-wrap gap-4
			md:flex-nowrap md:gap-6 lg:gap-10'
		>
			{backgroundImg && (
				<CustomNextImage
					src='/images/Rectangle 48.png'
					width={200}
					height={200}
					className='pointer-events-none select-none aspect-square absolute w-1/2 top-0 left-0 scale-150 -translate-y-1/3 -translate-x-1/4'
				/>
			)}
			<div className='relative max-w-lg flex flex-col gap-5 bg-primary-4 px-10 py-8 rounded-3xl w-full lg:w-1/2 lg:max-w-[420px]'>
				{items1HeaderText && (
					<header>
						{data ? (
							<h3 className='text-2xl font-semibold capitalize'>
								{items1HeaderText}
							</h3>
						) : (
							<div className='w-[100%] h-[30px]  md:w-[40%] '>
								<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
									<Skeleton
										width={'100%'}
										count={1}
										height={'100%'}
										className={'rounded-3xl '}
									/>
								</SkeletonTheme>
							</div>
						)}
					</header>
				)}
				<ul
					{...items1ListProps}
					className={`${
						items1ListProps.className || ''
					} flex flex-col flex-wrap gap-x-4 gap-y-4 lg:text-md`}
					style={{
						listStyle: "url('/svgs/purple-circle.svg')",
						listStylePosition: 'inside',
						...(items1ListProps.style || {})
					}}
				>
					{items1.length
						? items1.map((item: any) => <li key={item.id}>{item.li}</li>)
						: array.map((el: any) => (
								<div key={el} className='w-[100%] h-[40px]  md:w-[100%] '>
									<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
										<Skeleton
											width={'100%'}
											count={1}
											height={'100%'}
											className={'rounded-3xl  '}
										/>
									</SkeletonTheme>
								</div>
						  ))}
				</ul>
			</div>
			<div className='relative max-w-lg flex flex-col gap-5 bg-primary-4 px-12 py-8 rounded-3xl w-full lg:w-1/2 lg:max-w-[420px]'>
				{items2HeaderText && (
					<header>
						{data ? (
							<h3 className='text-2xl font-semibold capitalize'>
								{items2HeaderText}
							</h3>
						) : (
							<div className='w-[100%] h-[30px]  md:w-[40%] '>
								<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
									<Skeleton
										width={'100%'}
										count={1}
										height={'100%'}
										className={'rounded-3xl  '}
									/>
								</SkeletonTheme>
							</div>
						)}
					</header>
				)}
				<ul
					{...items2ListProps}
					className={`${
						items2ListProps.className || ''
					} flex flex-col flex-wrap gap-x-4 gap-y-4 lg:text-md`}
					style={{
						listStyle: "url('/svgs/purple-circle.svg')",
						listStylePosition: 'inside',
						...(items2ListProps.style || {})
					}}
				>
					{items2.length
						? items2.map((item) => (
									<li key={item.id}>{item.li}</li>
						  ))
						: array.map((el: any) => (
								<div key={el} className='w-[100%] h-[40px]  md:w-[100%] '>
									<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
										<Skeleton
											width={'100%'}
											count={1}
											height={'100%'}
											className={'rounded-3xl  '}
										/>
									</SkeletonTheme>
								</div>
						  ))}
				</ul>
			</div>
		</div>
	);
};

export default TwoCardContainer;
