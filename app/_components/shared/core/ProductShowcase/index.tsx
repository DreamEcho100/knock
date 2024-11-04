'use client';
import type {
	IButtonProps,
	_ILinkProps,
} from '~/app/_components/shared/core/Button';
import type { ICustomNextImageProps } from '~/app/_components/shared/common/CustomNextImage';
import type { HTMLAttributes } from 'react';

import CustomNextImage from '~/app/_components/shared/common/CustomNextImage';
import Button from '~/app/_components/shared/core/Button';
import { cva, cx, type VariantProps } from 'class-variance-authority';
import { cartStore } from '~/libs/shopify/stores/cart';
import type { Product } from '~/libs/shopify/types';

const handleBackgroundImgVariants = cva(
	'pointer-events-none select-none object-contain mx-auto w-full h-full',
	{
		variants: {
			translateY: { small: 'translate-y-[12.5%]' },
			translateX: { small: 'translate-x-[10%]' },
			scale: { lg: 'scale-[2.25]', md: 'scale-[1.75]' },
		},
		defaultVariants: { translateY: 'small', scale: 'lg' },
	},
);
const handleWrapperVariants = cva(
	'h-full flex max-w-[1280px] mx-auto items-center',
	{
		variants: {
			flexDir: {
				'col-lg:row': 'flex-col lg:flex-row',
				'col-reverse-lg:row': 'flex-col-reverse lg:flex-row',
				'col-lg:row-reverse': 'flex-col lg:flex-row-reverse',
				'col-reverse-lg:row-reverse': 'flex-col-reverse lg:flex-row',
			},
		},
		defaultVariants: { flexDir: 'col-lg:row' },
	},
);

interface IProps {
	textContainer: {
		h2: HTMLAttributes<HTMLHeadingElement>;
		p: HTMLAttributes<HTMLParagraphElement>;
		button: IButtonProps | _ILinkProps;
	};
	imageContainer: {
		mainImg: Omit<ICustomNextImageProps, 'ref'>;
		backgroundImg?:
			| (Partial<Omit<ICustomNextImageProps, 'ref'>> & {
					variants?: VariantProps<typeof handleBackgroundImgVariants>;
			  })
			| false;
		index?: HTMLAttributes<HTMLDivElement>;
	};
	wrapper?: HTMLAttributes<HTMLDivElement> & {
		variants?: VariantProps<typeof handleWrapperVariants>;
	};
	// product?: IProduct;
	product?: Product;
}

const ProductShowcase = ({
	product,
	textContainer: { h2 = {}, p = {}, button = {} },
	imageContainer: { mainImg, backgroundImg = {}, index: imageContainerIndex },
	wrapper = {},
}: IProps) => {
	const variant = product?.variants[0];
	return (
		<div
			{...wrapper}
			// className={`
			// 		h-full flex flex-col max-w-[1280px] items-center
			// 		lg:flex-row ${wrapperClassName}`}
			className={handleWrapperVariants({
				...(wrapper.variants ?? {}),
				className: wrapper.className,
			})}
		>
			<div
				className="w-full h-full flex flex-col items-center justify-center text-center gap-2 md:px-4 pb-4
							lg:gap-4 lg:w-fit lg:max-w-[60%]  lg:text-align-initial lg:items-start lg:py-4"
			>
				<h2
					className="text-h3 font-semibold text-primary-1 flex flex-wrap text-center justify-center
						lg:text-align-initial lg:justify-start"
					{...h2}
				/>
				<p className="md:max-w-[450px]" {...p} />

				<Button
					className="capitalize mt-3 flex gap-1 items-center flex-wrap"
					onClick={() =>
						product &&
						variant &&
						void cartStore.getState().upsertCartItem(variant, product)
					}
					{...button}
				/>
			</div>
			<div
				{...imageContainerIndex}
				className={cx(
					'w-full relative flex items-center',
					'lg:w-[40%]',
					imageContainerIndex?.className,
				)}
			>
				{backgroundImg && (
					<div className="absolute w-full h-full">
						<CustomNextImage
							{...backgroundImg}
							src="/images/Rectangle 47.png"
							width={600}
							height={600}
							className={handleBackgroundImgVariants({
								...(backgroundImg.variants ?? {}),
								className: backgroundImg.className,
							})} //{`${backgroundImgClassName}`}
							sizes="80vw"
						/>
					</div>
				)}
				<CustomNextImage
					{...mainImg}
					width={600}
					height={600}
					className={cx(
						mainImg.className,
						'relative mx-auto w-full object-contain max-w-[80%] sm:max-w-[60%] lg:max-w-full',
					)}
					sizes="80vw"
				/>
			</div>
		</div>
	);
};

export default ProductShowcase;
