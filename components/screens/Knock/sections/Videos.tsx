import type { IKnockPluginPageProps } from '@pages/knock';
import VideosContainer from '@components/shared/core/VideosContainer';

import AddItemOnHeroSectionButton from '@components/shared/core/AddItemOnHeroSectionButton';

const VideosSection = ({
	knockPlugin,
	data
}: {
	knockPlugin: IKnockPluginPageProps['knockPlugin'];
	data: any;
}) => {
	return (
		<section className='bg-primary-1 text-primary-2 section-p-x-v1 section-pb-v1'>
			<VideosContainer
				iframes={[
					{
						src: `${data.youtubeUrl}?autoplay=1`,
						srcDoc: data.youtubeImageUrl,
						title:
							'This plugin will make your drums KNOCK - YouTube video player',
						frameBorder: '0',
						allow:
							'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true
					},
					{
						src: `${data.youtubeUrl2}?autoplay=1`,
						srcDoc: data.youtubeImageUrl2,
						title:
							'KNOCK: Before and After | Before & After - YouTube video player',
						frameBorder: '0',
						allow:
							'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true
					}
				]}
				buttonElem={
					<AddItemOnHeroSectionButton
						product={knockPlugin}
						buttonProps={{ children: data ? data.button : false }}
					/>
				}
				data={data ? data : ''}
			/>
		</section>
	);
};

export default VideosSection;
