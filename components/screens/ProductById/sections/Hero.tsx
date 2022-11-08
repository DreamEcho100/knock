import type { IProductByIdPageProps } from '@pages/products/[productId]';

import Button from '@components/shared/core/Button';
import Image from 'next/image';
import { customerGlobalActions } from '@context/Customer/actions';
import { convertProductToCartItem } from '@utils/core/products';
import { useSharedCustomerState } from '@context/Customer';
import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';

const HeroSection = ({ product }: IProductByIdPageProps) => {
	const [, customerDispatch] = useSharedCustomerState();
	const addProductsToCheckoutAndCart = useAddProductsToCheckoutAndCart();

	return (
		<section className='bg-primary-1 overflow-x-hidden md:overflow-x-visible'>
			<div
				className='
					relative px-8 pt-16 pb-8 md:px-16 flex items-center justify-center'
			>
				<Image
					src='/images/Rectangle 47.png'
					alt=''
					width={200}
					height={200}
					className='pointer-events-none aspect-square absolute w-1/2 top-0 right-0 scale-125
						lg:translate-x-[4%] lg:-translate-y-[4%]'
				/>
				<div
					className='
			 			relative bg-primary-1 flex justify-center rounded-3xl overflow-hidden flex-col w-11/12 max-w-fit
						lg:flex-row lg:max-w-full lg:rounded-l-none lg:rounded-r-3xl'
				>
					{product.images && product.images[0] && (
						<Image
							src={product.images[0].src}
							alt={product.images[0].altText || ''}
							width={800}
							height={800}
							className=' aspect-square w-full lg:max-w-[25rem] object-contain'
						/>
					)}
					<div
						className='px-4 rounded-r-none py-8 flex flex-col gap-2 bg-primary-4 items-center justify-center text-center
							sm:px-16
							lg:items-stretch lg:justify-stretch lg:text-align-initial lg:rounded-r-3xl'
					>
						<h1 className='text-h2 capitalize font-bold'>{product.title}</h1>
						<p>${product.variants[0].price.amount}</p>
						<p>
							<span className='text-bg-secondary-1'>Shipping</span>
							&nbsp;calculated at checkout.
						</p>
						<p
							className='flex flex-wrap items-center justify-center
								lg:justify-start'
						>
							Pay in 4 interest-free installments of $12.50 with
							<span>
								<Image
									src='/images/shoppay.png'
									alt='shop pay'
									width={200}
									height={50}
									className='w-[9ch]'
								/>
							</span>
						</p>
						<div
							className='flex justify-center items-center flex-wrap gap-4
									lg:justify-between'
						>
							<Button
								className='capitalize mt-2'
								onClick={() =>
									addProductsToCheckoutAndCart.mutate({
										products: [{ ...product, quantity: 1 }]
									})
								}
							>
								add to cart
							</Button>
							<Image
								src='/images/payment_cards.png'
								alt='payment cards'
								width={300}
								height={50}
								className='w-1/2 object-contain'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
