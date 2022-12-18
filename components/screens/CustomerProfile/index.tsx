import Button from '@components/shared/core/Button';
import CustomNextImage from '@components/shared/common/CustomNextImage';

import {
	getGetAccessTokenFromCookie,
	useGetUserCheckoutDetailsAndIdAndKey,
	useGetUserDataFromStore,
	useLogoutUser
} from '@utils/core/hooks';
import { priceCurrencyFormatter } from '@utils/core/shopify';

import type { IGenericErrorResponse, IUser } from 'types';

import {
	Dispatch,
	FormEvent,
	Fragment,
	SetStateAction,
	useMemo,
	useState
} from 'react';

import Dialog from '@components/shared/common/Dialog';
import FormField from '@components/shared/core/FieldForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { defaultSiteName3 } from '@utils/core/next-seo.config';
import CustomNextSeo from '@components/shared/common/CustomNextSeo';

const TitleValue = ({
	title,
	value,
	isSmall
}: {
	title: string;
	value: string | number;
	isSmall?: boolean;
}) => (
	<p>
		{isSmall ? (
			<small>
				<strong className='capitalize'>{title}</strong>&nbsp;
				{value}
			</small>
		) : (
			<>
				<strong className='capitalize'>{title}</strong>&nbsp;
				{value}
			</>
		)}
	</p>
);

const ProductsOnOrder = ({
	lineItems,
	buttonText,
	statusUrl,
	financialStatus
}: {
	lineItems: IUser['orders']['edges'][0]['node']['lineItems']['edges'];
	buttonText: string;
	statusUrl: string;
	financialStatus: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button onClick={() => setIsOpen(true)}>{buttonText}</button>
			<Dialog
				contentVariants={{ bg: 'primary-2' }}
				header={{
					title:
						financialStatus === 'PAID' ? (
							<>
								{buttonText}{' '}
								<small className='text-sm text-purple-700'>
									<a href={statusUrl} target='_blank' rel='noreferrer'>
										Go to the download page
									</a>
								</small>
							</>
						) : undefined
				}}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			>
				<div className='flex flex-col gap-4'>
					{lineItems.map(({ node: item }, index) => {
						if (!item?.variant?.id) return <Fragment key={index} />;

						return (
							<div key={item.variant.id}>
								<div className='flex'>
									<div className='w-36 flex items-center bg-black'>
										{item?.variant?.image?.url && (
											<CustomNextImage
												unoptimized
												src={item.variant.image.url}
												alt={item.variant.image.altText || ''}
												width={150}
												height={150}
												className='w-full h-full aspect-square object-contain'
											/>
										)}
									</div>
									<div className='p-2'>
										<p>{item.title}</p>
										<p>
											Total Price{' '}
											{priceCurrencyFormatter(
												item.originalTotalPrice.amount,
												item.originalTotalPrice.currencyCode,
												{ toFixed: 2 }
											)}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</Dialog>
		</>
	);
};

const UpdateUserBasicDetails = ({
	isOpen,
	setIsOpen
}: {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const queryClient = useQueryClient();
	const { user: user } = useGetUserDataFromStore();
	const accessTokenFrom = getGetAccessTokenFromCookie();

	const initFromValues = () => ({
		email: user.data ? user.data.email : '',
		firstName: user.data ? user.data.firstName : '',
		lastName: user.data ? user.data.lastName : '',
		acceptsMarketing: user.data ? user.data.acceptsMarketing : false
	});

	const [formValues, setFormValues] = useState(initFromValues());

	const isChanged = useMemo(() => {
		if (
			!user.data ||
			(user.data &&
				user.data.email.trim() === formValues.email?.trim() &&
				user.data.firstName.trim() === formValues?.firstName?.trim() &&
				user.data.lastName.trim() === formValues?.lastName?.trim() &&
				user.data.acceptsMarketing === formValues.acceptsMarketing)
		)
			return false;

		return true;
	}, [
		formValues.acceptsMarketing,
		formValues.email,
		formValues.firstName,
		formValues.lastName,
		user.data
	]);

	const updateMutation = useMutation<{}, IGenericErrorResponse, FormEvent>({
		mutationFn: (event) => {
			event.preventDefault();

			if (!accessTokenFrom) throw new Error('No access token available');
			if (!isChanged) throw new Error('No changes detected');
			if (!user.data) throw new Error('No user data available');

			return fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}//clients`,
				{
					method: 'PUT',
					headers: {
						'Content-type': 'application/json',
						clientaccesstoken: accessTokenFrom
					},
					body: JSON.stringify({
						email:
							user.data.email.trim() !== formValues.email
								? formValues.email
								: undefined,
						firstName:
							user.data.firstName.trim() !== formValues.firstName
								? formValues.firstName
								: undefined,
						lastName:
							user.data.lastName.trim() !== formValues.lastName
								? formValues.lastName
								: undefined,
						acceptsMarketing:
							user.data.acceptsMarketing !== formValues.acceptsMarketing
								? formValues.acceptsMarketing
								: undefined
					})
				}
			)
				.then((response) => response.json())
				.then((result) => {
					if ('success' in result && !result.success)
						throw new Error(result.message);

					return result;
				});
		},
		onSuccess: async (result) => {
			// console.log('result', result)
			// await user.refetch();
			queryClient.setQueryData<IUser>(['check-token'], (prev) => {
				if (!prev) return prev;

				return {
					...prev,
					...formValues
				};
			});
			setIsOpen(false);
		}
	});

	return (
		<Dialog
			header={{ title: 'Update Your Basic Details' }}
			isOpen={isOpen}
			setIsOpen={setIsOpen}
		>
			<form
				className='sm:w-11/12 mx-auto my-4 flex flex-col'
				onSubmit={updateMutation.mutate}
			>
				<fieldset
					className='mt-2 space-y-4'
					disabled={updateMutation.isLoading}
				>
					<FormField
						values={formValues}
						setValues={setFormValues}
						name='firstName'
						placeholder='*first name'
						autoComplete='first-name'
						minLength={3}
					/>
					<FormField
						values={formValues}
						setValues={setFormValues}
						name='lastName'
						placeholder='*last name'
						autoComplete='last-name'
						minLength={3}
					/>
					<FormField
						values={formValues}
						setValues={setFormValues}
						name='email'
						type='email'
						placeholder='*email'
						autoComplete='email'
						minLength={3}
					/>

					<div className=''>
						<label>
							<input
								checked={formValues.acceptsMarketing}
								type='checkbox'
								name='acceptsMarketing'
								onChange={() =>
									setFormValues((prev) => ({
										...prev,
										acceptsMarketing: !prev.acceptsMarketing
									}))
								}
							/>
							&nbsp;
							<span>Accept Marketing</span>
						</label>
					</div>

					<div className='flex justify-end'>
						<Button
							type='submit'
							classesIntent={{ w: 'full' }}
							disabled={updateMutation.isLoading || !isChanged}
						>
							Submit
						</Button>
					</div>
				</fieldset>
				{updateMutation.isError && (
					<div className='text-bg-secondary-2'>
						<p>{updateMutation.error.message}</p>
					</div>
				)}
			</form>
		</Dialog>
	);
};

const CustomerProfileScreen = () => {
	const { user } = useGetUserDataFromStore();

	// const [isLoggingOut, setIsLoggingOut] = useState(false);
	const userCheckoutDetailsAndIdAndKey = useGetUserCheckoutDetailsAndIdAndKey();
	const [isUpdateUserBasicDetailsOpen, setIsUpdateUserBasicDetailsOpen] =
		useState(false);
	const logoutUser = useLogoutUser({
		userCheckoutDetailsAndIdAndKey
	});

	const orders = useMemo(() => {
		let aNum: number;
		let bNum: number;

		return user?.data?.orders?.edges?.slice().sort(function (a, b) {
			aNum = Date.parse(a.node.processedAt);
			bNum = Date.parse(b.node.processedAt);
			if (aNum === bNum) return 0;

			return aNum > bNum ? -1 : 1;
		});
	}, [user?.data?.orders?.edges]);

	let pageTitle = `Loading... | ${defaultSiteName3}`;

	if (user.status === 'loading' && user.fetchStatus === 'fetching')
		return (
			<>
				<CustomNextSeo
					pageTitle={pageTitle}
					additionalMetaTags={[
						{ name: 'robots', content: 'noindex, nofollow' }
					]}
				/>
				<section className='bg-primary-1 section-p-v1 h-[75vh] max-h-[45rem] min-h-fit'>
					<div className='max-w-screen-md mx-auto'>
						<p>Loading...</p>
					</div>
				</section>
			</>
		);

	if (!user.isSuccess) {
		pageTitle = !user.isSuccess
			? `Please login first to view your data, or reload the page and make sure you have a good internet connection | ${defaultSiteName3}`
			: `Your data doesn't exist | ${defaultSiteName3}`;

		return (
			<>
				<CustomNextSeo
					pageTitle={pageTitle}
					additionalMetaTags={[
						{ name: 'robots', content: 'noindex, nofollow' }
					]}
				/>
				<section className='bg-primary-1 section-p-v1 h-[75vh] max-h-[45rem] min-h-fit'>
					<div className='max-w-screen-md mx-auto'>
						<p>
							{!user.isSuccess
								? 'Please login first to view your data, or reload the page and make sure you have a good internet connection'
								: "Your data doesn't exist "}
						</p>
					</div>
				</section>
			</>
		);
	}

	pageTitle = `${user.data.firstName} ${user.data.lastName} | Customer Profile | ${defaultSiteName3}`;

	return (
		<>
			<CustomNextSeo
				pageTitle={pageTitle}
				additionalMetaTags={[{ name: 'robots', content: 'noindex, nofollow' }]}
			/>
			<section className='bg-primary-1 section-p-v1'>
				<div className='max-w-screen-md mx-auto flex flex-col gap-16'>
					<header className='flex flex-col items-center'>
						<h1 className='text-h1 uppercase'>Account</h1>
						<p>
							Logged in as{' '}
							<span className='text-bg-secondary-1'>{user.data.email}</span> (
							<Button
								onClick={() => logoutUser.mutate()}
								disabled={logoutUser.isLoading}
								classesIntent={{ rounded: 'none', p: 'none', theme: 'none' }}
								className='text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600'
							>
								logout
							</Button>
							)
						</p>
					</header>
					<div className='flex flex-col gap-1'>
						<p className='capitalize text-primary-1'>
							{user.data.firstName} {user.data.lastName}
						</p>
						<p>{user.data.email}</p>
						<TitleValue
							title='Account Created:'
							value={new Date(user.data.createdAt).toLocaleString()}
							isSmall
						/>

						<Button
							onClick={() => setIsUpdateUserBasicDetailsOpen(true)}
							classesIntent={{ rounded: 'none', p: 'none', theme: 'none' }}
							className='text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600'
						>
							Edit
						</Button>
						<UpdateUserBasicDetails
							isOpen={isUpdateUserBasicDetailsOpen}
							setIsOpen={setIsUpdateUserBasicDetailsOpen}
						/>
					</div>

					<div className=''>
						{!Array.isArray(orders) ||
						orders.length === 0 ||
						!('node' in orders[0]) ? (
							<p>
								<span>There&apos;s no orders</span>&nbsp;
								<Link
									href='/drums-that-knock'
									className='text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600'
								>
									let&apos;s do something about that
								</Link>
							</p>
						) : (
							<>
								<table className='orders-table w-full border-collapse overflow-x-auto table-fixed'>
									<thead className='border border-gray-500 font-bold'>
										<tr>
											<th className='px-8 py-6 md:px-12 md:py-8'>Order</th>
											<th className='px-8 py-6 md:px-12 md:py-8'>Payment</th>
											<th className='px-8 py-6 md:px-12 md:py-8'>Total</th>
										</tr>
									</thead>
									<tbody>
										{orders.map(({ node: itemNode }) => (
											<tr key={itemNode.id}>
												<td className='px-8 py-6 md:px-12 md:py-8 border border-gray-500'>
													<span className='title font-bold hidden'>
														Order:&nbsp;
													</span>
													<span className='text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600'>
														{/* {itemNode.name} */}
														<ProductsOnOrder
															lineItems={itemNode.lineItems.edges}
															buttonText={itemNode.name}
															statusUrl={itemNode.statusUrl}
															financialStatus={itemNode.financialStatus}
														/>
													</span>
													&nbsp;-&nbsp;
													<span>
														{new Date(itemNode.processedAt).toLocaleDateString(
															undefined,
															{
																dateStyle: 'medium'
															}
														)}
													</span>
												</td>
												<td className='px-8 py-6 md:px-12 md:py-8 border border-gray-500 capitalize'>
													<span className='title font-bold hidden'>
														Payment:&nbsp;
													</span>
													{itemNode.financialStatus?.toLowerCase()}
												</td>
												<td className='px-8 py-6 md:px-12 md:py-8 border border-gray-500'>
													<span className='title font-bold hidden'>
														Total:&nbsp;
													</span>
													{priceCurrencyFormatter(
														parseFloat(itemNode.totalPrice.amount).toString(),
														itemNode.totalPrice.currencyCode,
														{
															toFixed: 2
														}
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
								<style jsx>{`
									.orders-table {
										border-collapse: collapse;
										width: 100%;
									}

									/* .orders-table tr {
									padding: 0.35em;
								} */

									.orders-table th,
									.orders-table td {
										text-align: center;
									}

									/* .orders-table th {
									text-transform: uppercase;
								} */

									@media screen and (max-width: 600px) {
										.orders-table {
											border: 0;
										}

										.orders-table caption {
											font-size: 1.3em;
										}

										.orders-table thead {
											border: none;
											clip: rect(0 0 0 0);
											height: 1px;
											margin: -1px;
											overflow: hidden;
											padding: 0;
											position: absolute;
											width: 1px;
										}

										.orders-table tr {
											border-bottom: 3px solid #ddd;
											display: block;
											margin-bottom: 0.625em;
										}

										.orders-table td {
											border-bottom: 1px solid #ddd;
											display: block;
											font-size: 0.8em;
											text-align: initial;
										}

										.orders-table td .title {
											display: inline-block;
											width: 25%;
											max-width: fit-content;
										}

										.orders-table td::before {
											/*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
											content: attr(data-label);
											float: left;
											font-weight: bold;
											text-transform: uppercase;
										}

										.orders-table td:last-child {
											border-bottom: 0;
										}
									}
									@media screen and (max-width: 400px) {
										.orders-table td {
											padding: 0.5rem;
											white-space: break-spaces;
										}
										.orders-table td .title {
											width: auto;
										}
									}
								`}</style>
							</>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default CustomerProfileScreen;
