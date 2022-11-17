import type { IButtonProps } from '@components/shared/core/Button';
import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import Button from '@components/shared/core/Button';

import KnockTrademark from '@components/shared/core/KnockTrademark';
import { cva } from 'class-variance-authority';
import CustomNextImage from '@components/shared/common/CustomNextImage';

export const pClasses = cva('mt-2 mb-6 leading-6', {
	variants: {
		width: {
			larger: 'max-w-[950px]',
			large: 'max-w-[800px]',
			'medium-2': 'max-w-[750px]',
			medium: 'max-w-[700px]',
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
export const h2Classes = cva(
	'font-semibold text-primary-1 flex flex-wrap justify-center text-center',
	{
		variants: {
			'text-size': {
				md: 'text-h3',
				lg: 'text-h2'
			}
		},
		defaultVariants: {
			'text-size': 'lg'
		}
	}
);

export const sectionClasses = cva('bg-primary-1 section-h-v1', {
	variants: {
		p: {
			'section-p-v1': 'section-p-v1',
			'section-p-x-v1': 'section-p-x-v1'
		}
	},
	defaultVariants: {
		p: 'section-p-v1'
	}
});

const KnockSection = ({
	buttonProps = {},
	buttonElem,
	description,
	title,
	pTheme = {},
	sectionTheme,
	imageSrc = '/images/534aaf62a986c03ee09ee62a138d3845.gif',
	h2theme
}: {
	title?: ReactNode;
	description: string;
	buttonProps?: IButtonProps;
	buttonElem?: JSX.Element;
	pTheme?: VariantProps<typeof pClasses>;
	h2theme?: VariantProps<typeof h2Classes>;
	sectionTheme?: VariantProps<typeof sectionClasses>;
	imageSrc?: string;
}) => {
	return (
		<section className={sectionClasses(sectionTheme)}>
			<div className='w-full h-full flex items-center justify-center flex-col sm:gap-2 text-center'>
				<div className='relative flex items-center justify-center max-w-3xl mb-1'>
					<CustomNextImage
						src='/images/Group 179.png'
						width={800}
						height={800}
						priority
						className='pointer-events-none absolute top-0 right-0 left-0 bottom-0 w-full h-full object-contain scale-150'
						style={{ transform: 'translate(8%, -2%) scale(2.5)' }}
					/>

					<CustomNextImage
						src={imageSrc}
						alt='knock plugin animation'
						width={800}
						height={800}
						priority
						unoptimized
						className='object-cover mb-4 w-4/5 relative'
					/>
				</div>
				{
					<h2 className={h2Classes(h2theme)}>
						{title || (
							<>
								DRUMS THAT&nbsp;
								<KnockTrademark />
							</>
						)}
					</h2>
				}
				<p className={pClasses(pTheme)}>{description}</p>
				{buttonElem || <Button className='capitalize' {...buttonProps} />}
			</div>
		</section>
	);
};

export default KnockSection;
