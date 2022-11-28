import type { IProductByIdPageProps } from '@pages/products/[productId]';

import Button from '@components/shared/core/Button';

import CustomNextImage from '@components/shared/common/CustomNextImage';

import classes from '@styles/productsPages.module.scss';
import ProductDetails from '@components/screens/ProductById/sections/ProductDetails';
import Link from 'next/link';

const HeroSection = ({ product }: IProductByIdPageProps) => {
	const renderFeature = () => {
		switch (product.handle) {
			case 'decap-ableton-live-masterclass':
			case 'complete-knock-bundle-v2-all-digital-products':
				return (
					<div>
						<div>
							{(product.description as unknown as any[]).map(
								(el: any, index: any) => (
									<p key={index}> {el} </p>
								)
							)}
						</div>
						<div className={classes.productPageFeaturesWithOneBox}>
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
										{product.features.map((el, index) => (
											<li key={index}>{el}</li>
										))}
									</ul>
								) : (
									''
								)}
							</div>
						</div>
					</div>
				);

			case 'drums-that-knock-vol-1':
			case 'drums-that-knock-vol-2':
			case 'drums-that-knock-vol-3':
			case 'drums-that-knock-vol-4':
				return (
					<div className={classes.productPageFeaturesSmallBox}>
						<div className={classes.overLayFeaturesSection}></div>
						<div>
							{product.features.length ? (
								<ul className={classes.productPageFeaturesBox}>
									{product.features.map((el: any, index: any) => (
										<li key={index}>{el}</li>
									))}
								</ul>
							) : (
								''
							)}
							{product.filesIncluded.details.length ? (
								<ul className={classes.productPageFeaturesBox}>
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

			case 'drums-that-knock-x':
				return (
					<div className={classes.productPageFeaturesBigBox}>
						<div className={classes.overLayFeaturesSection}></div>
						<div>
							{product.features.length ? (
								<ul className={classes.productPageFeaturesBox}>
									{product.features.map((el: any, index: any) => (
										<li key={index}>{el}</li>
									))}
								</ul>
							) : (
								''
							)}
							{product.filesIncluded.details.length ? (
								<ul className={classes.productPageFeaturesBox}>
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

				{renderFeature()}
				{product.video ? (
					<div className={classes.productPageYoutubeSections}>
						{product.video.title ? <h4>{product.video.title}</h4> : ''}
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
				<Button className={classes.GoBackLink} href={'/drums-that-knock'}>
					{' '}
					GO BACK{' '}
				</Button>
			</div>
		</section>
	);
};

export default HeroSection;
