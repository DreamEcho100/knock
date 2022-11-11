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
					flex flex-col
					lg:flex-row ${wrapperClassName}`}
		>
			<div
				className='w-full flex flex-col items-center justify-center text-center gap-8 px-8 pb-4
							sm:pb-20
							lg:w-1/2 lg:text-align-initial lg:items-start lg:py-8'
			>
				<h2 className='text-h2 font-bold uppercase flex flex-wrap' {...h2} />
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
				className='w-full relative p-4
							 lg:w-1/2 lg:p-0'
			>
				{backgroundImg && (
					<div className='absolute w-full h-full'>
						<CustomNextImage
							src='/images/Rectangle 47.png'
							alt=''
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
					} relative mx-auto w-full h-full object-contain`}
				/>
			</div>
		</div>
	);
};

export default ProductShowcase;
