import { cva, VariantProps } from 'class-variance-authority';
import type { IProduct } from 'types';

import Link from 'next/link';
import { cardClasses } from 'utils/core/cva';
import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';
import CustomNextImage from '@components/shared/common/CustomNextImage';
import AddItemOnHeroSectionButton from '../../AddItemOnHeroSectionButton';

interface IProductCardProps {
	// images: NonNullable<IProduct['images']> // { src: string; alt?: string };
	link: Parameters<typeof Link>['0'];
	extraDetailsElement?: JSX.Element;
	imageVariants?: VariantProps<typeof handleImageVariants>;
	productData: IProduct;
	cardVariants?: VariantProps<typeof cardClasses>;
}

interface ExtraProductCardDetails {
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
	productData: { images, title },
	link,
	extraDetailsElement,
	cardVariants,
	imageVariants
}: IProductCardProps) => {
	return (
		<article className={cardClasses(cardVariants)}>
			<Link
				{...link}
				// style={{ aspectRatio: 1, }}
				className={handleImageVariants(imageVariants)}
			>
				{images && images[0] && (
					<CustomNextImage
						src={images[0].src}
						alt={images[0].altText || title || ''}
						width={350}
						height={350}
						className='object-contain w-full h-full transition-all duration-300'
					/>
				)}
			</Link>
			<div className='flex flex-col items-center justify-center flex-grow gap-2 p-4 text-center bg-primary-3 text-primary-2'>
				<p className='text-[110%]'>
					<Link {...link} />
				</p>
				{extraDetailsElement}
			</div>
		</article>
	);
};

export default ProductBasicCard;

const ExtraProductCardDetails = ({
	toAddToCart,
	productData
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
};

export const ProductCardWithDetails = ({
	link,
	cardVariants,
	imageVariants,
	//
	productData,
	toAddToCart
}: Omit<IProductCardProps, 'extraDetailsElement' | 'productData'> &
	ExtraProductCardDetails) => {
	return (
		<ProductBasicCard
			link={link}
			cardVariants={cardVariants}
			imageVariants={imageVariants}
			productData={productData}
			extraDetailsElement={
				<ExtraProductCardDetails
					productData={productData}
					toAddToCart={toAddToCart}
				/>
			}
		></ProductBasicCard>
	);
};
