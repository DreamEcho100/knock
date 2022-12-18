import type { IButtonProps, _ILinkProps } from '@components/shared/core/Button';
import type { ICustomNextImageProps } from '@components/shared/common/CustomNextImage';
import type { HTMLAttributes } from 'react';

import CustomNextImage from '@components/shared/common/CustomNextImage';
import Button from '@components/shared/core/Button';
import type { IProduct } from 'types';
import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';
import { cx } from 'class-variance-authority';

interface IProps {
	textContainer: {
		h2: HTMLAttributes<HTMLHeadingElement>;
		p: HTMLAttributes<HTMLParagraphElement>;
		button: IButtonProps | _ILinkProps;
	};
	imageContainer: {
		mainImg: ICustomNextImageProps;
		backgroundImg?: Partial<ICustomNextImageProps> | false;
		index?: HTMLAttributes<HTMLDivElement>;
	};
	wrapper?: HTMLAttributes<HTMLDivElement>;
	product?: IProduct;
}

const ProductShowcase = ({
	product,
	textContainer: { h2 = {}, p = {}, button = {} },
	imageContainer: { mainImg, backgroundImg = {}, index: imageContainerIndex },
	wrapper: { className: wrapperClassName = '', ...wrapper } = {}
}: IProps) => {
	const addProductsToCheckoutAndCart = useAddProductsToCheckoutAndCart();

	const { className: backgroundImgClassName = '', ...backgroundImgProps } =
		backgroundImg || {};

	return (
		<div
			{...wrapper}
			className={`
					h-full flex flex-col max-w-[1280px] items-center
					lg:flex-row ${wrapperClassName}`}
		>
			<div
				className='w-full h-full flex flex-col items-center justify-center text-center gap-2 md:px-4 pb-4
							lg:gap-4 lg:w-fit lg:max-w-[60%]  lg:text-align-initial lg:items-start lg:py-4'
			>
				<h2
					className='text-h3 font-semibold text-primary-1 uppercase flex flex-wrap text-center justify-center
						lg:text-align-initial lg:justify-start'
					{...h2}
				/>
				<p className='md:max-w-[450px]' {...p} />

				<Button
					className='capitalize mt-3'
					onClick={() =>
						product &&
						addProductsToCheckoutAndCart.mutate({
							products: [{ ...product, quantity: 1 }]
						})
					}
					{...button}
				/>
			</div>
			<div
				{...imageContainerIndex}
				className={cx(
					'w-full relative flex items-center',
					'lg:w-[40%]',
					imageContainerIndex?.className
				)}
			>
				{backgroundImg && (
					<div className='absolute w-full h-full'>
						<CustomNextImage
							src='/images/Rectangle 47.png'
							width={600}
							height={600}
							className={`${backgroundImgClassName} pointer-events-none select-none object-contain mx-auto w-full h-full scale-[2.25] translate-y-[12.5%]`}
							{...backgroundImgProps}
						/>
					</div>
				)}
				<CustomNextImage
					{...mainImg}
					width={600}
					height={600}
					className={cx(
						mainImg.className,
						'relative mx-auto w-full object-contain max-w-[80%] sm:max-w-[60%] lg:max-w-full'
					)}
				/>
			</div>
		</div>
	);
};

export default ProductShowcase;
