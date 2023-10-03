'use client';
import { cx } from 'class-variance-authority';
import Image, { ImageProps } from 'next/image';
import { forwardRef } from 'react';

export const websiteBasePath = `https://${process.env.NEXT_PUBLIC_APP_DOMAINE}`;

export interface ICustomNextImageProps extends Omit<ImageProps, 'alt'> {
	className?: string;
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
				placeholder="blur"
				{...props}
				className={cx('no-content', props.className)}
				alt={props.alt ?? ''}
			/>
		);
	},
);

CustomNextImage.displayName = 'CustomNextImage';

export default CustomNextImage;
