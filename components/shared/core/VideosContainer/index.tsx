import type { IframeHTMLAttributes } from 'react';
import type { IButtonProps } from '@components/shared/core/Button';
import Button from '@components/shared/core/Button';

const VideosContainer = ({
	iframes,
	buttonProps = {}
}: {
	iframes: IframeHTMLAttributes<HTMLIFrameElement>[];
	buttonProps?: IButtonProps;
}) => {
	return (
		<div
			className='container-restrictions-2
		flex flex-col gap-12'
		>
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
						height='350'
						// src='https://www.youtube.com/embed/4fiC6Zi0Wnw'
						// title='YouTube video player'
						{...iframe}
						className='overflow-hidden rounded-2xl max-w-[90%] h-56 sm:h-auto aspect-video'
					/>
				))}
			</div>
			<div className='flex items-center justify-center mb-4'>
				<Button className='capitalize' {...buttonProps}>
					add to cart
				</Button>
			</div>
		</div>
	);
};

export default VideosContainer;
