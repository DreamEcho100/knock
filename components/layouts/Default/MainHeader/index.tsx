import CustomNextImage from '@components/shared/common/CustomNextImage';
import Button from '@components/shared/core/Button';
import Logo from '@components/shared/core/Logo';
import { useSharedCustomerState } from '@context/Customer';
import { customerGlobalActions } from '@context/Customer/actions';
import { useGetUserDataFromStore, useLogoutUser } from '@utils/core/hooks';
import { getIdFromGid } from '@utils/core/shopify';
import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiShoppingBag } from 'react-icons/hi';
import { commonClasses } from '..';
import UserRegisterButton from './components/UserRegisterButton';

const linkClasses = ({
	isActive,
	keepCase
}: {
	isActive?: boolean;
	keepCase?: boolean;
} = {}) => `border-b border-transparent outline-none
duration-150 transition-all
keepCase ? '' : 'uppercase'}

	isActive
		? 'text-bg-secondary-1 focus:border-b-bg-secondary-1'
		: 'text-primary-2 focus:border-b-text-primary-1 hover:text-primary-1'
}`;

const MainHeader = () => {
	const [{ cart }, customerDispatch] = useSharedCustomerState();
	const { user } = useGetUserDataFromStore();
	const router = useRouter();
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const logoutUser = useLogoutUser({
		enabled: !!isLoggingOut,
		onSuccess: () => setIsLoggingOut(false),
		onError: () => setIsLoggingOut(false)
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

	const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
	const [isSmallScreenNaveOpen, setIsSmallScreenNaveOpen] = useState(false);

	const headerLinks = [
		{ href: '/knock-plugin', text: 'knock' },
		{ href: '/knock_clipper', text: 'KNOCK Clipper', keepCase: true },
		{ href: '/drums-that-knock', text: 'drums that knock' },
		{ href: '/faqs', text: 'FAQs', keepCase: true },
		{ href: '/contact-us', text: 'contact' }
	];

	useEffect(() => {
		// What I am doing here? I shoud move this logic to another place
		const lsCartString = localStorage.getItem('cart');
		if (!lsCartString) return;
		try {
			const lsCartObj = JSON.parse(lsCartString);

			customerGlobalActions.cart.set(customerDispatch, {
				cartObj: lsCartObj
			});
		} catch (error) {
			if (error instanceof Error) console.error(error.message);
			localStorage.setItem(
				'cart',
				JSON.stringify({
					productsData: [],
					updatedAt: null
				})
			);
		}
	}, [customerDispatch]);
	useEffect(() => {
		setTimeout(() => localStorage.setItem('cart', JSON.stringify(cart)), 0);
	}, [cart]);

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
					<div className='flex items-center justify-center text-primary-1'>
						<Logo />
					</div>
					<nav className='hidden lg:flex'>
						<ul className='text-center flex items-center justify-center gap-10 font-bold'>
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
								<GiHamburgerMenu />
							</button>
						</li>
						<li>
							{!user?.data ? (
								<UserRegisterButton
									isOpen={isRegisterDialogOpen}
									setIsOpen={setIsRegisterDialogOpen}
								/>
							) : (
								<button
									title='cart'
									className='flex items-center justify-center'
								>
									<BsFillPersonFill />
								</button>
							)}
						</li>
						<li>
							<button
								title='cart'
								className='flex items-center justify-center'
								onClick={() =>
									customerGlobalActions.setIsVisibleOnly(
										customerDispatch,
										'sideCart'
									)
								}
							>
								<span
									className={cx('relative', cartProductsCount === 0 ? '' : '')}
								>
									<HiShoppingBag
										className={cx(
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
									disabled={logoutUser.isLoading}
								>
									logout
								</button>
							</li>
						)}
					</ul>
				</div>
				<div
					className={`mt-20 bg-primary-1 block lg:hidden overflow-hidden absolute top-0 right-0 left-0 w-full ${
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
							className='flex flex-col gap-2 font-bold p-4 w-full
									sm:gap-4'
						>
							{headerLinks.map((link) => (
								<li key={link.text} className='w-full'>
									<Link
										href={link.href}
										className={`${linkClasses({
											isActive: link.href === router.pathname,
											keepCase: link.keepCase
										})} block w-fit`}
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
			isVisible: { sideCart: isCartVisible },
			cart: { productsData }
		},
		customerDispatch
	] = useSharedCustomerState();

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
					customerGlobalActions.setIsVisibleOnly(customerDispatch, 'sideCart')
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
					<h3 className='text-h3 uppercase font-semibold'>cart</h3>
				</header>
				<div className='flex flex-col gap-4'>
					{productsData.length === 0 ? (
						<div>Empty, Let&apos;s do something about it {'\u{1F917}'}</div>
					) : (
						productsData.map((product) => (
							<article
								key={product.id}
								className='flex border-b-[0.125rem] border-b-primary-1 pb-4'
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
												onClick={() => {
													if (product.selectedAmount - 1 === 0)
														return customerGlobalActions.cart.deleteOneProduct(
															customerDispatch,
															{
																productId: product.id
															}
														);

													customerGlobalActions.cart.updateOneProduct(
														customerDispatch,
														{
															productNewData: {
																...product,
																selectedAmount: product.selectedAmount - 1
															},
															productId: product.id
														}
													);
												}}
											>
												-
											</button>
											<p>{product.selectedAmount}</p>
											<button
												className='px-3'
												title='increase the amount by 1'
												onClick={() => {
													customerGlobalActions.cart.updateOneProduct(
														customerDispatch,
														{
															productNewData: {
																...product,
																selectedAmount: product.selectedAmount + 1
															},
															productId: product.id
														}
													);
												}}
											>
												+
											</button>
										</div>

										<button
											className={cx(
												'w-fit py-1 text-primary-3 hover:text-primary-2 focus:text-primary-1',
												'transition-all duration-150'
											)}
											onClick={() => {
												customerGlobalActions.cart.deleteOneProduct(
													customerDispatch,
													{
														productId: product.id
													}
												);
											}}
										>
											remove
										</button>
									</div>
								</div>
								<div className=''></div>
							</article>
						))
					)}
				</div>
				<div className='pt-8 flex flex-col gap-8'>
					<header className='flex gap-2 justify-between'>
						<h3 className='text-h3 uppercase font-semibold'>subtotal</h3>
						<p title='price per product'>${productsTotalPrice}</p>
					</header>
					<div className=''>
						<Button
							{...(productsData.length === 0 ? '' : { href: '/checkout' })}
							disabled={productsData.length === 0}
							classesIntent={{ w: 'full', display: 'flex-xy-center' }}
						>
							{productsData.length === 0 ? '???' : 'checkout'}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
