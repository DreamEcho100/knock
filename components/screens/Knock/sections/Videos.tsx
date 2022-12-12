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
						src: 'https://www.youtube.com/embed/adhIJxIHzkg?autoplay=1',
						srcDoc: 'https://i.ytimg.com/vi/adhIJxIHzkg/sddefault.jpg',
						title:
							'This plugin will make your drums KNOCK - YouTube video player',
						frameBorder: '0',
						allow:
							'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true
					},
					{
						src: 'https://www.youtube.com/embed/LMOG2rvxqGk?autoplay=1',
						srcDoc:
							'https://i.ytimg.com/vi/LMOG2rvxqGk/sddefault.jpg?sqp=-oaymwEmCIAFEOAD8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGMgYyhjMA8=&rs=AOn4CLCBtGH38Chf3EaWBsf4pnHCWR6oQw',
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
						buttonProps={{ children: 'Add To Cart' }}
					/>
				}
			/>
		</section>
	);
};

export default VideosSection;
