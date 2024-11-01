'use client';
import CustomNextImage from '~/app/_components/shared/common/CustomNextImage';
import Button from '~/app/_components/shared/core/Button';
import Logo from '~/app/_components/shared/core/Logo';
import { useQuery } from '@tanstack/react-query';
import { getBanner, getUpSellingPopup } from '~/utils/core/API';
import { useGetUserDataFromStore, useLogoutUser } from '~/utils/core/hooks';
import { priceCurrencyFormatter } from '~/utils/core/shopify';
import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTransition, type CSSProperties } from 'react';
import { useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiShoppingBag } from 'react-icons/hi';
import { commonClasses } from '../..';
import UserAuthButton from './components/UserAuthButton';
import { AiFillCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { initCart, redirectToCheckout } from '~/libs/shopify/actions/cart';
import {
	CartLinePendingDeleteKey,
	CartLinePendingUpdateKey,
	cartStore,
} from '~/libs/shopify/stores/cart';
import { useStore } from 'zustand';
import { getProduct, getProducts } from '~/libs/shopify';
import type { CartItem, ShopifyProduct } from '~/libs/shopify/types';
import { reshapeShopifyProduct } from '~/libs/shopify/utils';
import { generalStore } from '~/libs/stores/general';

const CheckoutPopupDynamic = dynamic(
	() => import('~/app/_components/shared/common/CheckoutPopup/CheckoutPopup'),
	{ ssr: false },
);

const linkClasses = ({
	isActive,
	keepCase,
}: {
	isActive?: boolean;
	keepCase?: boolean;
} = {}) => `border-b border-transparent outline-none
duration-150 transition-all
${keepCase ? '' : 'uppercase'}
	${
		isActive
			? 'text-bg-secondary-1 focus:border-b-bg-secondary-1'
			: 'text-primary-2 focus:border-b-text-primary-1 hover:text-primary-1'
	}`;

const headerLinks = [
	{ href: '/knock', text: 'knock' },
	{ href: '/knock-clipper', text: 'KNOCK Clipper', keepCase: true },
	{ href: '/drums-that-knock', text: 'drums that knock' },
	{ href: '/faqs', text: 'FAQs', keepCase: true },
];

const MainHeader = () => {
	const { user } = useGetUserDataFromStore();
	const pathname = usePathname();

	const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
	const [isSmallScreenNaveOpen, setIsSmallScreenNaveOpen] = useState(false);
	// const [isCheckoutFound, setIsCheckoutFound] = useState(false);

	useQuery(['init-cart'], initCart, {
		// @ts-expect-error - should handle the user associated with the cart
		// enabled: !userCheckoutIdAndKeyFromCookie,
		onSuccess: cartStore.getState().initCart,
	});

	const logoutUser = useLogoutUser();
	const isBannerVisible = useStore(
		generalStore,
		(state) => state.isVisible.banner,
	);

	const banner = useQuery(['banner-data'], getBanner, {
		refetchOnWindowFocus: true,
	});

	return (
		<>
			<CartBanner data={banner.data} />
			<header
				id="main-header"
				className={`${commonClasses} bg-primary-1 z-10 fixed ${
					isBannerVisible && banner.data && !banner.data.disable
						? 'top-14'
						: 'top-0'
				} right-0 left-0 w-full flex flex-col`}
			>
				<div className="relative w-full px-4 mx-auto sm:px-8">
					<div
						className="relative z-10 flex justify-between gap-2 h-main-nav-h sm:gap-4 text-primary-2 lg:grid"
						style={{
							gridTemplateColumns: '12rem 1fr 12rem',
						}}
					>
						<div
							className="flex items-center justify-center text-primary-1"
							style={{ '--sup-t': '0ch' } as CSSProperties}
						>
							<Logo
								onClick={() => setIsSmallScreenNaveOpen(false)}
								whatKnocks={
									pathname &&
									(pathname.startsWith('/products/[productHandle]') ||
										pathname.startsWith('/drums-that-knock'))
										? 'DRUMS THAT'
										: undefined
								}
							/>
						</div>
						<nav className="hidden lg:flex lg:justify-center">
							<ul className="flex items-center justify-center gap-10 font-semibold text-center">
								{headerLinks.map((link) => (
									<li key={link.text}>
										<Link
											href={link.href}
											className={linkClasses({
												isActive: link.href === pathname,
												keepCase: link.keepCase,
											})}
										>
											{link.text}
										</Link>
									</li>
								))}
							</ul>
						</nav>
						<ul className="flex items-center justify-end gap-2 sm:gap-4">
							<li className="block lg:hidden">
								<button
									onClick={() => setIsSmallScreenNaveOpen((prev) => !prev)}
									title={`press or click to ${
										isSmallScreenNaveOpen ? 'hide' : 'show'
									} the nav menu`}
									className="flex items-center justify-center"
								>
									<GiHamburgerMenu className="text-xl" />
								</button>
							</li>
							<li>
								{!user?.data ? (
									<UserAuthButton
										isOpen={isRegisterDialogOpen}
										setIsOpen={setIsRegisterDialogOpen}
									/>
								) : (
									<Link
										// href={`/customers/${getIdFromGid(user.data.id)}`}
										href="/account/profile"
										title="profile"
										className="flex items-center justify-center text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600"
									>
										<BsFillPersonFill className="text-xl" />
									</Link>
								)}
							</li>
							<li>
								<CartDisplayButton />
							</li>
							{user?.data && (
								<li>
									<button
										title="cart"
										className="flex items-center justify-center disabled:bg-slate-400"
										onClick={() => logoutUser.mutate()}
										disabled={logoutUser.isLoading}
									>
										logout
									</button>
								</li>
							)}
						</ul>
					</div>
					<div
						aria-hidden={!isSmallScreenNaveOpen}
						className={`mt-main-nav-h bg-primary-1 block lg:hidden overflow-hidden absolute top-0 right-0 left-0 w-full ${
							isSmallScreenNaveOpen
								? // ? 'scale-y-100'
									// : 'scale-y-0 opacity-0 pointer-events-none'
									'translate-y-0'
								: '-translate-y-full opacity-0 pointer-events-none select-none' // mt-0
						}
				origin-top
				transition-all duration-300`}
					>
						<nav className="flex">
							<ul
								className={cx(
									'flex flex-col gap-2 font-semibold px-4 sm:px-8 pt-0 pb-4  w-full text-xl',
									'sm:text-size-inherit sm:gap-4',
								)}
							>
								{headerLinks.map((link) => (
									<li key={link.text} className="w-full">
										<Link
											href={link.href}
											className={`${linkClasses({
												isActive: link.href === pathname,
												keepCase: link.keepCase,
											})} block w-fit`}
											onClick={() => setIsSmallScreenNaveOpen(false)}
										>
											{link.text}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>
					<CartContainer banner={banner.data} />
				</div>
			</header>
		</>
	);
};

export default MainHeader;

function CartBanner({ data }: { data?: any }) {
	const isBannerVisible = useStore(
		generalStore,
		(state) => state.isVisible.banner,
	);

	if (!isBannerVisible || !data || !data.disable) {
		return null;
	}

	const bannerId = data?.bannerUrl.split('/')[1];
	const addToCart = async () => {
		if (parseInt(bannerId)) {
			try {
				const data = await axios
					.get(`/api/products/product?id=${bannerId}`)
					.then((res) =>
						reshapeShopifyProduct(res.data.product as ShopifyProduct),
					);

				if (!data?.variants[0]) {
					throw new Error('Product not found');
				}

				await cartStore.getState().upsertCartItem(data?.variants[0], data);
			} catch (error) {
				if (error.response) {
					return toast.warn('Product not found');
				}
			}
		} else {
			try {
				const data = await getProduct(
					bannerId === 'knock' ? 'knock-plugin' : bannerId,
				);

				if (!data?.variants[0]) {
					throw new Error('Product not found');
				}

				await cartStore.getState().upsertCartItem(data?.variants[0], data);
			} catch (error) {
				if (error.response) {
					return toast.warn(error.response.data.message);
				}
			}
		}
	};

	return (
		<div
			style={{ background: data.background }}
			className={`${commonClasses} z-10 fixed ${
				isBannerVisible ? 'h-14' : 'h-0'
			}  right-0 left-0 w-full flex items-center justify-center`}
			id="test2"
		>
			<div>
				<div
					className="flex flex-col items-center gap-0 md:flex-row md:gap-3"
					style={{ color: data.textColor }}
				>
					{data.text ? <h4>{data.text}</h4> : ''}
					{data.bannerUrlText &&
						(!data.isAddToCartButton ? (
							<div>
								<Link
									href={
										Number(bannerId) ? '/products/' + bannerId : data.bannerUrl
									}
									className="px-5 border text-bold rounded-3xl"
								>
									{data.bannerUrlText}
								</Link>
							</div>
						) : (
							<button
								className="px-5 border text-bold rounded-3xl"
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onClick={addToCart}
							>
								{data.bannerUrlText}
							</button>
						))}
				</div>
			</div>
			<button
				onClick={() => generalStore.getState().setIsVisible('banner', false)}
				type="button"
				className="absolute right-0 hidden p-4 sm:block"
			>
				<AiFillCloseCircle
					id="AiFillCloseCircle"
					style={{ color: data.textColor }}
				/>
			</button>
		</div>
	);
}

function CartDisplayButton() {
	const cartProductsCount = useStore(
		cartStore,
		(state) => state.cart.totalQuantity,
	);

	return (
		<button
			title="cart"
			className="flex items-center justify-center"
			onClick={() => {
				cartStore.getState().toggleIsOpen();
				generalStore.getState().setIsVisible('marketingPopup', false);
			}}
		>
			<span className="relative">
				<HiShoppingBag
					className={cx(
						'text-xl',
						'duration-300 transition-all',
						cartProductsCount === 0
							? ''
							: 'relative -translate-y-[20%] -translate-x-[20%] text-opacity-0',
					)}
				/>
				<span
					className={cx(
						'text-sm absolute top-0 text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600  font-black p-2 bg-opacity-70 rounded-full',
						'duration-300 transition-all',
						cartProductsCount === 0 ? '' : 'top-0 left-1/4  -translate-x-[15%]',
					)}
				>
					{cartProductsCount}
				</span>
			</span>
		</button>
	);
}

function CartContainer({ banner }: { banner: any }) {
	const isBannerVisible = useStore(
		generalStore,
		(state) => state.isVisible.banner,
	);
	const [isPending, startTransition] = useTransition();
	const isCartVisible = useStore(cartStore, (state) => state.isOpen);

	const disableAllButtons = useStore(
		cartStore,
		(state) =>
			state.pendingActions[CartLinePendingDeleteKey] ||
			state.pendingActions[CartLinePendingUpdateKey] ||
			isPending,
	);

	// const [isCartHasAutomaticDiscount, setIsCartHasAutomaticDiscount] =
	// 	useState(false);
	// const cartSize = useStore(cartStore, (state) => state.cart.totalQuantity);
	// useEffect(() => {
	// 	if (cartSize === 0) {
	// 		return;
	// 	}
	// 	cartStore.getState().cart.lines.map((el) => {
	// 		if (el.discountAllocations.length > 0) {
	// 			setIsCartHasAutomaticDiscount(true);
	// 		} else {
	// 			setIsCartHasAutomaticDiscount(false);
	// 		}
	// 	});
	// }, [cartSize]);

	const productsTotalPrice = useStore(
		cartStore,
		(state) => state.cart.cost.totalAmount.amount,
	);

	const [isOpen, setIsOpen] = useState(false);

	const upselling = useQuery(['get-upselling-popup'], getUpSellingPopup, {
		refetchOnWindowFocus: true,
	});

	const productsData = useStore(cartStore, (state) => state.cart.lines);

	const { data } = useQuery(['all-products'], () => getProducts(), {
		refetchOnWindowFocus: true,
	});

	return (
		<>
			<div
				aria-hidden={!isCartVisible}
				className={cx(
					`fixed translate-y-main-nav-h ${
						!banner?.disable && isBannerVisible ? 'top-14' : 'top-0'
					} right-0 w-full h-full bg-primary-3 bg-opacity-60 transition-all`,
					isCartVisible
						? 'duration-300'
						: 'pointer-events-none select-none opacity-0 duration-150',
				)}
				onClick={() => void cartStore.getState().toggleIsOpen()}
			></div>
			<div
				className={cx(
					'absolute translate-y-main-nav-h top-0 right-0 h-fit max-h-[80vh] text-primary-1 bg-primary-4 w-[28rem] max-w-full origin-top transition-all p-8',
					isCartVisible
						? 'scale-y-100 duration-150'
						: 'scale-y-0 duration-75 opacity-0',
					'flex flex-col',
				)}
			>
				<header className="pb-4">
					<h3 className="font-semibold uppercase text-h5">cart</h3>
				</header>
				<div className="flex flex-col gap-4 overflow-auto">
					{productsData.length === 0
						? "You don't have any items in your cart yet."
						: productsData.map((lineItem) => {
								const selectedOptionHandle =
									lineItem.merchandise.selectedOptions[0];

								const selectedVariant =
									lineItem.merchandise.product.variants.find(
										(variant) => variant.title === selectedOptionHandle.value,
									);

								if (!selectedVariant) {
									return null;
								}

								const currencyCode = lineItem.cost.totalAmount.currencyCode;

								return (
									<article
										key={lineItem.id}
										className="flex border-b-[0.0625rem] border-b-primary-1 pb-4"
									>
										<div className="w-28 min-w-[4rem] aspect-square bg-primary-1 max-w-[30%]">
											{lineItem.merchandise.product.featuredImage && (
												<CustomNextImage
													src={lineItem.merchandise.product.featuredImage.url}
													alt={
														lineItem.merchandise.product.featuredImage.altText
													}
													width={112}
													height={112}
													className="object-contain w-full h-full aspect-square"
												/>
											)}
										</div>
										<div className="flex flex-col flex-grow gap-2 px-4 py-2">
											<header className="flex flex-col gap-1 sm:flex-row sm:gap-2 sm:justify-between">
												<h4>
													<Link
														href={
															lineItem.merchandise.product.handle ===
															'knock-plugin'
																? '/knock'
																: lineItem.merchandise.product.handle ===
																	  'knock-clipper'
																	? '/knock-clipper'
																	: `/products/${lineItem.merchandise.product.handle}`
														}
														className="inline-block whitespace-nowrap max-w-[10rem] text-ellipsis overflow-hidden"
														onClick={() => cartStore.getState().toggleIsOpen()}
													>
														{lineItem.merchandise.product.title}
													</Link>
												</h4>
												<LineItemPrice data={lineItem} />
											</header>
											<div className="flex flex-col gap-1 sm:flex-row sm:gap-2 sm:justify-between">
												{/* <div className='w-fit border-[0.125rem] border-bg-secondary-1 rounded-2xl p-1 flex gap-3'>
                            <button
                                className='px-3'
                                title='decrease the amount by 1'
                                disabled={disableAllButtons}
                                onClick={() => {
                                    if (product.quantity - 1 === 0)
                                        return removeProductsToCheckoutAndCart.mutate({
                                            productsIds: [product.id]
                                        });

                                    updateProductsToCheckoutAndCart.mutate({
                                        products: [
                                            {
                                                ...(product as any),
                                                quantity: product.quantity - 1
                                            }
                                        ]
                                    });
                                }}
                            >
                                -
                            </button>
                            <p>{product.quantity}</p>
                            <button
                                className='px-3'
                                title='increase the amount by 1'
                                disabled={disableAllButtons}
                                onClick={() =>
                                    updateProductsToCheckoutAndCart.mutate({
                                        products: [
                                            {
                                                ...(product as any),
                                                quantity: product.quantity + 1
                                            }
                                        ]
                                    })
                                }
                            >
                                +
                            </button>
                        </div> */}
												<div className="flex flex-col">
													{lineItem.discountAllocations.length ? (
														<div className="flex items-center border border-[#666666] p-1 gap-2 text-[#666666] ">
															<span className="w-[15px] ">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	viewBox="0 0 14 14"
																	focusable="false"
																	aria-hidden="true"
																	className="fill-[#666666]"
																>
																	<path
																		stroke-linecap="round"
																		d="M7.284 1.402h4.964a.35.35 0 0 1 .35.35v4.964a.7.7 0 0 1-.205.495L7.49 12.115a.7.7 0 0 1-.99 0L1.885 7.5a.7.7 0 0 1 0-.99L6.79 1.607a.7.7 0 0 1 .495-.205Z"
																	></path>
																	<circle cx="9.1" cy="4.9" r="0.7"></circle>
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		d="M9.102 4.897h-.005v.005h.005v-.005Z"
																	></path>
																</svg>
															</span>
															<span>
																<p className="text-xs">
																	{lineItem.discountAllocations[0].title}
																</p>
															</span>
														</div>
													) : (
														''
													)}
													<button
														className={cx(
															'w-fit py-1 text-primary-3 hover:text-primary-2 focus:text-primary-1',
															'transition-all duration-150',
														)}
														disabled={disableAllButtons}
														onClick={() => {
															void cartStore
																.getState()
																.updateCartItem('delete', lineItem.id);
														}}
													>
														remove
													</button>
												</div>
											</div>
										</div>
									</article>
								);
							})}
				</div>
				<div className="flex flex-col gap-8 pt-8">
					{upselling.data?.upselling?.length && data ? (
						<CheckoutPopupDynamic
							data={upselling.data}
							products={data}
							setIsOpen={setIsOpen}
							isOpen={isOpen}
						/>
					) : (
						''
					)}
					<header className="flex justify-between gap-2">
						<h3 className="font-semibold uppercase text-h5">subtotal</h3>
						<p title="price per product">${productsTotalPrice}</p>
					</header>
					<div>
						<Button
							{...(productsData.length === 0
								? ''
								: !upselling.data
									? {
											onClick: () => {
												startTransition(async () => {
													await redirectToCheckout();
												});
											},
										}
									: !upselling.data.upselling.length
										? {
												onClick: () => {
													startTransition(async () => {
														await redirectToCheckout();
													});
												},
											}
										: upselling.data?.success &&
											  upselling.data.upsellingSettings[0].disable
											? {
													onClick: () => {
														startTransition(async () => {
															await redirectToCheckout();
														});
													},
												}
											: {
													onClick: () => {
														setIsOpen(true);
													},
												})}
							// onClick={() => {
							// 	startTransition(async () => {
							// 		await redirectToCheckout();
							// 	});
							// }}
							disabled={productsData.length === 0 || disableAllButtons}
							classesIntent={{ w: 'full', display: 'flex-xy-center' }}
						>
							{productsData.length === 0 ? 'Cart Is Empty' : 'Checkout'}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

function LineItemPrice({ data }: { data: CartItem }) {
	const currencyCode = data.cost.totalAmount.currencyCode;

	if (data.discountAllocations.length) {
		<p title="price per product" className="text-bg-secondary-2">
			{priceCurrencyFormatter(
				(
					+data.cost.totalAmount.amount -
					data.discountAllocations.reduce(
						(sum, discount) => sum + +discount.discountedAmount.amount,
						0,
					)
				).toString(),
				currencyCode,
			)}
		</p>;
	}

	const selectedVariant = data.merchandise.product.variants.find(
		(variant) => variant.title === data.merchandise.selectedOptions[0].value,
	);

	if (selectedVariant?.compareAtPrice) {
		return (
			<p title="price per product">
				<del>
					{priceCurrencyFormatter(
						selectedVariant.compareAtPrice.amount,
						currencyCode,
					)}
				</del>
				&nbsp;
				<span className="text-bg-secondary-2">
					{priceCurrencyFormatter(selectedVariant.price.amount, currencyCode)}
				</span>
			</p>
		);
	}

	return (
		<p>{priceCurrencyFormatter(data.cost.totalAmount.amount, currencyCode)}</p>
	);
}
