import Image from 'next/image';
import Button from '@components/shared/core/Button';
import Link from 'next/link';
import { cardClasses } from 'utils/core/cva';
import type { VariantProps } from 'class-variance-authority';
import { IProduct } from 'types';
import { useSharedCustomerState } from '@context/Customer';
import { customerGlobalActions } from '@context/Customer/actions';
import { ICartProduct } from '@context/Customer/ts';
import { convertProductToCartItem } from '@utils/core/products';

interface IProductCardProps
	extends VariantProps<typeof cardClasses>,
		Partial<IProduct> {
	// images: NonNullable<IProduct['images']> // { src: string; alt?: string };
	link: Parameters<typeof Link>['0'];
	extraDetailsElement?: JSX.Element;
}

interface ExtraProductCardDetails {
	price: number;
	priceAfterDiscount?: number;
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
				className='aspect-square overflow-hidden brightness-75
					group-hover:brightness-100'
			>
				{images && images[0] && (
					<Image
						src={images[0].src}
						alt={images[0].altText || ''}
						width={800}
						height={800}
						className='w-full h-full object-contain
						transition-all duration-300 group
						group-hover:scale-125'
					/>
				)}
			</Link>
			<div
				className='flex-grow text-center p-4 bg-primary-3 text-primary-2 flex flex-col items-center justify-center gap-1'
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
	const [, customerDispatch] = useSharedCustomerState();

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
			{toAddToCart && (
				<Button
					className='capitalize'
					onClick={() =>
						customerGlobalActions.cart.addOneProduct(customerDispatch, {
							newProduct: convertProductToCartItem({ product: productData })
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
	toAddToCart,
	priceAfterDiscount
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
					priceAfterDiscount={priceAfterDiscount}
				/>
			}
		></ProductBasicCard>
	);
};
