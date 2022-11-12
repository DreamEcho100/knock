import type { IButtonProps, _ILinkProps } from '@components/shared/core/Button';
import type { ICustomNextImageProps } from '@components/shared/common/CustomNextImage';
import type { HTMLAttributes } from 'react';

import CustomNextImage from '@components/shared/common/CustomNextImage';
import Button from '@components/shared/core/Button';
import type { IProduct } from 'types';
import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';

interface IProps {
	textContainer: {
		h2: HTMLAttributes<HTMLHeadingElement>;
		p: HTMLAttributes<HTMLParagraphElement>;
		button: IButtonProps | _ILinkProps;
	};
	imageContainer: {
		mainImg: ICustomNextImageProps;
		backgroundImg?: Partial<ICustomNextImageProps> | false;
	};
	wrapper?: HTMLAttributes<HTMLDivElement>;
	product?: IProduct;
}

const ProductShowcase = ({
	product,
	textContainer: { h2 = {}, p = {}, button = {} },
	imageContainer: { mainImg, backgroundImg = {} },
	wrapper: { className: wrapperClassName = '', ...wrapper } = {}
}: IProps) => {
	const addProductsToCheckoutAndCart = useAddProductsToCheckoutAndCart();

	const { className: backgroundImgClassName = '', ...backgroundImgProps } =
		backgroundImg || {};

	return (
		<div
			{...wrapper}
			className={`
					flex flex-col gap-12 lg:gap-0
					lg:flex-row ${wrapperClassName}`}
		>
			<div
				className='w-full flex flex-col items-center justify-center text-center gap-4 md:px-8 pb-4
							lg:gap-8 lg:w-1/2 lg:text-align-initial lg:items-start lg:py-8'
			>
				<h2
					className='text-h2 font-bold uppercase flex flex-wrap text-center justify-center
						lg:text-align-initial lg:justify-start'
					{...h2}
				/>
				<p className='md:max-w-[450px]' {...p} />

				<Button
					className='capitalize'
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
				className='w-full relative md:p-4
							 lg:w-1/2 lg:p-0'
			>
				{backgroundImg && (
					<div className='absolute w-full h-full'>
						<CustomNextImage
							src='/images/Rectangle 47.png'
							width={800}
							height={500}
							className={`${backgroundImgClassName} object-contain mx-auto w-full h-full scale-[2] translate-y-[12.5%] pointer-events-none`}
							{...backgroundImgProps}
						/>
					</div>
				)}
				<CustomNextImage
					{...mainImg}
					width={800}
					height={500}
					className={`${
						mainImg.className || ''
					} relative mx-auto w-full h-full object-contain max-w-[80%] sm:max-w-[60%] lg:max-w-full`}
				/>
			</div>
		</div>
	);
};

export default ProductShowcase;
