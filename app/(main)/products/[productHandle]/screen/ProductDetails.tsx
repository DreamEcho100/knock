'use client';
import Button from '~/app/_components/shared/core/Button';
import Image from 'next/image';
import React from 'react';
import classes from '~/app/_styles/productsPages.module.css';
import { type ICustomProduct } from '~/types';
import {
	cartStore,
	getCartLineItemPendingUpsertOrUpdateKey,
} from '~/libs/shopify/stores/cart';
import { useStore } from 'zustand';

export default function ProductDetails({
	product,
}: {
	product: ICustomProduct;
}) {
	const cartState = useStore(cartStore, (state) => state.state);
	const isPending = useStore(
		cartStore,
		(state) =>
			state.pendingActions[
				getCartLineItemPendingUpsertOrUpdateKey(
					product.id,
					product.variants[0].id,
				)
			],
	);
	const isLoading = isPending || cartState === 'loading';
	const isDisabled = cartState === 'idle';

	return (
		<div className={classes.ProductCardDetailsContainer}>
			<div></div>
			<div className={classes.ProductCardDetails}>
				<div>
					<Image
						alt={product.title}
						width={product.variants[0].image.width}
						height={product.variants[0].image.height}
						src={product.variants[0].image.url}
						priority
					/>
				</div>
				<div>
					<h4> DECAP - {product.title}</h4>
					{product.variants[0].compareAtPrice?.amount ? (
						<div className={classes.ProductCardDetailsPriceSales}>
							<p> ${product.variants[0].compareAtPrice.amount}0 </p>{' '}
							<p> ${product.variants[0].price.amount}0 </p>
						</div>
					) : (
						<div className={classes.ProductCardDetailsPrice}>
							<p> ${product.variants[0].price.amount}0 </p>
						</div>
					)}
					<p>
						Pay in 4 interest-free installments of $12.50 with{' '}
						<Image
							width={143}
							height={32}
							src={'/images/shoppay.png'}
							alt="shoppay"
						/>{' '}
					</p>
					<div>
						<Button
							onClick={() =>
								void cartStore.getState().upsertCartItem(product.variants[0], {
									...product,
									description: product.originalDescription,
								})
							}
							disabled={isDisabled}
							classesIntent={{ isLoading }}
						>
							Add To Cart
						</Button>
						<div className={classes.cardsPayments}>
							<Image
								alt="paymentCards"
								width={900}
								height={150}
								src={'/images/payment_cards.png'}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
