import type { IframeHTMLAttributes } from 'react';
import type { IButtonProps } from '@components/shared/core/Button';
import Button from '@components/shared/core/Button';

const VideosContainer = ({
	iframes,
	buttonProps = {},
	buttonElem
}: {
	iframes: IframeHTMLAttributes<HTMLIFrameElement>[];
	buttonProps?: IButtonProps;
	buttonElem?: JSX.Element;
}) => {
	return (
		<div className='flex flex-col gap-4 md:gap-8 lg:gap-12'>
			<header className='text-center'>
				<h2 className='text-h3 text-primary-1 font-semibold uppercase'>
					take your drums to the next level
				</h2>
			</header>
			<div
				className='flex flex-col items-center justify-center gap-12
		lg:flex-row'
			>
				{iframes.map((iframe, index) => (
					<iframe
						key={index}
						width='450'
						height='325'
						// src='https://www.youtube.com/embed/4fiC6Zi0Wnw'
						// title='YouTube video player'
						{...iframe}
						className='overflow-hidden rounded-2xl max-w-[90%] h-56 sm:h-auto aspect-video'
					/>
				))}
			</div>
			<div className='flex items-center justify-center mt-2'>
				{buttonElem || (
					<Button className='capitalize' {...buttonProps}>
						add to cart
					</Button>
				)}
			</div>
		</div>
	);
};

export default VideosContainer;
