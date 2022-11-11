import Button from '@components/shared/core/Button';
import KnockTrademark from '@components/shared/core/KnockTrademark';
import type { IHomePageProps } from '@pages/index';
import ProductCardSlider from './components/ProductCardSlider';

const LatestSamplesSection = ({
	products
}: {
	products: IHomePageProps['products'];
}) => {
	return (
		<section className='bg-primary-2 section-p-v1'>
			<div
				className='
				flex flex-col gap-4
				md:flex-row'
			>
				<div
					className='flex gap-4 flex-col items-center text-center p-4
						md:p-8 md:items-start md:text-align-initial md:flex-grow md:w-1/2 md:justify-center'
				>
					<h2
						className='text-h2 font-bold text-primary-1 text-center flex flex-wrap justify-center
								md:text-align-initial md:justify-start'
					>
						DRUMS THAT&nbsp;
						<KnockTrademark />
						&nbsp;SAMPLE PACKS
					</h2>
					<p className='text-primary-2 mb-2'>
						Designed from scratch by DECAP. <br /> Premium quality,
						groundbreaking as always.
					</p>
					<Button href='/drums-that-knock'>Explore it now</Button>
				</div>
				<div className='md:flex-grow md:w-1/2 flex justify-center items-center'>
					<ProductCardSlider products={products} />
				</div>
			</div>
		</section>
	);
};

export default LatestSamplesSection;
