import Button from '~/app/components/shared/core/Button';

import classes from '~/app/styles/productsPages.module.scss';
import { Fragment } from 'react';
import { type ICustomProduct } from '~/types';
import ProductDetails from './ProductDetails';
import YoutubeVideos from './YoutubeVideos';

export default function ProductByHandleScreen({
	product,
}: {
	product: ICustomProduct;
}) {
	const renderFeature = () => {
		switch (product.handle) {
			case 'decap-ableton-live-masterclass':
			case 'complete-knock-bundle-v2-all-digital-products':
				return (
					<div>
						<div className="px-8">
							{typeof product.description === 'string' ? (
								<p>{product.description}</p>
							) : (
								product.description.map((el) => (
									<Fragment key={el.id}>
										<p key={el.id}> {el.h3} </p>
										{el.text.map((el, index) => (
											<p key={index}> {el} </p>
										))}
									</Fragment>
								))
							)}
						</div>
						<div className={classes.productPageFeaturesWithOneBox}>
							<div className={classes.overLayFeatures}></div>
							<div>
								{product.filesIncluded.length ? (
									<ul className={classes.productPageDetailsUl}>
										{product.filesIncluded.map((el) => (
											<li key={el.id}>{el.li}</li>
										))}
									</ul>
								) : (
									''
								)}
							</div>
						</div>
					</div>
				);

			case 'melodies-that-knock-vol-1':
			case 'melodies-that-knock-vol-2-free-download':
				return (
					<div>
						<div className={classes.productPageFeaturesWithOneBox}>
							<div className={classes.overLayFeatures}></div>
							<div>
								{product.features.length ? (
									<ul className={classes.productPageDetailsUl}>
										{product.features.map((el) => (
											<li key={el.id}>{el.li}</li>
										))}
									</ul>
								) : (
									''
								)}
							</div>
						</div>
					</div>
				);

			case 'drums-that-knock-vol-8':
			case 'drums-that-knock-vol-9':
			case 'drums-that-knock-vol-7':
			case 'drums-that-knock-x':
				return (
					<div className={classes.productPageFeatures}>
						<div className={classes.overLayFeaturesSection}></div>
						<div>
							{product.features.length ? (
								<ul>
									{product.features.map((el) => (
										<div key={el.id} className="flex flex-col">
											<li>{el.li}</li>
										</div>
									))}
								</ul>
							) : (
								''
							)}
							{product.filesIncluded.length ? (
								<ul className={classes.ul}>
									{product.filesIncluded.map((el) => (
										<div key={el.id}>
											<li>{el.li}</li>
										</div>
									))}
								</ul>
							) : (
								''
							)}
						</div>
					</div>
				);

			default:
				return (
					<div className={classes.productPageFeatures}>
						<div className={classes.overLayFeaturesSection}></div>
						<div>
							{product.features.length ? (
								<ul>
									{product.features.map((el) => (
										<li key={el.id}>{el.li}</li>
									))}
								</ul>
							) : (
								''
							)}
							{product.filesIncluded.length ? (
								<ul>
									{product.filesIncluded.map((el) => (
										<li key={el.id}>{el.li}</li>
									))}
								</ul>
							) : (
								''
							)}
						</div>
					</div>
				);
		}
	};

	return (
		<section className={classes.productPageSection}>
			<div className={classes.productPageContainer}>
				<ProductDetails product={product} />

				{renderFeature()}
				<YoutubeVideos youtubeVideos={product.youtubeVideo} />
				<Button className={classes.GoBackLink} href={'/drums-that-knock'}>
					GO BACK
				</Button>
			</div>
		</section>
	);
}
