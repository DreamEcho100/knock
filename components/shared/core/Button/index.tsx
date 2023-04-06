import Link from 'next/link';
import type { ButtonHTMLAttributes } from 'react';
import { buttonClasses } from 'utils/core/cva';
import type { VariantProps } from 'class-variance-authority';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	classesIntent?: VariantProps<typeof buttonClasses>;
}

export type _ILinkProps = Parameters<typeof Link>['0'];
export interface ILinkProps extends _ILinkProps {
	href: _ILinkProps['href'];
	classesIntent?: VariantProps<typeof buttonClasses>;
}

const Button = ({ classesIntent, ...props }: IButtonProps | ILinkProps) => {
	if ('href' in props)
		return (
			<>
				{props.children ? (
					<Link
						{...props}
						className={`${buttonClasses(classesIntent)} ${
							props.className || ''
						} `}
					/>
				) : (
					<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
						<Skeleton
							width={150}
							count={1}
							height={45}
							className={'rounded-3xl '}
						/>
					</SkeletonTheme>
				)}
			</>
		);

	return (
		<>
			{props.children ? (
				<button
					{...props}
					className={`${buttonClasses(classesIntent)} ${
						props.className || ''
					} `}
				/>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						width={150}
						count={1}
						height={45}
						className={'rounded-3xl '}
					/>
				</SkeletonTheme>
			)}
		</>
	);
};

export default Button;
