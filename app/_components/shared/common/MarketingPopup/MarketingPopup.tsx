'use client';
import Button from '~/app/_components/shared/core/Button';
import { getCookie, setCookie } from '~/utils/common/storage/cookie/document';
import React, { useEffect } from 'react';
import CustomNextImage from '../CustomNextImage';
import Dialog from '../Dialog';
import { useStore } from 'zustand';
import { generalStore } from '~/libs/stores/general';

const MarketingPopup = (props: any) => {
	const expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + 2);
	const popupCookies = getCookie('hide-marketing-popup');

	const isMarketingPopupVisible = useStore(
		generalStore,
		(state) => state.isVisible.marketingPopup,
	);

	useEffect(() => {
		if (popupCookies === 'true') {
			generalStore.getState().setIsVisible('marketingPopup', false);
		} else {
			generalStore.getState().setIsVisible('marketingPopup', true);
		}
	}, [popupCookies]);

	return (
		<Dialog
			isMarketingPopup={true}
			isOpen={isMarketingPopupVisible}
			setIsOpen={(isVisible) =>
				generalStore.getState().setIsVisible('marketingPopup', isVisible)
			}
		>
			<div className=" m-4 flex justify-center">
				<CustomNextImage
					alt={props.popup.h2}
					width={300}
					height={300}
					src={process.env.NEXT_PUBLIC_KNOCK_URL_API + props.popup.mainImageUrl}
				/>
			</div>
			<div className="m-4  flex flex-col items-center gap-5">
				<h2 style={{ color: props.popup.h2Color }}>{props.popup.h2}</h2>
				<p style={{ color: props.popup.pColor }}>{props.popup.p}</p>
				<Button
					onClick={() => {
						props.onOpenChange(false),
							setCookie('hide-marketing-popup', 'true', {
								path: '/',
								expires: expirationDate,
							});
					}}
					style={{ backgroundColor: props.popup.buttonColor }}
					href={props.popup.buttonLink}
				>
					{props.popup.buttonText}
				</Button>
			</div>
		</Dialog>
	);
};

export default MarketingPopup;
