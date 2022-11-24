import type { IProductByIdPageProps } from '@pages/products/[productId]';

import Button from '@components/shared/core/Button';

import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';
import CustomNextImage from '@components/shared/common/CustomNextImage';

import classes from '@styles/content.module.css';

const HeroSection = ({ product }: IProductByIdPageProps) => {
	const addProductsToCheckoutAndCart = useAddProductsToCheckoutAndCart();

	return (
		<section className='bg-primary-1 section-p-v1 overflow-x-hidden md:overflow-x-visible'>
			<div className='relative flex items-start flex-col md:flex-row'>
				<div className='flex w-full mx-auto md:mx-0 md:w-2/5 lg:w-1/2 max-w-[28rem]'>
					<div
						className='relative bg-primary-1 flex justify-center overflow-hidden flex-col
						sm:rounded-3xl' // lg:flex-row lg:max-w-full
					>
						{product.images && product.images[0] && (
							<CustomNextImage
								src={product.images[0].src}
								alt={product.images[0].altText || ''}
								width={800}
								height={800}
								className=' aspect-square w-full object-contain'
							/>
						)}
						<div className='p-4 lg:p-8 flex flex-col gap-2 bg-primary-4 items-center justify-center text-center'>
							<h1 className='text-h4 lg:text-h3 capitalize font-semibold'>
								{product.title}
							</h1>
							<p>${product.variants[0].price.amount}</p>

							<p className=''>
								Pay in 4 interest-free installments of $12.50 with
								<span
									title='shop pay'
									style={{
										display: 'inline-block',
										backgroundImage: 'url(/images/shoppay.png)',
										width: '8ch',
										height: '2ch',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat',
										transform: 'translateY(25%)'
									}}
									// {/* <CustomNextImage
									// 	src='/images/shoppay.png'
									// 	alt='shop pay'
									// 	width={200}
									// 	height={50}
									// 	className='w-[9ch]' */}
								/>
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
								<CustomNextImage
									src='/images/payment_cards.png'
									alt='payment cards'
									width={300}
									height={50}
									className='sm:w-1/2 object-contain'
								/>
							</div>
						</div>
					</div>
				</div>
				<div
					className={`${classes.contentContainerElements} relative w-full md:w-3/5 lg:w-1/2 py-8 sm:px-8 flex-grow flex flex-col gap-4`}
				>
					<CustomNextImage
						src='/images/Rectangle 47.png'
						width={200}
						height={200}
						className='pointer-events-none select-none aspect-square absolute w-3/4 top-0 right-0 scale-125
						md:w-1/2
						lg:translate-x-[4%] lg:-translate-y-[4%]'
					/>
					<div
						className='description-container'
						dangerouslySetInnerHTML={{
							__html: product.descriptionHtml
						}}
					/>
					<style jsx global>{`
						.description-container {
							display: flex;
							flex-direction: column;
							gap: 1rem;
						}
						.description-container ul {
							padding-left: 1rem;
						}
						[dir='rtl'] .description-container ul {
							padding-left: 0;
							padding-right: 1rem;
						}
					`}</style>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
