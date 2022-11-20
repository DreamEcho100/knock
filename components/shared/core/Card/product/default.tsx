import { cva, cx, VariantProps } from 'class-variance-authority';
import type { IProduct } from 'types';

import Button from '@components/shared/core/Button';
import Link from 'next/link';
import { cardClasses } from 'utils/core/cva';
import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';
import CustomNextImage from '@components/shared/common/CustomNextImage';
import AddItemOnHeroSectionButton from '../../AddItemOnHeroSectionButton';

interface IProductCardProps extends VariantProps<typeof cardClasses>, IProduct {
	// images: NonNullable<IProduct['images']> // { src: string; alt?: string };
	link: Parameters<typeof Link>['0'];
	extraDetailsElement?: JSX.Element;
	imageVariants?: VariantProps<typeof handleImageVariants>;
}

interface ExtraProductCardDetails {
	price: number;
	toAddToCart: boolean;
	productData: IProduct;
}

const handleImageVariants = cva(
	['aspect-square overflow-hidden max-w-full', 'transition-all'],
	{
		variants: {
			onHover: {
				'darker-to-lighter': [
					'brightness-75',
					'group-hover:brightness-100 group-hover:duration-150'
				],
				'to-darker': 'group-hover:brightness-75 group-hover:duration-150',
				'to-lighter': 'group-hover:brightness-150 group-hover:duration-150',
				'to-dimmer':
					'group-hover:contrast-[0.8] group-hover:opacity-[0.8] group-hover:blur-[0.5px] group-hover:duration-150'
			}
		}
	}
);

const ProductBasicCard = ({
	images,
	link,
	extraDetailsElement,
	intent,
	imageVariants,
	title
}: IProductCardProps) => {
	return (
		<div className={cardClasses({ intent })}>
			<Link
				{...link}
				// style={{ aspectRatio: 1, }}
				className={handleImageVariants(imageVariants)}
			>
				{images && images[0] && (
					<CustomNextImage
						src={images[0].src}
						alt={images[0].altText || title || ''}
						width={800}
						height={800}
						className='w-full h-full object-contain
						transition-all duration-300'
					/>
				)}
			</Link>
			<div className='flex-grow text-center p-4 bg-primary-3 text-primary-2 flex flex-col items-center gap-2 justify-center'>
				<p className='text-[110%]'>
					<Link {...link} />
				</p>
				{extraDetailsElement}
			</div>
		</div>
	);
};

export default ProductBasicCard;

const ExtraProductCardDetails = ({
	price,
	productData,
	toAddToCart
}: ExtraProductCardDetails) => {
	const addProductsToCheckoutAndCart = useAddProductsToCheckoutAndCart();

	return (
		<AddItemOnHeroSectionButton
			product={productData}
			buttonProps={{
				children: 'add to cart',
				classesIntent: { p: 'extra-wide' }
			}}
			hideButton={!toAddToCart}
		/>
	);

	return (
		<>
			{productData.variants[0] &&
			productData.variants[0].compareAtPrice?.amount ? (
				<p className='font-semibold'>
					<del>${productData.variants[0].compareAtPrice.amount}</del>
					&nbsp;&nbsp;
					<span className='text-bg-secondary-2'>${price}</span>
				</p>
			) : (
				<p className='font-semibold'>${price}</p>
			)}
			{toAddToCart && (
				<Button
					className='capitalize mb-2'
					classesIntent={{ p: 'extra-wide' }}
					onClick={() =>
						addProductsToCheckoutAndCart.mutate({
							products: [{ ...productData, quantity: 1 }]
						})
					}
				>
					add to cart
				</Button>
			)}
		</>
	);
};

export const ProductCardWithDetails = ({
	images,
	link,
	intent,
	imageVariants,
	//
	price,
	productData,
	toAddToCart,
	title
}: Omit<IProductCardProps, 'extraDetailsElement'> &
	ExtraProductCardDetails) => {
	return (
		<ProductBasicCard
			// images={images}
			link={link}
			intent={intent}
			imageVariants={imageVariants}
			{...productData}
			extraDetailsElement={
				<ExtraProductCardDetails
					price={price}
					productData={productData}
					toAddToCart={toAddToCart}
				/>
			}
		></ProductBasicCard>
	);
};
