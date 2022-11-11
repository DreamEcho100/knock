import type { ReactNode } from 'react';

import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useId } from 'react';
import Link from 'next/link';
import Button from '@components/shared/core/Button';
import Logo from '@components/shared/core/Logo';
import MainHeader from './MainHeader';
import {
	getGetAccessTokenFromCookie,
	useGetUserData,
	useGetUserDataFromStore
} from '@utils/core/hooks';
import CustomNextImage from '@components/shared/common/CustomNextImage';

export const commonClasses = 'leading-relaxed text-primary-2 mx-auto';

const LinksListContainer = ({
	headerText,
	links,
	linksListClassName = 'capitalize flex flex-col gap-1'
}: {
	headerText: string;
	links: { href: string; text: string; isHidden?: boolean }[];
	linksListClassName?: string;
}) => {
	return (
		<nav className='flex flex-col gap-2 p-2'>
			<h3 className='capitalize font-semibold text-h3 text-primary-5'>
				{headerText}
			</h3>
			<ul className={linksListClassName}>
				{links.map((item) =>
					item.isHidden ? (
						<></>
					) : (
						<li key={item.text}>
							<Link href={item.href}>{item.text}</Link>
						</li>
					)
				)}
			</ul>
		</nav>
	);
};

const Footer = () => {
	const formId = useId();

	const { user } = useGetUserDataFromStore();

	return (
		<footer
			id='main-footer'
			className={`${commonClasses} max-w bg-primary-1 border-t-[0.125rem] border-t-text-primary-4`}
		>
			<div
				className='container-restrictions-1 flex flex-col m-auto text-primary-2 px-4 py-8
						lg:px-24'
			>
				<div className='flex gap-2 flex-wrap w-full'>
					<div className='w-full flex lg:flex-grow flex-wrap justify-between p-2 gap-4'>
						<LinksListContainer
							headerText='useful links'
							links={[
								{ href: '/', text: 'Support' },
								{ href: '/', text: 'terms of service' },
								{ href: '/policies/privacy-policy', text: 'privacy policy' },
								{ href: '/policies/refund-policy', text: 'refund policy' },
								{ href: '/policies/shipping-policy', text: 'shipping policy' },
								{
									href: '/customer-profile',
									text: 'My account',
									isHidden: !user?.data?.id
								}
							]}
						/>
						{/* <LinksListContainer
              headerText="plug-ins"
              links={[
                { href: '/', text: 'knock plugin' },
                { href: '/', text: 'knock compress' },
              ]}
            />
            <LinksListContainer
              linksListClassName=""
              headerText="sample packs"
              links={[
                { href: '/', text: 'Drums that knock X' },
                { href: '/', text: 'Drums that knock vol.9' },
                { href: '/', text: 'Drums that knock vol.8' },
                { href: '/', text: 'Drums that knock vol.7' },
                { href: '/', text: 'All sample packs' },
              ]}
            /> */}
						<div className='flex flex-col p-2 md:p-0 max-w-[700px] lg:w-1/2'>
							<header className='flex flex-col gap-2 mb-4'>
								<p className='text-white font-bold'>
									Follow us on social media
								</p>
								<ul className='flex gap-2'>
									<li>
										<a
											href='#'
											rel='noopener noreferrer'
											title='instagram'
											className='text-gray-400'
										>
											<FaInstagram />
										</a>
									</li>
									<li>
										<a
											href='#'
											rel='noopener noreferrer'
											title='facebook'
											className='text-gray-400'
										>
											<FaFacebook />
										</a>
									</li>
									<li>
										<a
											href='#'
											rel='noopener noreferrer'
											title='twitter'
											className='text-gray-400'
										>
											<FaTwitter />
										</a>
									</li>
									<li>
										<a
											href='#'
											rel='noopener noreferrer'
											title='youtube'
											className='text-gray-400'
										>
											<FaYoutube />
										</a>
									</li>
								</ul>
							</header>
							<div className='flex flex-col gap-4'>
								<h2 className='text-h2 font-bold text-white uppercase'>
									subscribe
								</h2>
								<p>Promotion, new products and sales. Directly to your inbox</p>
							</div>
							<form className='flex gap-8 my-4'>
								<div className='flex bg-primary-3 text-primary-1 w-full rounded-3xl overflow-hidden'>
									<input
										type='email'
										placeholder='Email address'
										id={`email-${formId}`}
										className='w-full bg-transparent px-6 py-2 outline-none
											placeholder:text-text-primary-3 text-base'
									/>
									<Button type='submit' className='uppercase'>
										subscribe
									</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className='flex justify-between items-end mx-1 my-4'>
					<div className='px-1'>
						<Logo />
						<small className='capitalize'>
							copyright &copy; plugins that knock
						</small>
					</div>
					<div className='px-1'>
						<CustomNextImage
							src='/images/payment_cards.png'
							alt='payment cards'
							width={200}
							height={50}
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};

const DefaultLayout = ({ children }: { children: ReactNode }) => {
	const accessToken = getGetAccessTokenFromCookie();

	useGetUserData({
		enabled: !!accessToken,
		accessToken: accessToken
	});

	return (
		<>
			<MainHeader />
			<main
				className={`${commonClasses} relative bg-primary-2 mt-main-nav-h w-full flex flex-col`}
			>
				{children}
			</main>
			<Footer />
		</>
	);
};

export default DefaultLayout;
