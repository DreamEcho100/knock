import CustomNextImage from '@components/shared/common/CustomNextImage';
import Button from '@components/shared/core/Button';
import Logo from '@components/shared/core/Logo';
import { useSharedCustomerState } from '@context/Customer';
import { customerGlobalActions } from '@context/Customer/actions';
import { useQuery } from '@tanstack/react-query';
import { setCookie } from '@utils/common/storage/cookie/document';
import { checkoutApi } from '@utils/core/API';
import {
	useGetUserCheckoutDetailsAndIdAndKey,
	useGetUserCheckoutIdAndKeyCookie,
	useGetUserDataFromStore,
	useLogoutUser,
	useRemoveProductsToCheckoutAndCart,
	useUpdateProductsToCheckoutAndCart
} from '@utils/core/hooks';
import { convertProductToCartItem } from '@utils/core/products';
import { getIdFromGid } from '@utils/core/shopify';
import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiShoppingBag } from 'react-icons/hi';
import { commonClasses } from '..';
import UserAuthButton from './components/UserAuthButton';

const linkClasses = ({
	isActive,
	keepCase
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
	{ href: '/knock_clipper', text: 'KNOCK Clipper', keepCase: true },
	{ href: '/drums-that-knock', text: 'drums that knock' },
	{ href: '/faqs', text: 'FAQs', keepCase: true },
	{ href: '/contact-us', text: 'contact' }
];

const MainHeader = () => {
	const [{ cart }, customerDispatch] = useSharedCustomerState();
	const { user } = useGetUserDataFromStore();
	const router = useRouter();

	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
	const [isSmallScreenNaveOpen, setIsSmallScreenNaveOpen] = useState(false);
	const [isCheckoutFound, setIsCheckoutFound] = useState(false);

	const userCheckoutIdAndKeyFromCookie = useGetUserCheckoutIdAndKeyCookie();

	const createCheckout = useQuery(
		['create-one-checkout'],
		() => checkoutApi.createOne(),
		{
			enabled: !userCheckoutIdAndKeyFromCookie && !isCheckoutFound,
			onSuccess: (result) => {
				setCookie(
					'checkoutIdAndKey',
					JSON.stringify({
						checkoutId: result.checkoutIdAndKey.checkoutId,
						checkoutKey: result.checkoutIdAndKey.checkoutKey
					}),
					{
						expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
					}
				);
				setIsCheckoutFound(true);
			}
		}
	);

	const getCheckout = useQuery(
		['get-one-checkout'],
		() => {
			if (!userCheckoutIdAndKeyFromCookie)
				throw new Error('Missing check out id and key from cookie');

			return checkoutApi.getOne(
				userCheckoutIdAndKeyFromCookie.checkoutId,
				userCheckoutIdAndKeyFromCookie.checkoutKey
			);
		},
		{
			enabled: !!userCheckoutIdAndKeyFromCookie && !isCheckoutFound,
			onSuccess: (result) => {
				setIsCheckoutFound(true);
			}
		}
	);
	const userCheckoutDetailsAndIdAndKey = useGetUserCheckoutDetailsAndIdAndKey();

	const logoutUser = useLogoutUser({
		enabled: !!isLoggingOut,
		onSuccess: () => setIsLoggingOut(false),
		onError: () => setIsLoggingOut(false),
		userCheckoutDetailsAndIdAndKey
	});
	const cartProductsCount = useMemo(
		() =>
			cart.productsData.reduce(
				(previousValue, currentValue) =>
					previousValue + currentValue.selectedAmount,
				0
			),
		[cart.productsData]
	);

	useEffect(() => {
		if (!userCheckoutDetailsAndIdAndKey) return;

		if (cart.productsData.length !== 0 || cart.updatedAt) return;

		const { checkout } = userCheckoutDetailsAndIdAndKey;

		if (checkout.lineItems.length === 0) return;

		customerGlobalActions.cart.set(customerDispatch, {
			cartObj: {
				productsData: checkout.lineItems.map((item) =>
					convertProductToCartItem({ product: item })
				),
				updatedAt: new Date()
			}
		});
	}, [
		cart.productsData.length,
		cart.updatedAt,
		customerDispatch,
		userCheckoutDetailsAndIdAndKey
	]);

	return (
		<header
			id='main-header'
			className={`${commonClasses} bg-primary-1 z-10 fixed top-0 right-0 left-0 w-full flex flex-col`}
		>
			<div
				className='relative w-full mx-auto
						lg:px-12'
			>
				<div className='relative z-10 h-main-nav-h flex justify-between px-4 sm:px-8 gap-2 sm:gap-4 text-primary-2'>
					<div
						className='flex items-center justify-center text-primary-1'
						style={{ '--sup-t': '0ch' } as CSSProperties}
					>
						<Logo onClick={() => setIsSmallScreenNaveOpen(false)} />
					</div>
					<nav className='hidden lg:flex'>
						<ul className='text-center flex items-center justify-center gap-8 font-semibold'>
							{headerLinks.map((link) => (
								<li key={link.text}>
									<Link
										href={link.href}
										className={linkClasses({
											isActive: link.href === router.pathname,
											keepCase: link.keepCase
										})}
									>
										{link.text}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<ul className='flex items-center justify-center gap-2 sm:gap-4'>
						<li className='block lg:hidden'>
							<button
								onClick={() => setIsSmallScreenNaveOpen((prev) => !prev)}
								title={`press or click to ${
									isSmallScreenNaveOpen ? 'hide' : 'show'
								} the nav menu`}
								className='flex items-center justify-center'
							>
								<GiHamburgerMenu className='text-xl' />
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
									href='/customer-profile'
									title='profile'
									className='flex items-center justify-center text-bg-secondary-1'
								>
									<BsFillPersonFill className='text-xl' />
								</Link>
							)}
						</li>
						<li>
							<button
								title='cart'
								className='flex items-center justify-center'
								onClick={() =>
									customerGlobalActions.setIsVisibleOnly(
										customerDispatch,
										'headerCart'
									)
								}
							>
								<span
									className={cx(
										'relative pointer-events-none',
										cartProductsCount === 0 ? '' : ''
									)}
								>
									<HiShoppingBag
										className={cx(
											'text-xl',
											'duration-300 transition-all',
											cartProductsCount === 0
												? ''
												: 'relative -translate-y-[20%] -translate-x-[20%] text-opacity-0'
										)}
									/>
									<span
										className={cx(
											'text-sm absolute top-0 text-bg-secondary-1 font-black p-2 bg-opacity-70 rounded-full',
											'duration-300 transition-all',
											cartProductsCount === 0
												? ''
												: 'top-0 left-1/4  -translate-x-[15%]'
										)}
									>
										{cartProductsCount}
									</span>
								</span>
							</button>
						</li>
						{user?.data && (
							<li>
								<button
									title='cart'
									className='flex items-center justify-center disabled:bg-slate-400'
									onClick={() => setIsLoggingOut(true)}
									disabled={logoutUser.isLoading && isLoggingOut}
								>
									logout
								</button>
							</li>
						)}
					</ul>
				</div>
				<div
					className={`mt-main-nav-h bg-primary-1 block lg:hidden overflow-hidden absolute top-0 right-0 left-0 w-full ${
						isSmallScreenNaveOpen
							? // ? 'scale-y-100'
							  // : 'scale-y-0 opacity-0 pointer-events-none'
							  'translate-y-0'
							: '-translate-y-full opacity-0 pointer-events-none' // mt-0
					}
				origin-top
				transition-all duration-300`}
				>
					<nav className='flex'>
						<ul
							className={cx(
								'flex flex-col gap-2 font-semibold px-4 pt-0 pb-4  w-full text-xl',
								'sm:text-size-inherit sm:gap-4'
							)}
						>
							{headerLinks.map((link) => (
								<li key={link.text} className='w-full'>
									<Link
										href={link.href}
										className={`${linkClasses({
											isActive: link.href === router.pathname,
											keepCase: link.keepCase
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
				<CartContainer />
			</div>
		</header>
	);
};

export default MainHeader;

const CartContainer = () => {
	const [
		{
			isVisible: { headerCart: isCartVisible },
			cart: { productsData }
		},
		customerDispatch
	] = useSharedCustomerState();
	const userCheckoutDetailsAndIdAndKey = useGetUserCheckoutDetailsAndIdAndKey();

	const removeProductsToCheckoutAndCart = useRemoveProductsToCheckoutAndCart();
	const updateProductsToCheckoutAndCart = useUpdateProductsToCheckoutAndCart();

	const disableAllButtons =
		removeProductsToCheckoutAndCart.isLoading ||
		updateProductsToCheckoutAndCart.isLoading;

	const productsTotalPrice = useMemo(
		() =>
			productsData.reduce(
				(previousValue, currentValue) =>
					previousValue + currentValue.price * currentValue.selectedAmount,
				0
			),
		[productsData]
	);

	return (
		<>
			<div
				className={cx(
					'fixed translate-y-main-nav-h top-0 right-0 w-full h-full bg-primary-3 bg-opacity-60 transition-all',
					isCartVisible
						? 'duration-300'
						: 'pointer-events-none opacity-0 duration-150'
				)}
				onClick={() =>
					customerGlobalActions.setIsVisibleOnly(customerDispatch, 'headerCart')
				}
			></div>
			<div
				className={cx(
					'absolute translate-y-main-nav-h top-0 right-0 h-fit max-h-[80vh] overflow-auto text-primary-1 bg-primary-4 w-[28rem] max-w-full origin-top transition-all p-8',
					isCartVisible
						? 'scale-y-100 duration-150'
						: 'scale-y-0 duration-75 opacity-0'
				)}
			>
				<header className='pb-4'>
					<h3 className='text-h4 uppercase font-semibold'>cart</h3>
				</header>
				<div className='flex flex-col gap-4'>
					{productsData.length === 0
						? "You don't have any items in your cart yet."
						: productsData.map((product) => (
								<article
									key={product.id}
									className='flex border-b-[0.0625rem] border-b-primary-1 pb-4'
								>
									<div className='w-28 min-w-[4rem] aspect-square bg-primary-1 max-w-[30%]'>
										{product.preferredImage?.src && (
											<CustomNextImage
												src={product.preferredImage?.src}
												alt={product.preferredImage?.alt || ''}
												width={112}
												height={112}
												className='aspect-square object-contain w-full h-full'
											/>
										)}
									</div>
									<div className='flex flex-col px-4 py-2 gap-2 flex-grow'>
										<header className='flex flex-col gap-1 sm:flex-row sm:gap-2 sm:justify-between'>
											<h4>
												<Link
													href={`/products/${getIdFromGid(product.id)}`}
													className='inline-block whitespace-nowrap max-w-[10rem] text-ellipsis overflow-hidden'
												>
													{product.title}
												</Link>
											</h4>
											<p title='price per product'>${product.price}</p>
										</header>
										<div className='flex flex-col gap-1 sm:flex-row sm:gap-2 sm:justify-between'>
											<div className='w-fit border-[0.125rem] border-bg-secondary-1 rounded-2xl p-1 flex gap-3'>
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
											</div>

											<button
												className={cx(
													'w-fit py-1 text-primary-3 hover:text-primary-2 focus:text-primary-1',
													'transition-all duration-150'
												)}
												disabled={disableAllButtons}
												onClick={() =>
													removeProductsToCheckoutAndCart.mutate({
														productsIds: [product.id]
													})
												}
											>
												remove
											</button>
										</div>
									</div>
									<div className=''></div>
								</article>
						  ))}
				</div>
				<div className='pt-8 flex flex-col gap-8'>
					<header className='flex gap-2 justify-between'>
						<h3 className='text-h4 uppercase font-semibold'>subtotal</h3>
						<p title='price per product'>${productsTotalPrice}</p>
					</header>
					<div className=''>
						<Button
							{...(productsData.length === 0 ||
							!userCheckoutDetailsAndIdAndKey?.checkout?.webUrl
								? ''
								: { href: userCheckoutDetailsAndIdAndKey.checkout.webUrl })}
							disabled={productsData.length === 0 || disableAllButtons}
							classesIntent={{ w: 'full', display: 'flex-xy-center' }}
						>
							{productsData.length === 0 ? 'Cart Is Empty' : 'checkout'}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
