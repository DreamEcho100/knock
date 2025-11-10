import { cva, type VariantProps } from 'class-variance-authority';

import Link from 'next/link';
import { cardClasses } from 'utils/core/cva';
import CustomNextImage from '~/app/_components/shared/common/CustomNextImage';
import AddItemOnHeroSectionButton from '../../AddItemOnHeroSectionButton';
import { AspectRatio } from '../../../common/AspectRatio';
import { type ReactNode } from 'react';
import type { Product } from '~/libs/shopify/types';

interface IProductCardProps {
	// images: NonNullable<Product['images']> // { src: string; alt?: string };
	link: Parameters<typeof Link>['0'];
	extraDetailsElement?: ReactNode;
	imageVariants?: VariantProps<typeof handleImageVariants>;
	productData: Product;
	cardVariants?: VariantProps<typeof cardClasses>;
	className?: string;
}

interface ExtraProductCardDetails {
	toAddToCart: boolean;
	productData: Product;
}

const handleImageVariants = cva(
	['aspect-square overflow-hidden max-w-full', 'transition-all'],
	{
		variants: {
			onHover: {
				'darker-to-lighter': [
					'brightness-75',
					'group-hover:brightness-100 group-hover:duration-150',
				],
				'to-darker': 'group-hover:brightness-75 group-hover:duration-150',
				'to-lighter': 'group-hover:brightness-150 group-hover:duration-150',
				'to-dimmer':
					'group-hover:contrast-[0.8] group-hover:opacity-[0.8] group-hover:blur-[0.5px] group-hover:duration-150',
			},
		},
	},
);

const ProductBasicCard = ({
	productData: { images, title },
	link,
	extraDetailsElement,
	cardVariants,
	imageVariants,
	className,
}: IProductCardProps) => {
	return (
		<article className={cardClasses({ ...cardVariants, className })}>
			<Link
				{...link}
				// style={{ aspectRatio: 1, }}
				className={handleImageVariants(imageVariants)}
			>
				{images && images[0] && (
					<AspectRatio ratio={1 / 1}>
						<CustomNextImage
							src={images[0].url}
							alt={images[0].altText ? title : ''}
							width={350}
							height={350}
							className="object-contain w-full h-full transition-all duration-300"
						/>
					</AspectRatio>
				)}
			</Link>
			<div className="flex flex-col items-center justify-center flex-grow gap-2 p-4 text-center bg-primary-3 text-primary-2">
				<p className="text-[110%]">
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
	productData,
}: ExtraProductCardDetails) => {
	return (
		<AddItemOnHeroSectionButton
			product={productData}
			buttonProps={{
				children: 'add to cart',
				classesIntent: { p: 'extra-wide' },
				className: 'whitespace-nowrap',
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
	toAddToCart,
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
		/>
	);
};
