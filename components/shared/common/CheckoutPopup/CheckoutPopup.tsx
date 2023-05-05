import React, { useEffect, useState } from 'react';
import Dialog from '../Dialog';
import Link from 'next/link';
import { useSharedCustomerState } from '@context/Customer';
import CustomNextImage from '../CustomNextImage';
import { getIdFromGid, priceCurrencyFormatter } from '@utils/core/shopify';
import Button from '@components/shared/core/Button';
import {
	useAddProductsToCheckoutAndCart,
	useGetUserCheckoutDetailsAndIdAndKey
} from '@utils/core/hooks';
import { AiFillCheckCircle, AiFillCopy } from 'react-icons/ai';


const CheckoutPopup = (props: any) => {
	const [interestedProduct, setInterestedProduct] = useState([]);
	const [isCopied, setIsCopied] = useState(null);

	const [
		{
			isVisible: { headerCart: isCartVisible },
			cart: { productsData }
		},
		customerDispatch
	] = useSharedCustomerState();

	useEffect(() => {
		if (props.data.upselling.length) {
			const productsHandle = props.data.upselling.map(
				(el: { handle: string }) => el.handle
			);

			const filterUpSellingsProduct: any = props.products?.filter((el: any) =>
				productsHandle.includes(el.handle)
			);

			let newArry: any = [];
			if (filterUpSellingsProduct && filterUpSellingsProduct.length) {
				for (let i = 0; i < filterUpSellingsProduct.length; i++) {
					const combinedObject = {
						...props.data.upselling[i],
						...filterUpSellingsProduct[i]
					};

					newArry.push(combinedObject);
				}
				setInterestedProduct(newArry);
			}
		}
	}, [props.data.upselling, props.data.upselling.length, props.products]);

	const addProductsToCheckoutAndCart = useAddProductsToCheckoutAndCart();

	const userCheckoutDetailsAndIdAndKey = useGetUserCheckoutDetailsAndIdAndKey();

	const cartProduct = productsData.map((el) => el.variant.product.handle);

	useEffect(() => {
		if (interestedProduct.length) {
			const isNotInCart = interestedProduct.filter(
				(el: { handle: string }) => !cartProduct.includes(el.handle)
			);

			if (!isNotInCart.length && interestedProduct.length) {
				props.setAlreadyInCart(true);
			} else {
				props.setAlreadyInCart(false);
			}
		}
	}, [interestedProduct.length, cartProduct.length]);

	return (
		<Dialog
			isOpen={props.isOpen}
			setIsOpen={props.setIsOpen}
			header={{
				title: 'You May Be Also Interested in'
			}}
		>
			{!interestedProduct?.length
				? ''
				: interestedProduct.map((product: any, index: any) => (
						<>
							{cartProduct.includes(product.handle) ? (
								<>
									<div className='flex mt-4 border-b-[0.0625rem] gap-1 border-b-primary-1 pb-4'>
										<p>{product.title.toUpperCase()} </p>
										<AiFillCheckCircle color='#31C631' />
									</div>
								</>
							) : (
								<>
									{!product.title.endsWith('(PIB)') ? (
										<article
											key={product.id}
											className='flex mt-3  border-b-[0.0625rem] border-b-primary-1 pb-4'
										>
											<div className='w-28 min-w-[4rem] aspect-square bg-primary-1 max-w-[30%]'>
												{product.images[0]?.src && (
													<CustomNextImage
														src={product.images[0]?.src}
														alt={product.images[0]?.alt || ''}
														width={112}
														height={112}
														className='object-contain w-full h-full aspect-square'
													/>
												)}
											</div>
											<div className='flex flex-col flex-grow gap-2 px-4 py-2'>
												<header className='flex  flex-col gap-1 sm:flex-row sm:gap-2 sm:justify-between'>
													<h4>
														<Link
															href={
																product.handle === 'knock-plugin'
																	? '/knock'
																	: product.handle === 'knock-clipper'
																	? '/knock-clipper'
																	: `/products/${getIdFromGid(product.id)}`
															}
															className='inline-block whitespace-nowrap max-w-[10rem] text-ellipsis overflow-hidden'
														>
															{product.title}
														</Link>
														<div className='flex items-center gap-1'>
															<p
																className='cursor-pointer'
																onClick={() => {
																	navigator.clipboard.writeText(
																		product.discount_code
																	),
																		setIsCopied(product.handle);
																}}
															>
																{product.discount_code}
															</p>
															<AiFillCopy
																className='cursor-pointer'
																onClick={() => {
																	navigator.clipboard.writeText(
																		product.discount_code
																	),
																		setIsCopied(product.handle);
																}}
															/>
															{isCopied === product.handle ? <p>Copied</p> : ''}
														</div>
													</h4>
													<p title='price per product'>
														{
															<>
																<del>
																	{priceCurrencyFormatter(
																		product.variants[0].price.amount,
																		product.variants[0].price.currencyCode
																	)}
																</del>
																&nbsp;
																<span className='text-bg-secondary-2'>
																	{priceCurrencyFormatter(
																		(
																			product.variants[0].price.amount -
																			(product.variants[0].price.amount *
																				product.discount_percentage) /
																				100
																		)
																			.toString()
																			.split('.')[0],
																		product.variants[0].price.currencyCode
																	)}
																</span>
															</>
														}
													</p>
												</header>
												<div className='flex flex-col sm:flex-row  items-center justify-between gap-1 h-full'>
													<p className='text-xs'>
														use the code and get {product.discount_percentage}%
													</p>
													<Button
														onClick={() =>
															addProductsToCheckoutAndCart.mutate({
																products: [{ ...product, quantity: 1 }]
															})
														}
													>
														{props.data &&
															props.data.upsellingSettings &&
															props.data.upsellingSettings[0].buttonText}
													</Button>
												</div>
											</div>
										</article>
									) : (
										''
									)}
								</>
							)}
						</>
				  ))}
			<Button
				{...(productsData.length === 0 ||
				!userCheckoutDetailsAndIdAndKey?.checkout?.webUrl
					? ''
					: {
							href: userCheckoutDetailsAndIdAndKey.checkout.webUrl
					  })}
				className='mt-5 w-full'
				classesIntent={{ w: 'full', display: 'flex-xy-center' }}
			>
				Checkout
			</Button>
		</Dialog>
	);
};

export default CheckoutPopup;
