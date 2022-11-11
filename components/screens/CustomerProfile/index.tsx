import Button from '@components/shared/core/Button';
import CustomNextImage from '@components/shared/common/CustomNextImage';

import { Transition } from '@headlessui/react';

import {
	Root as AccordionRoot,
	Item as AccordionItem,
	Header as AccordionHeader,
	Trigger as AccordionTrigger,
	Content as AccordionContent
} from '@radix-ui/react-accordion';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import accordionClasses from '@styles/accordion.module.css';

import { useGetUserDataFromStore } from '@utils/core/hooks';
import { getIdFromGid, priceCurrencyFormatter } from '@utils/core/shopify';

import type { IUser } from 'types';

import { cx } from 'class-variance-authority';

import { Fragment, useState } from 'react';

import { BiChevronUpCircle } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

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
			<DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
				<Transition.Root show={isOpen}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-150'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-50'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<DialogPrimitive.Overlay
							forceMount
							className='fixed inset-0 z-20 bg-black/50'
						/>
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<DialogPrimitive.Content
							forceMount
							className={cx(
								'fixed z-50',
								'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
								'flex flex-col gap-4',
								'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
								'bg-white dark:bg-neutral-900',
								'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
							)}
						>
							<header>
								<DialogPrimitive.Title className='text-h3 font-bold text-gray-900 dark:text-gray-100'>
									Products
								</DialogPrimitive.Title>
								{/* <DialogPrimitive.Description className='mt-2 text-base font-normal text-gray-700 dark:text-gray-400'>
									description
								</DialogPrimitive.Description> */}
							</header>
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
							<DialogPrimitive.Close
								className={cx(
									'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
									'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
								)}
							>
								<IoMdClose className='h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400' />
							</DialogPrimitive.Close>
						</DialogPrimitive.Content>
					</Transition.Child>
				</Transition.Root>
			</DialogPrimitive.Root>
		</>
	);
};

const CustomerProfileScreen = () => {
	const { user } = useGetUserDataFromStore();

	if (user.status === 'loading' && user.fetchStatus === 'fetching')
		return (
			<section className='bg-primary-1 section-p-v1'>
				<p>Loading...</p>
			</section>
		);

	if (!user.isSuccess)
		return (
			<section className='bg-primary-1 section-p-v1'>
				<p>
					{!user.isSuccess
						? 'Please login first to view your data'
						: "Your data doesn't exist \u{1F928}"}
				</p>
			</section>
		);

	const orders = user.data.orders.edges;

	const accordionDetails = [
		{
			key: 'personalDetails',
			title: 'Personal Details',
			accordionContent: (
				<AccordionContent className='py-4'>
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
									'border-0 cursor-pointer bg-transparent font-bold p-0 w-full',
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
										'border-0 cursor-pointer bg-transparent font-bold text-bg-secondary-1',
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
	);
};

export default CustomerProfileScreen;
