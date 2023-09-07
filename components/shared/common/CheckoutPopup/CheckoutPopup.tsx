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
import { customerGlobalActions } from '@context/Customer/actions';

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
			const filterUpSellingsProduct: any = props.data.upselling.map(
				(upsell: any) => {
					const filter =
						props.products &&
						props.products.find((el: any) => el.handle === upsell.handle);
					delete upsell.id;
					return {
						...filter,
						...upsell
					};
				}
			);

			if (filterUpSellingsProduct.length) {
				setInterestedProduct(filterUpSellingsProduct);
			} else {
				setInterestedProduct([]);
			}
		}
	}, [props.data.upselling, props.products]);

	const addProductsToCheckoutAndCart = useAddProductsToCheckoutAndCart();

	const userCheckoutDetailsAndIdAndKey = useGetUserCheckoutDetailsAndIdAndKey();

	const cartProduct = productsData.map((el) => el.variant.product.handle);

	return (
		<Dialog
			isOpen={props.isOpen}
			setIsOpen={props.setIsOpen}
			header={{
				title: 'You May Be Also Interested in'
			}}
		>
			{!interestedProduct.length
				? ''
				: interestedProduct.map((product: any, index: any) => (
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
											<h4 className='max-w-[15rem]'>
												<Link
													href={
														product.handle === 'knock-plugin'
															? '/knock'
															: product.handle === 'knock-clipper'
															? '/knock-clipper'
															: `/products/${getIdFromGid(product.id)}`
													}
												>
													{product.title}
												</Link>
												{product.hasDiscount ? (
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
												) : (
													''
												)}
											</h4>
											<p title='price per product'>
												{
													<>
														<del>
															{priceCurrencyFormatter(
																product.variants[0].compareAtPrice
																	? product.variants[0].compareAtPrice.amount
																	: product.variants[0].price.amount,
																product.variants[0].compareAtPrice
																	? product.variants[0].compareAtPrice
																			.currencyCode
																	: product.variants[0].price.currencyCode
															)}
														</del>
														&nbsp;
														<span className='text-bg-secondary-2'>
															{product.variants[0].compareAtPrice
																? priceCurrencyFormatter(
																		(
																			product.variants[0].compareAtPrice
																				.amount -
																			(product.variants[0].compareAtPrice
																				.amount *
																				product.discount_percentage) /
																				100
																		)
																			.toString()
																			.split('.')[0],
																		product.variants[0].compareAtPrice
																			.currencyCode
																  )
																: priceCurrencyFormatter(
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
										<div className='flex flex-col sm:flex-row  items-end justify-between gap-1 h-full'>
											<p className='text-xs w-[50%]'>
												{product.hasDiscount
													? `Use the above code to get ${product.discount_percentage?.toFixed(
															0
													  )}% off`
													: `Product is ${
															product.discount_percentage?.toFixed(0) || 0
													  }% off`}
											</p>
											{cartProduct.includes(product.handle) ? (
												<Button
													onClick={() => {
														!isCartVisible
															? customerGlobalActions.setIsVisibleOnly(
																	customerDispatch,
																	'headerCart'
															  )
															: null;
													}}
													className='text-sm px-1 capitalize'
												>
													in cart
												</Button>
											) : (
												<Button
													onClick={() => {
														addProductsToCheckoutAndCart.mutate({
															products: [{ ...product, quantity: 1 }]
														});
														customerGlobalActions.setIsVisibleOnly(
															customerDispatch,
															'headerCart'
														);
													}}
													className='text-sm px-1'
												>
													{props.data &&
														props.data.upsellingSettings &&
														props.data.upsellingSettings[0].buttonText}
												</Button>
											)}
										</div>
									</div>
								</article>
							) : (
								''
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
				Continue to Checkout
			</Button>
		</Dialog>
	);
};

export default CheckoutPopup;
