import Button from '@components/shared/core/Button';
import { setCookie } from '@utils/common/storage/cookie/document';
import React from 'react';
import CustomNextImage from '../CustomNextImage';
import Dialog from '../Dialog';

const MarketingPopup = (props: any) => {
	let expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + 2);

	return (
		<Dialog
			isMarketingPopup={true}
			isOpen={props.open}
			setIsOpen={props.onOpenChange}
		>
			<div className=' m-4 flex justify-center'>
				<CustomNextImage
					isAnimated={false}
					alt={props.popup.h2}
					width={300}
					unoptimized
					height={300}
					src={process.env.NEXT_PUBLIC_KNOCK_URL_API + props.popup.mainImageUrl}
				/>
			</div>
			<div className='m-4  flex flex-col items-center gap-5'>
				<h2 style={{ color: props.popup.h2Color }}>{props.popup.h2}</h2>
				<p style={{ color: props.popup.pColor }}>{props.popup.p}</p>
				<Button
					onClick={() => {
						props.onOpenChange(false),
							setCookie('hide-marketing-popup', 'true', {
								path: '/',
								expires: expirationDate
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
