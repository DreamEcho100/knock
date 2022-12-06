import AddItemOnHeroSectionButton from '@components/shared/core/AddItemOnHeroSectionButton';
import VideosContainer from '@components/shared/core/VideosContainer';
import { IKnockClipperPageProps } from '@pages/knock-clipper';

const VideosSection = ({
	knockClipperPlugin
}: {
	knockClipperPlugin: IKnockClipperPageProps['knockClipperPlugin'];
}) => {
	return (
		<section className='pt-[2.75rem] lg:pt-[4.75rem] bg-primary-1 text-primary-2 section-p-v1 flex flex-col'>
			<div className='p-1' />
			<VideosContainer
				iframes={[
					{
						src: 'https://www.youtube.com/embed/0u4-MZiPtPI?autoplay=1',
						srcDoc:"https://i.ytimg.com/vi/0u4-MZiPtPI/sddefault.jpg",
						title:
							"The only soft clipper you'll ever need 🥁🔥 - YouTube video player",
						frameBorder: '0',
						allow:'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true
					},
					{
						src: 'https://www.youtube.com/embed/hM3IMIPc6DA?autoplay=1',
						srcDoc:"https://i.ytimg.com/vi/hM3IMIPc6DA/sddefault.jpg",
						title:
							'KNOCK Clipper vs Fruity Soft Clipper vs Glue Compressor - Shootout - YouTube video player',
						frameBorder: '0',
						allow:'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true
					}
				]}
				buttonElem={<AddItemOnHeroSectionButton product={knockClipperPlugin} />}
			/>
		</section>
	);
};

export default VideosSection;
