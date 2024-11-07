'use client';
import Link from 'next/link';
import { commonClasses } from '../../..';
import { AiFillCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import { cartStore } from '~/libs/shopify/stores/cart';
import { useStore } from 'zustand';
import { getProduct } from '~/libs/shopify';
import type { ShopifyProduct } from '~/libs/shopify/types';
import { reshapeShopifyProduct } from '~/libs/shopify/utils';
import { generalStore } from '~/libs/stores/general';
import { createPortal } from 'react-dom';

export default function CartBanner({ data }: { data?: any }) {
	const isBannerVisible = useStore(
		generalStore,
		(state) => state.isVisible.banner,
	);

	if (!isBannerVisible || data.disable) {
		return null;
	}

	const bannerId = data?.bannerUrl.split('/')[1];
	const addToCart = async () => {
		if (parseInt(bannerId)) {
			try {
				const data = await axios
					.get(`/api/products/product?id=${bannerId}`)
					.then((res) =>
						reshapeShopifyProduct(res.data.product as ShopifyProduct),
					);

				if (!data?.variants[0]) {
					throw new Error('Product not found');
				}

				await cartStore.getState().upsertCartItem(data?.variants[0], data);
				cartStore.getState().setIsOpen(true);
			} catch (error) {
				if (error.response) {
					return toast.warn('Product not found');
				}
			}
		} else {
			try {
				const data = await getProduct(
					bannerId === 'knock' ? 'knock-plugin' : bannerId,
				);

				if (!data?.variants[0]) {
					throw new Error('Product not found');
				}

				await cartStore.getState().upsertCartItem(data?.variants[0], data);
				cartStore.getState().setIsOpen(true);
			} catch (error) {
				if (error.response) {
					return toast.warn(error.response.data.message);
				}
			}
		}
	};

	const bannerContainer = document.getElementById('banner-container');

	if (!bannerContainer) {
		return null;
	}

	return createPortal(
		<div
			style={{ background: data.background }}
			data-testid="banner-test"
			className={`${commonClasses} ${
				isBannerVisible ? '' : 'h-0'
			} w-full flex gap-4 items-center justify-center px-4 py-2`}
			id="test2"
		>
			<div
				className="flex flex-col items-center gap-2 md:flex-row md:gap-3"
				style={{ color: data.textColor }}
			>
				{data.text ? <h4 className="text-center">{data.text}</h4> : ''}
				{data.bannerUrlText &&
					(!data.isAddToCartButton ? (
						<div>
							<Link
								href={
									Number(bannerId) ? '/products/' + bannerId : data.bannerUrl
								}
								className="px-5 border text-bold rounded-3xl"
							>
								{data.bannerUrlText}
							</Link>
						</div>
					) : (
						<button
							className="px-5 border text-bold rounded-3xl"
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							onClick={addToCart}
						>
							{data.bannerUrlText}
						</button>
					))}
			</div>
			<button
				onClick={() => generalStore.getState().setIsVisible('banner', false)}
				type="button"
				className="shrink-0"
			>
				<AiFillCloseCircle
					id="AiFillCloseCircle"
					style={{ color: data.textColor }}
				/>
			</button>
		</div>,
		bannerContainer,
	);
}
