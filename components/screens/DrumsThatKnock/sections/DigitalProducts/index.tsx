// interface Props {}

import CustomNextImage from '@components/shared/common/CustomNextImage';
import { ProductCardWithDetails } from '@components/shared/core/Card/product/default';
import { IDrumsThatKnockPageProps } from '@pages/drums-that-knock';

import { getIdFromGid } from '@utils/core/shopify';
import { useMemo } from 'react';

import { IProduct } from 'types';

const productsNames = [
	'Complete Knock Bundle v2 (All Digital Products)',
	'DRUMS THAT KNOCK X',
	'Drums That Knock Free Vol. 1 (Free Download)',
	'Drums That Knock Vol. 9',
	'Drums That Knock Vol. 8',
	'Drums That Knock Vol. 7',
	'Drums That Knock Vol. 6',
	'Drums That Knock Vol. 5',
	'Drums That Knock Vol. 4',
	'Drums That Knock Vol. 3',
	'Drums That Knock Vol. 2',
	'Drums That Knock Vol. 1',
	'Melodies That Knock Vol. 2',
	'Melodies That Knock Vol. 1',
	'DECAP Ableton Live Masterclass'
];

const productsNamesObj = (() => {
	const obj: Record<string, number> = {};

	productsNames.forEach((item, index) => (obj[item] = index));

	return obj;
})();

const DigitalProductsSection = ({
	products
}: {
	products: IDrumsThatKnockPageProps['products'];
}) => {
	/*
	const rearrangedProducts = useMemo(() => {
		const itemsNotFound: typeof products = [];
		const foundItems: typeof products = [];

		products.forEach((item) => {
			if (item.title in productsNamesObj)
				return (foundItems[productsNamesObj[item.title]] = item);
			itemsNotFound.push(item);
		});

		return [...foundItems.filter(Boolean), ...itemsNotFound];
	}, [products]);
*/
	return (
		<section className='bg-primary-1 section-p-v1 relative'>
			<div className='pointer-events-none select-none grid grid-rows-4 justify-items-center items-center absolute top-0 right-0 bottom-0 left-0 w-full h-full'>
				<CustomNextImage
					className='w-full h-full object-contain scale-x-[2.5] scale-y-[2] translate-y-[20%]'
					src='/images/Rectangle 47.png'
					alt=''
					width={800}
					height={800}
					placeholder='blur'
					blurDataURL='/svg/bbblurry.svg'
				/>
				<CustomNextImage
					className='w-full h-full object-contain scale-x-[2.8] scale-y-[2.4] translate-x-[5%] rtl:-translate-x-[5%]'
					src='/images/Rectangle 46.png'
					alt=''
					width={800}
					height={800}
					placeholder='blur'
					blurDataURL='/svg/bbblurry.svg'
				/>
				<CustomNextImage
					className='w-full h-full object-contain scale-x-[2.8] scale-y-[2.4] translate-x-[15%] rtl:-translate-x-[15%]'
					src='/images/Rectangle 48.png'
					alt=''
					width={800}
					height={800}
					placeholder='blur'
					blurDataURL='/svg/bbblurry.svg'
				/>
				<CustomNextImage
					className='w-full h-full object-contain -translate-y-[10%] scale-x-[1.1] scale-y-[1.1] translate-x-[5%] rtl:-translate-x-[5%]'
					src='/images/Rectangle 45.png'
					alt=''
					width={800}
					height={800}
					placeholder='blur'
					blurDataURL='/svg/bbblurry.svg'
				/>
			</div>
			<div
				className='relative justify-items-center'
				style={{
					zIndex: 2,
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
					gap: '4rem 3rem'
				}}
			>
				{products.map((item) => (
					<ProductCardWithDetails
						key={item.id}
						link={{
							children: item.title,
							href: `/products/${getIdFromGid(item.id)}`
						}}
						{...item}
						toAddToCart
						productData={item}
						cardVariants={{ intent: 'none', w: 'full' }}
						imageVariants={{ onHover: 'to-dimmer' }}
					/>
				))}
			</div>
		</section>
	);
};

export default DigitalProductsSection;
