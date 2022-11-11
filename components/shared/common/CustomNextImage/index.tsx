import Image from 'next/image';
import { ImageProps } from 'next/dist/client/image.d';

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
	// !!!
	const wrapperProps = {
		className
	};
	const handleImageProps = () => {
		const imageProps: Omit<ICustomNextImageProps, 'alt'> & { alt: string } = {
			unoptimized,
			src,
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
