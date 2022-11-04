import Image from 'next/image';
import Button from '@components/shared/core/Button';
import Link from 'next/link';
import { cardClasses } from 'utils/core/cva';
import type { VariantProps } from 'class-variance-authority';

interface IProductCardProps extends VariantProps<typeof cardClasses> {
	image: { src: string; alt?: string };
	link: Parameters<typeof Link>['0'];
	extraDetailsElement?: JSX.Element;
}

interface ExtraProductCardDetails {
	price: number;
	priceAfterDiscount?: number;
	toAddToCart: boolean;
	productData: any;
}

const ProductBasicCard = ({
	image,
	link,
	extraDetailsElement,
	intent
}: IProductCardProps) => {
	return (
		<div className={cardClasses({ intent })}>
			<Link
				{...link}
				// style={{ aspectRatio: 1, }}
				className='aspect-square overflow-hidden brightness-75
					group-hover:brightness-100'
			>
				<Image
					src={image.src}
					alt={image.alt || ''}
					width={800}
					height={800}
					className='w-full h-full
						transition-all duration-300 group
						group-hover:scale-125'
				/>
			</Link>
			<div
				className='flex-grow text-center px-4 py-2 bg-primary-3 text-primary-2 flex flex-col items-center justify-center gap-1'
				style={{ fontSize: 'small' }}
			>
				<p className='font-bold'>
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
	toAddToCart,
	priceAfterDiscount
}: ExtraProductCardDetails) => {
	return (
		<>
			{priceAfterDiscount ? (
				<p>
					<del>${price}</del>&nbsp;&nbsp;
					<span className='text-bg-secondary-2'>${priceAfterDiscount}</span>
				</p>
			) : (
				<p>${price}</p>
			)}
			{toAddToCart && <Button className='capitalize'>add to cart</Button>}
		</>
	);
};

export const ProductCardWithDetails = ({
	image,
	link,
	intent,
	//
	price,
	productData,
	toAddToCart,
	priceAfterDiscount
}: Omit<IProductCardProps, 'extraDetailsElement'> &
	ExtraProductCardDetails) => {
	return (
		<ProductBasicCard
			image={image}
			link={link}
			intent={intent}
			extraDetailsElement={
				<ExtraProductCardDetails
					price={price}
					productData={productData}
					toAddToCart={toAddToCart}
					priceAfterDiscount={priceAfterDiscount}
				/>
			}
		></ProductBasicCard>
	);
};
