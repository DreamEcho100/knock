import type { VariantProps } from 'class-variance-authority';
import type { CSSProperties, ReactNode } from 'react';

import Button from '@components/shared/core/Button';

import KnockTrademark from '@components/shared/core/KnockTrademark';
import { cva } from 'class-variance-authority';
import CustomNextImage from '@components/shared/common/CustomNextImage';

export const pClasses = cva('text-primary-2 mt-2 mb-5 leading-6', {
	variants: {
		width: {
			larger: 'max-w-[950px]',
			large: 'max-w-[800px]',
			'medium-2': 'max-w-[750px]',
			medium: 'max-w-[700px]',
			small: 'max-w-[350px]'
		},
		text: {
			dynamic: 'sm:text-[1.3rem]',
			small: 'text-h6',
			medium: 'text-h5'
		}
	},
	defaultVariants: {
		width: 'large',
		text: 'dynamic'
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
			'text-size': 'md'
		}
	}
);

export const sectionClasses = cva('bg-primary-1 sm:section-h-v1', {
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

export const sectionInnerWrapperClasses = cva(
	'w-full flex items-center justify-center flex-col sm:gap-2 text-center',
	{
		variants: {
			'sm:gap': {
				2: 'sm:gap-2',
				4: 'sm:gap-4'
			}
		}
	}
);

const imagesContainerClasses = cva(
	'relative flex items-center justify-center max-w-4xl',
	{
		variants: {
			pb: {
				'mb-12': 'mb-12',
				none: ''
			}
		},
		defaultVariants: {
			pb: 'mb-12'
		}
	}
);

const textContainerClasses = cva('flex flex-col items-center justify-center', {
	variants: {
		'sm:gap': {
			2: 'sm:gap-2',
			4: 'sm:gap-4',
			6: 'sm:gap-6'
		}
	},
	defaultVariants: {}
});

const KnockSection = ({
	buttonProps = {},
	buttonElem,
	description,
	title,
	pTheme = {},
	sectionTheme,
	imageSrc,
	videoSrc = '/videos/534aaf62a986c03ee09ee62a138d3845.mp4',
	h2theme,
	imagesContainerTheme,
	textContainerTheme,
	sectionInnerWrapperTheme
}: {
	title?: ReactNode;
	description: string;
	buttonProps?: Parameters<typeof Button>[0];
	buttonElem?: JSX.Element;
	pTheme?: VariantProps<typeof pClasses>;
	h2theme?: VariantProps<typeof h2Classes>;
	imagesContainerTheme?: VariantProps<typeof imagesContainerClasses>;
	textContainerTheme?: VariantProps<typeof textContainerClasses>;
	sectionTheme?: VariantProps<typeof sectionClasses>;
	sectionInnerWrapperTheme?: VariantProps<typeof sectionInnerWrapperClasses>;
	imageSrc?: string;
	videoSrc?: string;
}) => {
	return (
		<section
			className={sectionClasses(sectionTheme)}
			style={
				{
					'--pt-multi': 1.8,
					'--pb-multi': 2,
					'--h': 'fit-content',
					'--max-h': 'fit-content'
				} as CSSProperties
			}
		>
			<div className={sectionInnerWrapperClasses(sectionInnerWrapperTheme)}>
				<div className={imagesContainerClasses(imagesContainerTheme)}>
					<CustomNextImage
						src='/images/Group 179.png'
						width={800}
						height={800}
						priority
						className='pointer-events-none select-none absolute top-0 right-0 left-0 bottom-0 w-full h-full object-contain scale-150'
						style={{
							transform:
								'translate(8%, -2%) scale(2.4, 2.4) rotateZ(-198deg) rotateY(180deg)'
						}}
					/>
					{imageSrc ? (
						<CustomNextImage
							src={imageSrc}
							alt='knock plugin'
							width={800}
							height={800}
							priority
							unoptimized
							className='object-cover w-3/4 relative'
						/>
					) : (
						<video
							src={videoSrc}
							autoPlay
							muted
							width={800}
							height={800}
							title='knock plugin'
							loop
							controls={false}
							poster='/images/29f8b3dde3b1d7e7a476bf19c95536f1.png'
							className='object-cover w-3/4 relative rounded-[7%]'
						/>
					)}
				</div>
				<div className={textContainerClasses(textContainerTheme)}>
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
			</div>
		</section>
	);
};

export default KnockSection;
