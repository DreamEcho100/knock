'use client';
import {
	type Dispatch,
	Fragment,
	type SetStateAction,
	useEffect,
	useState,
	useTransition,
} from 'react';
import Dialog from '../Dialog';
import Link from 'next/link';
import CustomNextImage from '../CustomNextImage';
import { priceCurrencyFormatter } from '~/utils/core/shopify';
import Button from '~/app/_components/shared/core/Button';
import { AiFillCopy } from 'react-icons/ai';
import { useStore } from 'zustand';
import { cartStore } from '~/libs/shopify/stores/cart';
import { redirectToCheckout } from '~/libs/shopify/actions/cart';
import { type Product } from '~/libs/shopify/types';

interface UpSell {
	id?: string;
	handle: string;
	hasDiscount: boolean;
	discount_code: string;
	discount_percentage: number;
	position: number;
}

const CheckoutPopup = (props: {
	data: any;
	products: Product[];
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
}) => {
	const [interestedProduct, setInterestedProduct] = useState<
		(Product & UpSell)[]
	>([]);
	const [isCopied, setIsCopied] = useState<string | null>(null);

	const isCartVisible = useStore(cartStore, (state) => state.isOpen);
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		if (props.data.upselling.length) {
			const filterUpSellingProduct: (Product & UpSell)[] = [];

			for (const upsell of props.data.upselling as UpSell[]) {
				const filter = props.products?.find(
					(el) => el.handle === upsell.handle,
				);

				if (!filter) continue;

				delete upsell.id;
				filterUpSellingProduct.push({
					...filter,
					...upsell,
				});
			}

			if (filterUpSellingProduct.length) {
				setInterestedProduct(filterUpSellingProduct);
			} else {
				setInterestedProduct([]);
			}
		}
	}, [props.data.upselling, props.products]);

	const cartItemsHandlesStr = useStore(cartStore, (state) =>
		state.cart.lines.map((el) => el.merchandise.product.handle).join(','),
	);
	const cartSize = useStore(cartStore, (state) => state.cart.totalQuantity);

	return (
		<Dialog
			isOpen={props.isOpen}
			setIsOpen={props.setIsOpen}
			header={{
				title: 'You May Be Also Interested in',
			}}
		>
			{!interestedProduct.length
				? ''
				: interestedProduct.map((product) => {
						const defaultVariant = product.variants[0];

						if (!defaultVariant) return null;

						const isProductInCart = cartItemsHandlesStr.includes(
							product.handle,
						);

						return (
							<Fragment key={product.id}>
								{!product.title.endsWith('(PIB)') ? (
									<article
										key={product.id}
										className="flex mt-3  border-b-[0.0625rem] border-b-primary-1 pb-4"
									>
										<div className="w-28 min-w-[4rem] aspect-square bg-primary-1 max-w-[30%]">
											{product.featuredImage.url && (
												<CustomNextImage
													src={product.featuredImage.url}
													alt={product.featuredImage.altText || ''}
													width={112}
													height={112}
													className="object-contain w-full h-full aspect-square"
												/>
											)}
										</div>
										<div className="flex flex-col flex-grow gap-2 px-4 py-2">
											<header className="flex  flex-col gap-1 sm:flex-row sm:gap-2 sm:justify-between">
												<h4 className="max-w-[15rem]">
													<Link
														href={
															product.handle === 'knock-plugin'
																? '/knock'
																: product.handle === 'knock-clipper'
																	? '/knock-clipper'
																	: `/products/${product.handle}`
														}
													>
														{product.title}
													</Link>
													{product.hasDiscount ? (
														<div className="flex items-center gap-1">
															<p
																className="cursor-pointer"
																onClick={() => {
																	void navigator.clipboard.writeText(
																		product.discount_code,
																	),
																		setIsCopied(product.handle);
																}}
															>
																{product.discount_code}
															</p>
															<AiFillCopy
																className="cursor-pointer"
																onClick={() => {
																	void navigator.clipboard.writeText(
																		product.discount_code,
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
												<p title="price per product">
													{
														<>
															<del>
																{priceCurrencyFormatter(
																	defaultVariant.compareAtPrice
																		? defaultVariant.compareAtPrice.amount
																		: defaultVariant.price.amount,
																	defaultVariant.compareAtPrice
																		? defaultVariant.compareAtPrice.currencyCode
																		: defaultVariant.price.currencyCode,
																)}
															</del>
															&nbsp;
															<span className="text-bg-secondary-2">
																{defaultVariant?.compareAtPrice?.amount
																	? priceCurrencyFormatter(
																			(
																				+defaultVariant.compareAtPrice.amount -
																				(+defaultVariant.compareAtPrice.amount *
																					product.discount_percentage) /
																					100
																			)
																				.toString()
																				.split('.')[0],
																			defaultVariant.compareAtPrice
																				.currencyCode,
																		)
																	: priceCurrencyFormatter(
																			(
																				+defaultVariant.price.amount -
																				(+defaultVariant.price.amount *
																					product.discount_percentage) /
																					100
																			)
																				.toString()
																				.split('.')[0],
																			defaultVariant.price.currencyCode,
																		)}
															</span>
														</>
													}
												</p>
											</header>
											<div className="flex flex-col sm:flex-row  items-end justify-between gap-1 h-full">
												<p className="text-xs w-[50%]">
													{product.hasDiscount
														? `Use the above code to get ${product.discount_percentage?.toFixed(
																0,
															)}% off`
														: `Product is ${
																product.discount_percentage?.toFixed(0) || 0
															}% off`}
												</p>
												{isProductInCart ? (
													<Button
														onClick={() =>
															!isCartVisible
																? cartStore.getState().setIsOpen(true)
																: null
														}
														className="text-sm px-1 capitalize"
													>
														in cart
													</Button>
												) : (
													<Button
														onClick={() => {
															debugger;
															void cartStore
																.getState()
																.upsertCartItem(defaultVariant, product);
															cartStore.getState().setIsOpen(true);
														}}
														className="text-sm px-1"
													>
														{props.data?.upsellingSettings?.[0].buttonText}
													</Button>
												)}
											</div>
										</div>
									</article>
								) : (
									''
								)}
							</Fragment>
						);
					})}
			<Button
				{...(cartSize === 0
					? ''
					: {
							onClick: () => {
								startTransition(async () => {
									await redirectToCheckout();
								});
							},
						})}
				className="mt-5 w-full"
				classesIntent={{ w: 'full', display: 'flex-xy-center' }}
				disabled={isPending}
			>
				Continue to Checkout
			</Button>
		</Dialog>
	);
};

export default CheckoutPopup;
