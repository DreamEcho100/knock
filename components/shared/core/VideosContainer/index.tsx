import { IframeHTMLAttributes, useState } from 'react';
import type { IButtonProps } from '@components/shared/core/Button';
import Button from '@components/shared/core/Button';
import { FaPlay } from 'react-icons/fa';
import classes from '../../../../styles/youtubeSection.module.scss'
const VideosContainer = ({
	iframes,
	buttonProps = {},
	buttonElem
}: {
	iframes: IframeHTMLAttributes<HTMLIFrameElement>[];
	buttonProps?: IButtonProps;
	buttonElem?: JSX.Element;
}) => {

	const [isYoutubeVideo , setIsYoutubeVideo] = useState(10)
	return (
		<div className='flex w-full flex-col gap-4 md:gap-8 lg:gap-12'>
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
					<div key={index} className={"relative " + classes.youtubeIframe } style={{width:'450px'}} >
					{isYoutubeVideo !== index ? <div  onClick={() => setIsYoutubeVideo(index) } style={{backgroundImage:`url(${iframe.srcDoc})`  , width:'410px' , height:'230px' , borderRadius:"25px"}} className={`bg-cover bg-center  flex flex-col items-center justify-center `} > 
						<button className={"flex flex flex-col items-center justify-center bg-[#7548FE] rounded-2xl  border-black w-20 h-12"} >
							<FaPlay className={"text-white"} />
						</button>
					</div> :
					<iframe
						key={index}
						width='450'
						height='325'
						src={iframe.src}
						allow={iframe.allow}
						// title='YouTube video player'
						className='overflow-hidden rounded-2xl max-w-[90%] h-56 sm:h-auto aspect-video'
					/>}
					</div>
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
