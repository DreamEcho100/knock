'use client';
import { BsInfoCircleFill } from 'react-icons/bs';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '~/app/_components/shared/common/Tooltip';
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
import type { HTMLAttributes, ReactNode, SVGProps, CSSProperties } from 'react';
import { Suspense, useEffect, useTransition } from 'react';
import { useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiShoppingBag } from 'react-icons/hi';
import { commonClasses } from '../..';
import UserAuthButton from './components/UserAuthButton';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { initCart, redirectToCheckout } from '~/libs/shopify/actions/cart';
import {
	CartDiscountCodesPendingKey,
	CartLinePendingDeleteKey,
	CartLinePendingUpsertKey,
	cartStore,
} from '~/libs/shopify/stores/cart';
import { useStore } from 'zustand';
import { getProducts } from '~/libs/shopify';
import type { Cart, CartItem } from '~/libs/shopify/types';
import { generalStore } from '~/libs/stores/general';
import { cn } from '~/libs/utils';
import { APP_NAME } from '~/utils/core/constants';
const CartBannerDynamic = dynamic(() => import('./components/CartBanner'), {
	ssr: false,
});

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
	const [hasCartInitialSuccess, setHasCartInitialSuccess] = useState(false);

	const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
	const [isSmallScreenNaveOpen, setIsSmallScreenNaveOpen] = useState(false);
	// const [isCheckoutFound, setIsCheckoutFound] = useState(false);
	const cartState = useStore(cartStore, (state) => state.state);

	const initCartQuery = useQuery<
		Cart | undefined,
		Error,
		Cart | undefined,
		string[]
	>({
		queryKey: ['init-cart'],
		queryFn: async () => {
			cartStore.getState().setCartState('loading');

			return await initCart().then((result) => {
				if (result.type === 'error') {
					throw new Error(result.message);
				}

				return result.data;
			});
		},
	});

	const logoutUser = useLogoutUser();

	// const isBannerVisible = useStore(
	// 	generalStore,
	// 	(state) => state.isVisible.banner,
	// );

	const banner = useQuery({
		queryKey: ['banner-data'],
		queryFn: getBanner,
		refetchOnWindowFocus: true,
	});

	useEffect(() => {
		const main = document.querySelector('main');
		const mainHeader = document.getElementById('main-header');

		if (!main || !mainHeader) {
			return;
		}

		const resizeObserver = new ResizeObserver(() => {
			main.style.marginTop = `${mainHeader.clientHeight}px`;
		});

		resizeObserver.observe(mainHeader);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	useEffect(() => {
		if (hasCartInitialSuccess) {
			return;
		}

		if (initCartQuery.isLoading) {
			// toast.info('Loading the cart, please wait', { position: 'bottom-left' });
		} else if (initCartQuery.isSuccess) {
			cartStore.getState().initCart(initCartQuery.data);
			cartStore.getState().setCartState('active');
			// toast.success(
			// 	initCartQuery.data?.lines.length
			// 		? 'Cart Data Loaded!'
			// 		: 'Cart is active!',
			// 	{ position: 'bottom-left' },
			// );
			setHasCartInitialSuccess(true);
		} else if (initCartQuery.isError) {
			// toast.error(initCartQuery.error.message, { position: 'bottom-left' });
		}
	}, [
		initCartQuery.data,
		initCartQuery.error?.message,
		initCartQuery.isError,
		initCartQuery.isLoading,
		initCartQuery.isSuccess,
	]);

	return (
		<>
			{banner.data && !banner.data.disable && (
				<Suspense fallback={null}>
					<CartBannerDynamic data={banner.data} />
				</Suspense>
			)}
			<header
				id="main-header"
				className={`${commonClasses} bg-primary-1 z-10 fixed top-0 right-0 left-0 w-full flex flex-col`}
			>
				<div id="banner-container" className="empty:hidden w-full z-50" />
				<div
					className="relative w-full px-4 sm:px-8 max-w-[1280px] mx-auto"
					id="main-header-nav-and-actions"
				>
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
										? 'DRUMS THAT KNOCK'
										: APP_NAME.toUpperCase()
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
										href="/account"
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
										className={cn(
											'flex items-center justify-center',
											cartState === 'loading' || logoutUser.isPending
												? 'cursor-progress animate-pulse pointer-events-none'
												: '',
										)}
										onClick={() => logoutUser.mutate()}
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

function CartDisplayButton() {
	const cartProductsCount = useStore(
		cartStore,
		(state) => state.cart.totalQuantity,
	);

	const cartState = useStore(cartStore, (state) => state.state);

	return (
		<button
			title={
				cartState === 'loading'
					? 'Loading Cart'
					: cartState === 'idle'
						? 'Idle'
						: 'Cart'
			}
			className={cn(
				'flex items-center justify-center',
				cartState === 'loading'
					? 'cursor-progress animate-pulse'
					: cartState === 'idle'
						? 'animate-pulse cursor-wait'
						: '',
			)}
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

function RemoveItemButton(props: { lineItemId: string; isLoading: boolean }) {
	return (
		<button
			className={cx(
				'w-fit py-1 text-primary-3 hover:text-primary-2 focus:text-primary-1',
				'transition-all duration-150',
				props.isLoading
					? 'cursor-progress animate-pulse pointer-events-none'
					: '',
			)}
			onClick={() => {
				void cartStore.getState().updateCartItem('delete', props.lineItemId);
			}}
		>
			remove
		</button>
	);
}

function CartContainer({ banner }: { banner: any }) {
	// const isBannerVisible = useStore(
	// 	generalStore,
	// 	(state) => state.isVisible.banner,
	// );
	const [isPending, startTransition] = useTransition();
	const isCartVisible = useStore(cartStore, (state) => state.isOpen);

	const isUpdateOrDeletePending = useStore(
		cartStore,
		(state) =>
			state.pendingActions[CartLinePendingDeleteKey] ||
			state.pendingActions[CartLinePendingUpsertKey] ||
			isPending,
	);

	const subtotalAmount = useStore(
		cartStore,
		(state) => state.cart.cost.subtotalAmount,
	);

	const [isOpen, setIsOpen] = useState(false);

	const upselling = useQuery({
		queryKey: ['get-upselling-popup'],
		queryFn: getUpSellingPopup,
		refetchOnWindowFocus: true,
	});

	const productsData = useStore(cartStore, (state) => state.cart.lines);

	const discountCodes = useStore(
		cartStore,
		(state) => state.cart.discountCodes,
	);

	const { data } = useQuery({
		queryKey: ['all-products'],
		queryFn: () => getProducts(),
		refetchOnWindowFocus: true,
	});

	return (
		<>
			<div
				aria-hidden={!isCartVisible}
				className={cx(
					`fixed right-0 w-full h-full bg-primary-3/60 transition-all`,
					isCartVisible
						? 'duration-300'
						: 'pointer-events-none select-none opacity-0 duration-150',
				)}
				onClick={() => void cartStore.getState().toggleIsOpen()}
				id="cart-overlay"
			/>
			<div
				className={cn(
					'absolute right-0 transition-all flex justify-end w-[1280px] max-w-full mx-auto',
					'pointer-events-none',
				)}
			>
				<div
					className={cx(
						'h-fit max-h-[80vh] text-primary-1 bg-primary-4 w-[28rem] max-w-full p-8 origin-top',
						isCartVisible
							? 'scale-y-100 duration-150 pointer-events-auto'
							: 'scale-y-0 duration-75 opacity-0',
						'flex flex-col',
					)}
					id="cart-container"
				>
					<header className="pb-4">
						<h3 className="font-semibold uppercase text-h5">cart</h3>
					</header>
					<div className="flex flex-col gap-4 overflow-x-hidden overflow-y-auto">
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

									return (
										<article
											key={lineItem.id}
											className="flex border-b-[0.0625rem] border-b-primary-1 pb-4"
										>
											<div className="w-28 min-w-[4rem] aspect-square bg-primary-1 max-w-[30%] flex-shrink-0">
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
											<div className="flex flex-col flex-grow gap-2 p-4">
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
															onClick={() =>
																cartStore.getState().setIsOpen(false)
															}
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
														<CartItemDiscounts lineItem={lineItem} />
														<RemoveItemButton
															lineItemId={lineItem.id}
															isLoading={isUpdateOrDeletePending}
														/>
													</div>
												</div>
											</div>
										</article>
									);
								})}
					</div>
					<div className="flex flex-col gap-4 pt-8">
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
						<section className="flex flex-col gap-4">
							<section className="flex flex-col gap-2 hidden">
								<header className="flex flex-wrap gap-1">
									<h3 className="font-semibold capitalize text-sm">
										discounts
									</h3>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger>
												<BsInfoCircleFill className="size-3.5" />
											</TooltipTrigger>
											<TooltipContent className="bg-primary-4">
												<p id="describe-discount-code" className="leading-none">
													<em>
														Discount codes are case-insensitive <br /> and can
														be separated by commas, for example DE223,3232
													</em>
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</header>

								<form
									className="flex flex-col gap-1.5"
									// eslint-disable-next-line @typescript-eslint/no-misused-promises
									onSubmit={async (e) => {
										e.preventDefault();

										if (
											cartStore.getState().pendingActions[
												CartDiscountCodesPendingKey
											]
										) {
											return;
										}

										const target = e.target as HTMLFormElement;
										const formData = new FormData(target);
										const discountCods = (
											formData.get('discount-code') as string | undefined
										)?.split(/\s+,\s+/g);
										if (!discountCods || discountCods.length === 0) {
											return;
										}

										target.classList.add('group', 'loading');

										try {
											const result = await cartStore
												.getState()
												.updateCartDiscountCodes(discountCods);

											target.classList.remove('group', 'loading');

											if (result.type === 'error') {
												return toast.error(result.message);
											}

											target.reset();
										} catch (error) {
											console.error(error);
											toast.error('Error updating discounts');
											target.classList.remove('group', 'loading');
										}
									}}
								>
									<div className="flex flex-grow text-md">
										<input
											type="text"
											placeholder="Enter a discount code"
											name="discount-code"
											min={1}
											required
											aria-describedby="describe-discount-code"
											className="ring-[0.0625rem] focus:ring-[0.03125rem] focus:ring-inset ring-bg-secondary-1/50 px-2 py-0.5 outline-none flex-grow"
										/>
										<Button
											classesIntent={{
												w: 'fit',
												display: 'flex-xy-center',
												rounded: null,
												p: 'wide',
											}}
											className={
												'group-[.loading]:opacity-50 group-[.loading]:cursor-not-allowed' +
												' ring-[0.0625rem] focus:ring-[0.03125rem] focus:ring-inset ring-bg-secondary-1/50 capitalize text-sm'
											}
										>
											apply
										</Button>
									</div>
								</form>

								<div className="flex flex-wrap gap-2 items-center">
									{discountCodes.map((code) => {
										return (
											<Chip
												key={code.code}
												className={code.code ? ' pe-0' : ''}
												isActive={code.applicable}
												animatedTitle={
													<span className="text-nowrap">
														{code.applicable ? 'Applicable' : 'Not Applicable'}
													</span>
												}
												start={<TagIcon className="flex-shrink-0 size-3.5" />}
												end={
													code.code && (
														<button
															className="text-primary-3 px-2 hover:bg-primary-3/70 focus:bg-primary-3/70 transition-colors duration-100 h-full"
															onClick={() => {
																const currentDiscounts =
																	cartStore.getState().cart.discountCodes;

																if (
																	cartStore.getState().pendingActions[
																		CartDiscountCodesPendingKey
																	]
																) {
																	return;
																}

																void cartStore
																	.getState()
																	.updateCartDiscountCodes(
																		currentDiscounts
																			.filter(
																				(discount) =>
																					discount.code !== code.code,
																			)
																			.map((discount) => discount.code),
																	);
															}}
														>
															&times;
														</button>
													)
												}
											>
												<p>{code.code}</p>
											</Chip>
										);
									})}
								</div>
							</section>

							<h3 className="flex flex-wrap items-center justify-between gap-x-2 leading-none">
								<span className="inline-block font-semibold uppercase text-h5">
									subtotal
								</span>
								<span className="inline-block">
									{priceCurrencyFormatter(
										subtotalAmount.amount,
										subtotalAmount.currencyCode,
									)}
								</span>
							</h3>
						</section>
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
								disabled={productsData.length === 0}
								classesIntent={{
									w: 'full',
									display: 'flex-xy-center',
									isLoading: isUpdateOrDeletePending,
								}}
							>
								{productsData.length === 0 ? 'Cart Is Empty' : 'Checkout'}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function TagIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 14 14"
			focusable="false"
			aria-hidden="true"
			{...props}
		>
			<path
				strokeLinecap="round"
				d="M7.284 1.402h4.964a.35.35 0 0 1 .35.35v4.964a.7.7 0 0 1-.205.495L7.49 12.115a.7.7 0 0 1-.99 0L1.885 7.5a.7.7 0 0 1 0-.99L6.79 1.607a.7.7 0 0 1 .495-.205Z"
			></path>
			<circle cx="9.1" cy="4.9" r="0.7"></circle>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9.102 4.897h-.005v.005h.005v-.005Z"
			></path>
		</svg>
	);
}

function Chip({
	start,
	end,
	children,
	variant,
	isActive,
	animatedTitle,
	...props
}: {
	start?: ReactNode;
	end?: ReactNode;
	animatedTitle?: ReactNode;
	variant?: 'primary' | 'secondary';
	isActive?: boolean;
} & HTMLAttributes<HTMLDivElement>) {
	const _variant =
		variant === 'secondary'
			? 'bg-primary-5 text-text-primary-1 fill-text-primary-1'
			: 'bg-primary-2 text-text-primary-1 fill-text-primary-1';

	const activeBorder = isActive ? ' border border-primary-1' : '';

	return (
		<div className="group chip relative flex items-center ">
			{animatedTitle && (
				<small
					className={
						'max-w-full max-h-full px-1 rounded-t-md w-fit transition-transform duration-300 delay-300 absolute top-0 inset-x-1/2 -translate-x-1/2 group-[.chip:hover]:-translate-y-full group-[.chip:hover]:-translate-x-1/2' +
						`${_variant ? ` ${_variant}` : ''}` +
						`${activeBorder ? ` ${activeBorder}` : ''}`
					}
				>
					{animatedTitle}
				</small>
			)}
			<div
				{...props}
				className={
					'relative flex items-center gap-1 px-2 text-sm rounded-2xl overflow-hidden' +
					(props.className ? ` ${props.className}` : '') +
					`${_variant ? ` ${_variant}` : ''}` +
					`${activeBorder ? ` ${activeBorder}` : ''}`
				}
			>
				{start}
				{children}
				{end}
			</div>
		</div>
	);
}

function CartItemDiscounts({ lineItem }: { lineItem: CartItem }) {
	const activeDiscountAllocations = lineItem.discountAllocations.filter(
		(discountAllocation) => +discountAllocation.discountedAmount.amount !== 0,
	);

	if (activeDiscountAllocations.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-wrap gap-2 items-center p-1">
			{activeDiscountAllocations.map((discountAllocation) => {
				const formattedPrice = priceCurrencyFormatter(
					discountAllocation.discountedAmount.amount,
					discountAllocation.discountedAmount.currencyCode,
				);

				return (
					<Chip
						key={discountAllocation.code ?? discountAllocation.title}
						title={formattedPrice}
						className={discountAllocation.code ? ' pe-0' : ''}
						animatedTitle={formattedPrice}
						isActive
						variant="secondary"
						start={<TagIcon className="flex-shrink-0 size-3.5" />}
						end={
							discountAllocation.code && (
								<button
									className="text-primary-3 px-2 hover:bg-primary-3/70 focus:bg-primary-3/70 transition-colors duration-100 h-full"
									onClick={() => {
										const currentDiscounts =
											cartStore.getState().cart.discountCodes;

										if (
											cartStore.getState().pendingActions[
												CartDiscountCodesPendingKey
											]
										) {
											return;
										}

										void cartStore
											.getState()
											.updateCartDiscountCodes(
												currentDiscounts
													.filter(
														(discount) =>
															discount.code !== discountAllocation.code,
													)
													.map((discount) => discount.code),
											);
									}}
								>
									&times;
								</button>
							)
						}
					>
						<p>{discountAllocation.code ?? discountAllocation.title}</p>
					</Chip>
				);
			})}
		</div>
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
