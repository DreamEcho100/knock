'use client';
import { useQueryClient } from '@tanstack/react-query';
import { IUserSession } from 'types';
import { useGetUserDataFromStore } from '@utils/core/hooks';
import { getIdFromGid } from '@utils/core/shopify';
import { useEffect, useState } from 'react';

// import {
// } from './sections';

const TitleValue = ({
	title,
	value,
	isSmall
}: {
	title: string;
	value: string;
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

const CustomerProfileScreen = () => {
	// const { getUser } = useGetUserDataFromStore();
	// const user = getUser();

	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<IUserSession>(['check-token']);

	const [counter, setCounter] = useState(0);

	useEffect(() => {
		if (!user) return;
		setTimeout(() => setCounter((prev) => prev++), 3000);
	}, [user]);

	console.log('++++++user', user);
	console.log('counter', counter);
	if (user?.isLoading)
		return (
			<section className='bg-primary-1 p-8 sm:p-16'>
				<button onClick={() => setCounter((prev) => prev++)}>
					Loading...{counter}
				</button>
			</section>
		);

	if (!user?.data)
		return (
			<section className='bg-primary-1 p-8 sm:p-16'>
				<p>Please login first to view your data</p>
			</section>
		);

	// console.log('user.data.orders', user.data.orders);

	const orders = user.data.orders.edges;

	return (
		<>
			<section className='bg-primary-1 p-8 sm:p-16'>
				<h2 className='text-h2 capitalize font-bold'>Personal Details</h2>
				<TitleValue title='first Name:' value={user.data.firstName} />
				<TitleValue title='last Name:' value={user.data.lastName} />
				<TitleValue title='email:' value={user.data.email} />
				<TitleValue
					title='created at:'
					value={new Date(user.data.createdAt).toLocaleString()}
					isSmall
				/>
			</section>

			<section className='bg-primary-1 p-8 sm:p-16'>
				<h2>Orders</h2>
				{orders.map(({ node: order }) => (
					<div className='' key={order.id}>
						<TitleValue title='id:' value={order.id} />
						<TitleValue
							title='total price:'
							value={`${order.totalPrice.amount} ${order.totalPrice.currencyCode}`}
						/>
						<TitleValue
							title='total tax:'
							value={`${order.totalTax.amount} ${order.totalTax.currencyCode}`}
						/>
						<TitleValue
							title='total shipping price:'
							value={`${order.totalShippingPrice.amount} ${order.totalShippingPrice.currencyCode}`}
						/>
						{!!parseFloat(order.totalRefunded.amount) && (
							<TitleValue
								title='total refunded:'
								value={`${order.totalRefunded.amount} ${order.totalRefunded.currencyCode}`}
							/>
						)}
					</div>
				))}
			</section>
		</>
	);
};

export default CustomerProfileScreen;
