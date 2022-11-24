import type { IProductByIdPageProps } from '@pages/products/[productId]';

import Button from '@components/shared/core/Button';

import CustomNextImage from '@components/shared/common/CustomNextImage';

import classes from '@styles/productsPages.module.scss';
import ProductDetails from '@components/screens/ProductById/sections/ProductDetails';

const HeroSection = ({ product }: IProductByIdPageProps) => {
	const renderFeature = () => {
		switch (product.handle) {
			case 'decap-ableton-live-masterclass':
				return (
					<div className={classes.productPageFeatures}>
						<div className={classes.overLayFeatures}></div>
						<div>
							{product.filesIncluded.details.length ? (
								<ul className={classes.productPageDetailsUl}>
									{product.filesIncluded.details.map((el, index) => (
										<li key={index}>{el}</li>
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
									{product.features.map((el: any, index: any) => (
										<li key={index}>{el}</li>
									))}
								</ul>
							) : (
								''
							)}
							{product.filesIncluded.details.length ? (
								<ul>
									{product.filesIncluded.count ? (
										<li className={classes.productPageIncludeLi}>
											include: {product.filesIncluded.count} files
										</li>
									) : (
										''
									)}
									{product.filesIncluded.details.map((el, index) => (
										<li key={index}>{el}</li>
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
				<div>
					{(product.description as unknown as any[]).map(
						(el: any, index: any) => (
							<p key={index}> {el} </p>
						)
					)}
				</div>
				{renderFeature()}
				{product.video ? (
					<div className={classes.productPageYoutubeSections}>
						<h4>{product.video.title}</h4>
						<div>
							<div className={classes.overLayYoutubeSection}></div>
							<iframe src={product.video.src} />
							{product.video.srcTwo ? (
								<iframe src={product.video.srcTwo} />
							) : (
								''
							)}
						</div>
					</div>
				) : (
					''
				)}
			</div>
		</section>
	);
};

export default HeroSection;
