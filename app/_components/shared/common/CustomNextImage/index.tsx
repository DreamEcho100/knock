'use client';
import { cx } from 'class-variance-authority';
import Image, { type ImageProps } from 'next/image';
import { forwardRef } from 'react';

export const websiteBasePath = `https://${process.env.NEXT_PUBLIC_APP_DOMAINE}`;

export interface ICustomNextImageProps extends Omit<ImageProps, 'alt'> {
	alt?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toBase64 = (str: string) =>
	typeof window === 'undefined'
		? Buffer.from(str).toString('base64')
		: window.btoa(str);

const CustomNextImage = forwardRef<HTMLImageElement, ICustomNextImageProps>(
	(props, ref) => {
		if (!props.src) {
			return (
				<Image
					src="/svgs/bbblurry.svg"
					alt={props.alt ?? ''}
					className={cx('no-content', props.className)}
					width={props.width}
					height={props.height}
				/>
			);
		}

		return (
			// eslint-disable-next-line jsx-a11y/alt-text
			<Image
				ref={ref}
				onError={(elem) => {
					elem.currentTarget.src = '/svgs/bbblurry.svg';
					elem.currentTarget.classList.add('no-content');
				}}
				// placeholder="blur"
				// blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(props.width, props.height))}`}
				{...props}
				src={props.src}
				className={cx('no-content', props.className)}
				alt={props.alt ?? ''}
			/>
		);
	},
);

CustomNextImage.displayName = 'CustomNextImage';

export default CustomNextImage;
