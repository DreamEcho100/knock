import Image from 'next/image';
import { ImageProps } from 'next/dist/client/image.d';

export interface ICustomNextImageProps extends ImageProps {
	className?: string;
	placeholder?: 'blur' | 'empty';
	role?: string;
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
		const imageProps: ICustomNextImageProps = {
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

	return <Image {...handleImageProps()} />;
};

export default CustomNextImage;
