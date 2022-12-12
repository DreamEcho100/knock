import Image from 'next/image';
import { ImageProps } from 'next/dist/client/image.d';
import { useState } from 'react';

export interface ICustomNextImageProps extends Omit<ImageProps, 'alt'> {
	className?: string;
	placeholder?: 'blur' | 'empty';
	role?: string;
	alt?: string;
}

const CustomNextImage = ({
	className = '',
	unoptimized = true,
	src,
	alt = '',
	placeholder = 'empty',
	blurDataURL,
	...props
}: ICustomNextImageProps) => {
	const [_src, setSrc] = useState(src);

	const handleImageProps = () => {
		const imageProps: Omit<ICustomNextImageProps, 'alt'> & { alt: string } = {
			onError: () =>
				setSrc(
					// '/images/image-error.png'
					'/svg/bbblurry.svg'
				),
			// placeholder:"blur",
			// blurDataURL:"/assets/image-placeholder.png",
			unoptimized,
			src: _src,
			placeholder,
			className,
			alt: '',
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
