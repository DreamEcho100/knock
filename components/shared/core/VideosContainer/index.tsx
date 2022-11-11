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
		flex flex-col gap-16'
		>
			<header className='text-center'>
				<h2 className='text-[2.75rem] text-primary-1 font-bold uppercase'>
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
						width='800'
						height='400'
						// src='https://www.youtube.com/embed/4fiC6Zi0Wnw'
						// title='YouTube video player'
						{...iframe}
						className='overflow-hidden rounded-2xl'
					/>
				))}
			</div>
			<div className='flex items-center justify-center mt-8'>
				<Button className='capitalize' {...buttonProps}>
					add to cart
				</Button>
			</div>
		</div>
	);
};

export default VideosContainer;
