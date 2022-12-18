import Image from 'next/image';
import { ImageProps } from 'next/dist/client/image.d';
import { useState } from 'react';
import { websiteBasePath } from '@utils/core/next-seo.config';

export interface ICustomNextImageProps extends Omit<ImageProps, 'alt'> {
	className?: string;
	placeholder?: 'blur' | 'empty';
	role?: string;
	alt?: string;
	weservNlOptimized?: boolean;
}

const CustomNextImage = ({
	className = '',
	unoptimized = true,
	weservNlOptimized = true,
	src,
	alt = '',
	placeholder = 'empty',
	blurDataURL,
	...props
}: ICustomNextImageProps) => {
	const [isWeservNlOptimized, setIsWeservNlOptimized] =
		useState(weservNlOptimized);
	const [_src, setSrc] = useState(src);
	const [isLoaded, setIsLoaded] = useState(false);

	const handleImageProps = () => {
		const imageProps: Omit<ICustomNextImageProps, 'alt'> & { alt: string } = {
			onError: (err) => {
				if (isWeservNlOptimized) return setIsWeservNlOptimized(false);

				setIsLoaded(true);
				setSrc(
					// '/images/image-error.png'
					'/svg/bbblurry.svg'
				);
			},
			// placeholder:"blur",
			// blurDataURL:"/assets/image-placeholder.png",
			unoptimized,
			src: isWeservNlOptimized
				? `//images.weserv.nl/?url=${
						typeof _src === 'string' && _src.startsWith('/')
							? `${websiteBasePath}${_src}`
							: _src
				  }&w=${props.width}${props.height ? `&h=${props.height}` : ''}`
				: _src,
			placeholder,
			className: `${className} ${isLoaded ? '' : 'no-content'}`,
			alt: '',
			onLoadingComplete: (img) => {
				setIsLoaded(true);
			},
			...props
		};

		if (placeholder !== 'empty') {
			if (blurDataURL) imageProps.blurDataURL = blurDataURL;
			else if (src && typeof src === 'string') imageProps.blurDataURL = src;
		}

		return imageProps;
	};

	// eslint-disable-next-line jsx-a11y/alt-text
	return <Image {...handleImageProps()} />;
};

export default CustomNextImage;
