import type { IKnockPluginPageProps } from '@pages/knock';
import VideosContainer from '@components/shared/core/VideosContainer';

import AddItemOnHeroSectionButton from '@components/shared/core/AddItemOnHeroSectionButton';

const VideosSection = ({
	knockPlugin
}: {
	knockPlugin: IKnockPluginPageProps['knockPlugin'];
}) => {
	return (
		<section className='bg-primary-1 text-primary-2 section-p-x-v1 section-pb-v1'>
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
						src: 'https://www.youtube.com/embed/LMOG2rvxqGk',
						title:
							'KNOCK: Before and After | Before & After - YouTube video player',
						frameBorder: '0',
						allow:
							'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true
					}
				]}
				buttonElem={<AddItemOnHeroSectionButton product={knockPlugin} />}
			/>
		</section>
	);
};

export default VideosSection;
