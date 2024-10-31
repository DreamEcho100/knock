import AddItemOnHeroSectionButton from '~/app/_components/shared/core/AddItemOnHeroSectionButton';
import VideosContainer from '~/app/_components/shared/core/VideosContainer';
import type { Product } from '~/libs/shopify/types';

const VideosSection = ({
	product,
	pageData,
}: {
	product: Product;
	pageData: any;
}) => {
	return (
		<section className="pt-[2.75rem] lg:pt-[4.75rem] bg-primary-1 text-primary-2 section-p-v1 flex flex-col">
			<div className="p-1" />
			<VideosContainer
				iframes={[
					{
						src: `${pageData.youtubeUrl}?autoplay=1`,
						srcDoc: pageData.youtubeImageUrl,
						title:
							"The only soft clipper you'll ever need 🥁🔥 - YouTube video player",
						frameBorder: '0',
						allow:
							'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true,
					},
					{
						src: `${pageData.youtubeUrl2}?autoplay=1`,
						srcDoc: pageData.youtubeImageUrl2,
						title:
							'KNOCK Clipper vs Fruity Soft Clipper vs Glue Compressor - Shootout - YouTube video player',
						frameBorder: '0',
						allow:
							'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true,
					},
				]}
				buttonElem={
					<AddItemOnHeroSectionButton
						product={product}
						buttonProps={{ children: pageData ? pageData.button : false }}
					/>
				}
				data={pageData ? pageData : ''}
			/>
		</section>
	);
};

export default VideosSection;
