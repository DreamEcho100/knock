import VideosContainer from '~/app/_components/shared/core/VideosContainer';
import AddItemOnHeroSectionButton from '~/app/_components/shared/core/AddItemOnHeroSectionButton';
import type { Product } from '~/libs/shopify/types';

export default function VideosSection({
	knockPlugin,
	data,
}: {
	knockPlugin: Product;
	data: any;
}) {
	return (
		<section className="bg-primary-1 text-primary-2 section-p-x-v1 section-pb-v1">
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
						allowFullScreen: true,
					},
					{
						src: `${data.youtubeUrl2}?autoplay=1`,
						srcDoc: data.youtubeImageUrl2,
						title:
							'KNOCK: Before and After | Before & After - YouTube video player',
						frameBorder: '0',
						allow:
							'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true,
					},
				]}
				buttonElem={
					<AddItemOnHeroSectionButton
						product={knockPlugin}
						buttonProps={{ children: data.button }}
					/>
				}
				data={data}
			/>
		</section>
	);
}
