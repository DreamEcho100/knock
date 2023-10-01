'use client';
import { cx } from 'class-variance-authority';
import Image from 'next/image';
import { forwardRef } from 'react';

type ImageProps = Parameters<typeof Image>[0];

export const websiteBasePath = `https://${process.env.NEXT_PUBLIC_APP_DOMAINE}`;

export interface ICustomNextImageProps extends Omit<ImageProps, 'alt'> {
	className?: string;
	placeholder?: 'blur' | 'empty';
	role?: string;
	alt?: string;
}

const CustomNextImage = forwardRef<HTMLImageElement, ICustomNextImageProps>(
	(props, ref) => {
		return (
			// eslint-disable-next-line jsx-a11y/alt-text
			<Image
				ref={ref}
				onError={(elem) => {
					elem.currentTarget.src = '/svgs/bbblurry.svg';
					elem.currentTarget.classList.add('no-content');
				}}
				{...props}
				className={cx('no-content', props.className)}
				placeholder={props.placeholder ?? 'empty'}
				alt={props.alt ? props.alt : ''}
			/>
		);
	},
);

CustomNextImage.displayName = 'CustomNextImage';

export default CustomNextImage;
