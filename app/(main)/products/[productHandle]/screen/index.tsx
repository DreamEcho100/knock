import Button from '~/app/_components/shared/core/Button';

import classes from '~/app/_styles/productsPages.module.css';
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
			case 'knock-plugin-sample-bundle':
				return (
					<div>
						<div className={classes.productPageFeaturesWithOneBox}>
							<p className="text-xl mb-0">
								The complete bundle of Knock Audio software and sound packs
								comes with everything you need to make hard hitting beats!
								Included:
							</p>
							<div>
								<ul className={classes.productPageDetailsUl}>
									{/** biome-ignore lint/a11y/useValidAriaProps: <explanation> */}
									<li data-type="none" className="text-white">
										<strong>Included:</strong>
									</li>
									{[
										'Drums That Knock Vol. 1',
										'Drums That Knock Vol. 2',
										'Drums That Knock Vol. 3',
										'Drums That Knock Vol. 4',
										'Drums That Knock Vol. 5',
										'Drums That Knock Vol. 6',
										'Drums That Knock Vol. 7',
										'Drums That Knock Vol. 8',
										'Drums That Knock Vol. 9',
										'Drums That Knock X (Complete Edition)',
									].map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
							<div className={classes.overLayFeatures}></div>
						</div>
					</div>
				);

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
								{product.filesIncluded?.length ? (
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
								{product.features?.length ? (
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
							{product.features?.length ? (
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
							{product.filesIncluded?.length ? (
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
							{product.features?.length ? (
								<ul>
									{product.features.map((el) => (
										<li key={el.id}>{el.li}</li>
									))}
								</ul>
							) : (
								''
							)}
							{product.filesIncluded?.length ? (
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
