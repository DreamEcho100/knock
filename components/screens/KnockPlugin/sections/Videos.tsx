import type { IKnockPluginPageProps } from '@pages/knock-plugin';
import VideosContainer from '@components/shared/core/VideosContainer';

import { useAddKnockPluginToCartButtonProps } from './utils/hookes';

const VideosSection = ({
	knockPlugin
}: {
	knockPlugin: IKnockPluginPageProps['knockPlugin'];
}) => {
	const addKnockPluginToCartButtonProps = useAddKnockPluginToCartButtonProps({
		knockPlugin
	});
	return (
		<section className='bg-primary-1 text-primary-2 px-4 py-20'>
			<VideosContainer
				iframes={[
					{
						src: 'https://www.youtube.com/embed/adhIJxIHzkg?controls=0',
						title:
							'This plugin will make your drums KNOCK - YouTube video player',
						frameBorder: '0',
						allow:
							'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true
					},
					{
						src: 'https://player.vimeo.com/video/641066429?h=9d21e759ca',
						title: 'KNOCK Plugin | Before and After - Vimeo video player',
						frameBorder: '0',
						allow:
							'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true
					}
				]}
				buttonProps={addKnockPluginToCartButtonProps}
			/>
		</section>
	);
};

export default VideosSection;
