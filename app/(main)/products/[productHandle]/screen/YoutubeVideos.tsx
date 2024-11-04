'use client';
import { useState } from 'react';
import { type ICustomProduct } from '~/types';
import { FaPlay } from 'react-icons/fa';
import classes from '~/app/_styles/productsPages.module.css';

type Props = {
	youtubeVideos: ICustomProduct['youtubeVideo'];
};

export default function YoutubeVideos(props: Props) {
	const [isYoutubeVideo, setIsYoutubeVideo] = useState<number | string | null>(
		null,
	);

	if (!props.youtubeVideos || props.youtubeVideos.length === 0) return <></>;

	return (
		<div className={classes.productPageYoutubeSections}>
			{props.youtubeVideos[0].title ? (
				<h4>{props.youtubeVideos[0].title}</h4>
			) : (
				''
			)}
			<div>
				<div className={classes.overLayYoutubeSection}></div>
				{props.youtubeVideos.map((el) => (
					<div key={el.id} className={classes.youtubeVideo}>
						{isYoutubeVideo !== el.id ? (
							<>
								<div
									className="flex flex-col"
									style={{
										backgroundImage: `url(${el.srcImage})`,
										backgroundPosition: 'center',
										backgroundSize: 'cover',
									}}
									onClick={() => setIsYoutubeVideo(el.id)}
								>
									<button>
										<FaPlay />
									</button>
								</div>
							</>
						) : (
							<iframe src={el.src + '?autoplay=1'} allow={'autoplay'} />
						)}
					</div>
				))}
			</div>
		</div>
	);
}
