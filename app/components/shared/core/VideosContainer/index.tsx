'use client';
import type { IButtonProps } from '~/app/components/shared/core/Button';
import Button from '~/app/components/shared/core/Button';

import { type IframeHTMLAttributes, useState } from 'react';

import { FaPlay } from 'react-icons/fa';

const VideosContainer = ({
	iframes,
	buttonProps = {},
	buttonElem,
	data,
}: {
	iframes: IframeHTMLAttributes<HTMLIFrameElement>[];
	buttonProps?: IButtonProps;
	buttonElem?: JSX.Element;
	data: any;
}) => {
	const [isYoutubeVideo, setIsYoutubeVideo] = useState(10);

	return (
		<div className="flex w-full flex-col gap-4 md:gap-8 lg:gap-12">
			<header className="text-center">
				<h2 className="text-h3 text-primary-1 font-semibold uppercase">
					{data.h2}
				</h2>
			</header>
			<div
				className="flex flex-col items-center justify-center gap-8
		lg:flex-row max-w-[95%] mx-auto"
			>
				{/* classes.youtubeIframe */}
				{iframes.map((iframe, index) => (
					<div
						key={index}
						className="relative max-w-[28rem] w-full flex flex-wrap items-center justify-center group"
					>
						{isYoutubeVideo !== index ? (
							<div
								onClick={() => setIsYoutubeVideo(index)}
								style={{
									backgroundImage: `url(${iframe.srcDoc})`,
									width: '410px',
									height: '230px',
									borderRadius: '25px',
								}}
								className={`extra-sm:bg-cover bg-center rounded-2xl flex flex-col items-center justify-center w-full cursor-pointer `}
							>
								<button
									className={
										'flex flex-col items-center justify-center bg-secondary-1 transition-all duration-150 group-hover:bg-purple-700 rounded-2xl  border-black w-20 h-12'
									}
								>
									<FaPlay className={'text-white'} />
								</button>
							</div>
						) : (
							<iframe
								key={index}
								width="450"
								height="325"
								src={iframe.src}
								allow={iframe.allow}
								// title='YouTube video player'
								className="overflow-hidden rounded-2xl w-full aspect-video"
								loading="lazy"
							/>
						)}
					</div>
				))}
			</div>
			<div className="flex items-center justify-center mt-2">
				{buttonElem ?? (
					<Button className="capitalize" {...buttonProps}>
						add to cart
					</Button>
				)}
			</div>
		</div>
	);
};

export default VideosContainer;
