import Button from '@components/shared/core/Button';
import Link from 'next/link';
import { cardClasses } from 'utils/core/cva';
import type { VariantProps } from 'class-variance-authority';
import { IProduct } from 'types';
import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';
import CustomNextImage from '@components/shared/common/CustomNextImage';

interface IProductCardProps
	extends VariantProps<typeof cardClasses>,
		Partial<IProduct> {
	// images: NonNullable<IProduct['images']> // { src: string; alt?: string };
	link: Parameters<typeof Link>['0'];
	extraDetailsElement?: JSX.Element;
}

interface ExtraProductCardDetails {
	price: number;
	toAddToCart: boolean;
	productData: IProduct;
}

const ProductBasicCard = ({
	images,
	link,
	extraDetailsElement,
	intent
}: IProductCardProps) => {
	return (
		<div className={cardClasses({ intent })}>
			<Link
				{...link}
				// style={{ aspectRatio: 1, }}
				className='aspect-square overflow-hidden brightness-75 max-w-full
					group-hover:brightness-100'
			>
				{images && images[0] && (
					<CustomNextImage
						src={images[0].src}
						alt={images[0].altText || ''}
						width={800}
						height={800}
						className='w-full h-full object-contain
						transition-all duration-300'
					/>
				)}
			</Link>
			<div className='flex-grow text-center p-4 bg-primary-3 text-primary-2 flex flex-col items-center gap-2 justify-center'>
				<p className='font-semibold'>
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
		<>
			{productData.variants[0] &&
			productData.variants[0].compareAtPrice?.amount ? (
				<p>
					<del>${productData.variants[0].compareAtPrice.amount}</del>
					&nbsp;&nbsp;
					<span className='text-bg-secondary-2'>${price}</span>
				</p>
			) : (
				<p>${price}</p>
			)}
			{toAddToCart && (
				<Button
					className='capitalize'
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
	//
	price,
	productData,
	toAddToCart
}: Omit<IProductCardProps, 'extraDetailsElement'> &
	ExtraProductCardDetails) => {
	return (
		<ProductBasicCard
			images={images}
			link={link}
			intent={intent}
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
