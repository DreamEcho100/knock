import type { IProductByIdPageProps } from '@pages/products/[productId]';

import Button from '@components/shared/core/Button';

import CustomNextImage from '@components/shared/common/CustomNextImage';

import classes from '@styles/productsPages.module.scss';
import ProductDetails from '@components/screens/ProductById/sections/ProductDetails';
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa';
import { Fragment, useState } from 'react';

const HeroSection = ({ product }: { product: any }) => {
	const [isYoutubeVideo, setIsYoutubeVideo] = useState(null);

	const renderFeature = () => {
		switch (product.handle) {
			case 'decap-ableton-live-masterclass':
			case 'complete-knock-bundle-v2-all-digital-products':
				return (
					<div>
						<div className='px-8'>
							{(product.description as unknown as any[]).map((el: any) => (
								<Fragment key={el.id}>
									<p key={el.id}> {el.h3} </p>
									{el.text.map((el: string, index: any) => (
										<p key={index}> {el} </p>
									))}
								</Fragment>
							))}
						</div>
						<div className={classes.productPageFeaturesWithOneBox}>
							<div className={classes.overLayFeatures}></div>
							<div>
								{product.filesIncluded.length ? (
									<ul className={classes.productPageDetailsUl}>
										{product.filesIncluded.map((el: any) => (
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
										{product.features.map((el: any) => (
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
									{product.features.map((el: any) => (
										<div key={el.id} className='flex flex-col'>
											<li>{el.li}</li>
										</div>
									))}
								</ul>
							) : (
								''
							)}
							{product.filesIncluded.length ? (
								<ul className={classes.ul}>
									{product.filesIncluded.map((el: any) => (
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
									{product.features.map((el: any) => (
										<li key={el.id}>{el.li}</li>
									))}
								</ul>
							) : (
								''
							)}
							{product.filesIncluded.length ? (
								<ul>
									{product.filesIncluded.map((el: any) => (
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
				{product.youtubeVideo.length ? (
					<div className={classes.productPageYoutubeSections}>
						{product.youtubeVideo[0].title ? (
							<h4>{product.youtubeVideo[0].title}</h4>
						) : (
							''
						)}
						<div>
							<div className={classes.overLayYoutubeSection}></div>
							{product.youtubeVideo.map((el: any) => (
								<div key={el.id} className={classes.youtubeVideo}>
									{isYoutubeVideo !== el.id ? (
										<>
											<div
												className='flex flex-col'
												style={{
													backgroundImage: `url(${el.srcImage})`,
													backgroundPosition: 'center',
													backgroundSize: 'cover'
												}}
												onClick={() => setIsYoutubeVideo(el.id)}
											>
												<button >
													<FaPlay />
												</button>
											</div>
										</>
									) : (
										<iframe src={el.src + '?autoplay=1'} allow={'autoplay'} />
									)}
								</div>
							))}
						</div>
					</div>
				) : (
					''
				)}
				<Button className={classes.GoBackLink} href={'/drums-that-knock'}>
					GO BACK
				</Button>
			</div>
		</section>
	);
};

export default HeroSection;
