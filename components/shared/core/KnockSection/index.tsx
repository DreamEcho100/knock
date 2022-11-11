import type { IButtonProps } from '@components/shared/core/Button';
import type { VariantProps } from 'class-variance-authority';

import Button from '@components/shared/core/Button';

import KnockTrademark from '@components/shared/core/KnockTrademark';
import { cva } from 'class-variance-authority';
import CustomNextImage from '@components/shared/common/CustomNextImage';

export const pClasses = cva(`mb-6 leading-10`, {
	variants: {
		width: {
			large: 'max-w-[800px]',
			small: 'max-w-[350px]'
		},
		text: {
			small: 'text-h6',
			medium: 'text-h5'
		}
	},
	defaultVariants: {
		width: 'large',
		text: 'small'
	}
});

const KnockSection = ({
	buttonProps,
	description,
	title,
	pTheme = {},
	imageSrc = '/images/534aaf62a986c03ee09ee62a138d3845.gif'
}: {
	title?: string;
	description: string;
	buttonProps: IButtonProps;
	pTheme?: VariantProps<typeof pClasses>;
	imageSrc?: string;
}) => {
	return (
		<section className='bg-primary-1'>
			<div
				className='overflow-hidden
					w-full px-4 sm:px-8 py-16 flex items-center justify-center flex-col text-center'
			>
				<div className='relative flex items-center justify-center max-w-[900px]'>
					<CustomNextImage
						src='/images/Group 179.png'
						width={800}
						height={800}
						priority
						className='pointer-events-none absolute top-0 right-0 left-0 bottom-0 w-full h-full object-contain scale-150'
						style={{ transform: 'translate(8%, -2%) scale(2)' }}
					/>

					<CustomNextImage
						src={imageSrc}
						alt='knock plugin animation'
						width={800}
						height={800}
						priority
						unoptimized
						className='object-cover mb-6 w-11/12 relative'
					/>
				</div>
				{
					<h2 className='text-h2 font-bold text-primary-1 mt-4 mb-4 flex flex-wrap'>
						{title || (
							<>
								DRUM THAT&nbsp;
								<KnockTrademark />
							</>
						)}
					</h2>
				}
				<p className={pClasses(pTheme)}>{description}</p>
				<Button className='capitalize text-[1.375rem]' {...buttonProps} />
			</div>
		</section>
	);
};

export default KnockSection;
