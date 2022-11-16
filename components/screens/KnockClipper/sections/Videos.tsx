import VideosContainer from '@components/shared/core/VideosContainer';
import { IKnockClipperPageProps } from '@pages/knock_clipper';
import { useAddKnockPluginToCartButtonProps } from './utils/hookes';

const VideosSection = ({
	knockClipperPlugin
}: {
	knockClipperPlugin: IKnockClipperPageProps['knockClipperPlugin'];
}) => {
	const addKnockPluginToCartButtonProps = useAddKnockPluginToCartButtonProps({
		knockClipperPlugin,
		text: 'Add To Cart'
	});

	return (
		<section className='pt-[2.75rem] lg:pt-[4.75rem] bg-primary-1 text-primary-2 section-p-v1 flex flex-col'>
			<div className='p-1' />
			<VideosContainer
				iframes={[
					{
						src: 'https://www.youtube.com/embed/0u4-MZiPtPI?controls=0',
						title:
							"The only soft clipper you'll ever need 🥁🔥 - YouTube video player",
						frameBorder: '0',
						allow:
							'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true
					},
					{
						src: 'https://www.youtube.com/embed/hM3IMIPc6DA?controls=0',
						title:
							'KNOCK Clipper vs Fruity Soft Clipper vs Glue Compressor - Shootout - YouTube video player',
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
