import AddItemOnHeroSectionButton from '@components/shared/core/AddItemOnHeroSectionButton';
import VideosContainer from '@components/shared/core/VideosContainer';
import { IKnockClipperPageProps } from '@pages/knock-clipper';

const VideosSection = ({
	knockClipperPlugin,
	data
}: {
	knockClipperPlugin: IKnockClipperPageProps['knockClipperPlugin'];
	data: any;
}) => {
	return (
		<section className='pt-[2.75rem] lg:pt-[4.75rem] bg-primary-1 text-primary-2 section-p-v1 flex flex-col'>
			<div className='p-1' />
			<VideosContainer
				iframes={[
					{
						src: `${data.youtubeUrl}?autoplay=1`,
						srcDoc: data.youtubeImageUrl,
						title:
							"The only soft clipper you'll ever need 🥁🔥 - YouTube video player",
						frameBorder: '0',
						allow:
							'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true
					},
					{
						src: `${data.youtubeUrl2}?autoplay=1`,
						srcDoc: data.youtubeImageUrl2,
						title:
							'KNOCK Clipper vs Fruity Soft Clipper vs Glue Compressor - Shootout - YouTube video player',
						frameBorder: '0',
						allow:
							'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true
					}
				]}
				buttonElem={
					<AddItemOnHeroSectionButton
						product={knockClipperPlugin}
						buttonProps={{ children: data ? data.button : false }}
					/>
				}
				data={data ? data : ''}
			/>
		</section>
	);
};

export default VideosSection;
