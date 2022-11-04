import Button from '../Button';

const VideosContainer = () => {
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
				<iframe
					width='800'
					height='400'
					src='https://www.youtube.com/embed/4fiC6Zi0Wnw'
					title='YouTube video player'
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
					className='overflow-hidden rounded-2xl'
				></iframe>
				<iframe
					width='800'
					height='400'
					src='https://www.youtube.com/embed/4fiC6Zi0Wnw'
					title='YouTube video player'
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
					className='overflow-hidden rounded-2xl'
				></iframe>
			</div>
			<div className='flex items-center justify-center mt-8'>
				<Button className='capitalize'>add to cart</Button>
			</div>
		</div>
	);
};

export default VideosContainer;
