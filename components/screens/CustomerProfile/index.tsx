import Button from '@components/shared/core/Button';
import CustomNextImage from '@components/shared/common/CustomNextImage';

import {
	Root as AccordionRoot,
	Item as AccordionItem,
	Header as AccordionHeader,
	Trigger as AccordionTrigger,
	Content as AccordionContent
} from '@radix-ui/react-accordion';

import accordionClasses from '@styles/accordion.module.css';

import {
	getGetAccessTokenFromCookie,
	useGetUserDataFromStore
} from '@utils/core/hooks';
import { getIdFromGid, priceCurrencyFormatter } from '@utils/core/shopify';

import type { IGenericErrorResponse, IUser } from 'types';

import { cx } from 'class-variance-authority';

import { Dispatch, FormEvent, SetStateAction, useMemo, useState } from 'react';

import { BiChevronUpCircle } from 'react-icons/bi';
import Dialog from '@components/shared/common/Dialog';
import FormField from '@components/shared/core/FieldForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';

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

const OrderCard = ({
	order
}: {
	order: IUser['orders']['edges'][0]['node'];
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const lineItems = order.lineItems.edges;

	return (
		<>
			<div
				className={cx(
					'max-w-[400px] break-all ring-[0.125rem] ring-white ring-opacity-50 p-4',
					'flex flex-col',
					'duration-300 transition-all',
					'hover:scale-110'
				)}
				key={order.id}
			>
				<TitleValue title='id:' value={order.id} />
				<TitleValue
					title='total price:'
					value={priceCurrencyFormatter(
						order.totalPrice.amount,
						order.totalPrice.currencyCode
					)}
				/>
				<TitleValue
					title='total tax:'
					value={priceCurrencyFormatter(
						order.totalTax.amount,
						order.totalTax.currencyCode
					)}
				/>
				<TitleValue
					title='total shipping price:'
					value={priceCurrencyFormatter(
						order.totalShippingPrice.amount,
						order.totalShippingPrice.currencyCode
					)}
				/>
				{!!parseFloat(order.totalRefunded.amount) && (
					<TitleValue
						title='total refunded:'
						value={priceCurrencyFormatter(
							order.totalRefunded.amount,
							order.totalRefunded.currencyCode
						)}
					/>
				)}
				<Button
					classesIntent={{ rounded: 'none', p: 'wide' }}
					onClick={() => setIsOpen(true)}
				>
					See Cart Items
				</Button>
			</div>
			<Dialog
				header={{ title: 'Products' }}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			>
				<div className=''>
					{lineItems.map(({ node: item }) => (
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
									<TitleValue
										title='id'
										value={getIdFromGid(item.variant.id)}
									/>
									<TitleValue title='title' value={item.title} />
									<TitleValue
										title='original total price'
										value={`${item.originalTotalPrice.amount} ${item.originalTotalPrice.currencyCode}`}
									/>
									<TitleValue title='quantity' value={item.quantity} />
								</div>
							</div>
						</div>
					))}
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
	const { user } = useGetUserDataFromStore();
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
				user.data.email.trim() === formValues.email.trim() &&
				user.data.firstName.trim() === formValues.firstName.trim() &&
				user.data.lastName.trim() === formValues.lastName.trim() &&
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
							user.data.email.trim() !== formValues.email.trim()
								? formValues.email
								: undefined,
						firstName:
							user.data.firstName.trim() !== formValues.firstName.trim()
								? formValues.firstName
								: undefined,
						lastName:
							user.data.lastName.trim() !== formValues.lastName.trim()
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
							<span>Accepting marketing</span>
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
	const [
		isUpdateUserBasicDetailsOpen,
		setIsUpdateUserBasicDetailsOpen
	] = useState(false);

	if (user.status === 'loading' && user.fetchStatus === 'fetching')
		return (
			<>
				<Head>
					<title>Loading... | KNOCK Plugin - Make Your Drums Knock</title>
				</Head>
				<section className='bg-primary-1 section-p-v1'>
					<p>Loading...</p>
				</section>
			</>
		);

	if (!user.isSuccess)
		return (
			<>
				<Head>
					<title>
						{!user.isSuccess
							? 'Please login first to view your data'
							: "Your data doesn't exist \u{1F928}"}{' '}
						| KNOCK Plugin - Make Your Drums Knock
					</title>
				</Head>
				<section className='bg-primary-1 section-p-v1'>
					<p>
						{!user.isSuccess
							? 'Please login first to view your data'
							: "Your data doesn't exist \u{1F928}"}
					</p>
				</section>
			</>
		);

	const orders = user.data.orders.edges;

	const accordionDetails = [
		{
			key: 'personalDetails',
			title: 'Personal Details',
			accordionContent: (
				<AccordionContent className='py-4'>
					<header>
						<Button
							onClick={() => setIsUpdateUserBasicDetailsOpen(true)}
							classesIntent={{ rounded: 'none', p: 'wide' }}
						>
							Edit
						</Button>
						<UpdateUserBasicDetails
							isOpen={isUpdateUserBasicDetailsOpen}
							setIsOpen={setIsUpdateUserBasicDetailsOpen}
						/>
						<hr className='w-[75%] border-bg-secondary-1 my-2' />
					</header>
					<TitleValue title='first Name:' value={user.data.firstName} />
					<TitleValue title='last Name:' value={user.data.lastName} />
					<TitleValue title='email:' value={user.data.email} />
					<TitleValue
						title='created at:'
						value={new Date(user.data.createdAt).toLocaleString()}
						isSmall
					/>
				</AccordionContent>
			)
		},
		{
			key: 'orders',
			title: 'Orders',
			accordionContent: (
				<AccordionContent className='flex flex-wrap py-8 gap-4'>
					{orders.map(({ node: order }) => (
						<OrderCard key={order.id} order={order} />
					))}
				</AccordionContent>
			)
		}
	];

	return (
		<>
			<Head>
				<title>
					{user.data.firstName} {user.data.lastName} | Customer Profile | KNOCK
					Plugin - Make Your Drums Knock
				</title>
			</Head>
			<section className='bg-primary-1 section-p-v1'>
				<AccordionRoot
					type='multiple'
					className='my-8 flex flex-col gap-8'
					defaultValue={['personalDetails']}
				>
					{accordionDetails.map((item) => (
						<AccordionItem key={item.key} value={item.key}>
							<AccordionHeader className='p-0 m-0'>
								<AccordionTrigger
									className={cx(
										'p-0 m-0 w-full text-h2',
										'border-0 cursor-pointer bg-transparent font-semibold p-0 w-full',
										'flex items-center justify-between',
										'border-b border-b-bg-secondary-1'
									)}
								>
									<span className='flex flex-wrap text-align-initial'>
										{item.title}
									</span>
									<BiChevronUpCircle
										aria-hidden
										className={cx(
											'min-w-fit',
											'border-0 cursor-pointer bg-transparent font-semibold text-bg-secondary-1',
											accordionClasses.rotate180OnOpen,
											'duration-150 text-3xl'
										)}
									/>
								</AccordionTrigger>
							</AccordionHeader>
							{item.accordionContent}
						</AccordionItem>
					))}
				</AccordionRoot>
			</section>
		</>
	);
};

export default CustomerProfileScreen;
