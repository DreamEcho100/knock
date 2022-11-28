import Link from 'next/link';
import type { ButtonHTMLAttributes } from 'react';
import { buttonClasses } from 'utils/core/cva';
import type { VariantProps } from 'class-variance-authority';

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
			<Link
				{...props}
				className={`${buttonClasses(classesIntent)} ${props.className || ''} `}
			/>
		);

	return (
		<button
			{...props}
			className={`${buttonClasses(classesIntent)} ${props.className || ''} `}
		/>
	);
};

export default Button;
