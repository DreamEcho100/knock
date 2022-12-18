import type { IGenericErrorResponse } from 'types';
import type { FormEvent } from 'react';

import { useState } from 'react';
import CustomNextImage from '@components/shared/common/CustomNextImage';
import Button from '@components/shared/core/Button';
import Logo from '@components/shared/core/Logo';
import { useGetUserDataFromStore } from '@utils/core/hooks';
import Link from 'next/link';
import { useId } from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { commonClasses } from '..';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from '@tanstack/react-query';

const socialLinks = {
	facebook: 'https://www.facebook.com/decapmusic',
	twitter: 'https://twitter.com/decapmusic',
	instagram: 'https://www.instagram.com/decapmusic/',
	youtube: 'https://www.youtube.com/decapmusic'
};

const LinksListContainer = ({
	headerText,
	links,
	linksListClassName = 'capitalize flex flex-col text-md sm:text-size-inherit'
}: {
	headerText: string;
	links: {
		href: string;
		text: string;
		isHidden?: boolean;
		isNormalLink?: boolean;
	}[];
	linksListClassName?: string;
}) => {
	return (
		<nav className='flex flex-col gap-2 p-2'>
			<h3 className='capitalize font-semibold text-2xl text-primary-1'>
				{headerText}
			</h3>
			<ul className={linksListClassName}>
				{links
					.filter((item) => !item.isHidden)
					.map((item) => (
						<li key={item.text}>
							{item.isNormalLink ? (
								<a
									href={item.href}
									className='hover:text-primary-1 transition-all duration-100'
									target='_blank'
									rel='noreferrer noopener'
								>
									{item.text}
								</a>
							) : (
								<Link
									href={item.href}
									className='hover:text-primary-1 transition-all duration-100'
								>
									{item.text}
								</Link>
							)}
						</li>
					))}
			</ul>
		</nav>
	);
};

const MainFooter = () => {
	const formId = useId();
	const [formValues, setFormValues] = useState({
		email: ''
	});
	// const notify = () => toast('Success! please check your email');

	const subscribeToNewsLetters = useMutation<
		{
			success: true;
			message: string; // "Account created successfully!",
			response: {};
		},
		IGenericErrorResponse,
		FormEvent
	>({
		mutationFn: (event) => {
			event.preventDefault();

			return fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}/clients/subscribe-newsletters`,
				{
					method: 'POST',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify(formValues)
				}
			)
				.then((response) => response.json())
				.then((result) => {
					if ('success' in result && !result.success)
						throw new Error(result.message);

					return result;
				});
		},
		onSuccess: () =>
			setTimeout(() => toast('Success! you have been subscribed'), 0),
		onError: (result) =>
			setTimeout(() => toast(result.message, { type: 'error' }), 0)
	});

	const { user } = useGetUserDataFromStore();

	return (
		<footer
			id='main-footer'
			className={`${commonClasses} max-w bg-primary-1 border-t-[0.125rem] border-t-text-primary-4`}
		>
			<div
				className='flex flex-col m-auto text-primary-2 px-4 py-8
						lg:px-24'
			>
				<div className='flex gap-2 flex-wrap w-full'>
					<div className='w-full flex lg:flex-grow flex-wrap justify-between gap-2 sm:gap-4'>
						<LinksListContainer
							headerText='useful links'
							links={[
								{ href: '/sitemap.xml', text: 'sitemap', isNormalLink: true },
								{ href: '/contact-us', text: 'Support' },
								{
									href: '/policies/terms-of-service',
									text: 'terms of service'
								},
								{ href: '/policies/privacy-policy', text: 'privacy policy' },
								{ href: '/policies/refund-policy', text: 'refund policy' },
								{ href: '/policies/shipping-policy', text: 'shipping policy' },
								{
									href: '/account/profile',
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
						<div className='flex flex-col p-2 gap-4 md:p-0 max-w-[700px] lg:w-1/2'>
							<div className='flex flex-col gap-4'>
								<h2 className='text-h3 font-semibold text-white uppercase'>
									subscribe
								</h2>
								<p>Promotion, new products and sales. Directly to your inbox</p>
							</div>
							<form
								className='flex gap-4 py-2'
								onSubmit={subscribeToNewsLetters.mutate}
							>
								<div className='flex bg-primary-3 text-primary-1 w-full rounded-3xl overflow-hidden'>
									<input
										type='email'
										name='email'
										// autoComplete='off'
										required
										placeholder='Email address'
										id={`email-${formId}`}
										className='w-full bg-transparent px-6 py-2 outline-none text-base autofill:bg-red-900'
										onChange={(event) => {
											setFormValues((prev) => ({
												...prev,
												email: event.target.value
											}));
										}}
										disabled={subscribeToNewsLetters.isLoading}
									/>
									<Button
										type='submit'
										className='uppercase'
										classesIntent={{ rounded: 'none', p: 'wide' }}
									>
										<span className='p-1' />
										subscribe
										<span className='p-1' />
									</Button>
									<ToastContainer
										position='top-right'
										autoClose={5000}
										hideProgressBar={false}
										newestOnTop={false}
										closeOnClick
										rtl={false}
										pauseOnFocusLoss
										draggable
										pauseOnHover
										theme='dark'
									/>
								</div>
							</form>
							<ul className='mt-2 flex gap-4 text-xl'>
								<li>
									<a
										href={socialLinks.instagram}
										rel='noopener noreferrer'
										title='instagram'
										className='text-gray-400'
										target={'_blank'}
									>
										<FaInstagram />
									</a>
								</li>
								<li>
									<a
										href={socialLinks.facebook}
										rel='noopener noreferrer'
										title='facebook'
										className='text-gray-400'
										target={'_blank'}
									>
										<FaFacebook />
									</a>
								</li>
								<li>
									<a
										href={socialLinks.twitter}
										rel='noopener noreferrer'
										title='twitter'
										className='text-gray-400'
										target={'_blank'}
									>
										<FaTwitter />
									</a>
								</li>
								<li>
									<a
										href={socialLinks.youtube}
										rel='noopener noreferrer'
										title='youtube'
										className='text-gray-400'
										target={'_blank'}
									>
										<FaYoutube />
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className='flex gap-2 px-1 justify-between items-end mx-1 my-4 text-[0.8rem]'>
					<div className='flex flex-col'>
						<Logo />
						<small className='capitalize'>
							copyright &copy; plugins that knock
						</small>
					</div>
					{/* <div className='w-36 sm:w-64'>
						<CustomNextImage
							src='/images/payment_cards.png'
							alt='payment cards'
							width={200}
							height={50}
						/>
					</div> */}
				</div>
			</div>
		</footer>
	);
};

export default MainFooter;
