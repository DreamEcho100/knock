import { cva, cx, VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

const handDescriptionVariants = cva('text-center', {
	variants: {
		'text-size': {
			h5: 'text-h5',
			h6: 'text-h6',
			dynamic: 'text-h6 sm:text-h5'
		},
		'max-w': {
			xl: 'max-w-xl',
			'2xl': 'max-w-2xl',
			'3xl': 'max-w-3xl',
			'4xl': 'max-w-4xl',
			'5xl': 'max-w-5xl',
			none: ''
		}
	},
	defaultVariants: {
		'text-size': 'h6',
		'max-w': '5xl'
	}
});

const Description = ({
	children,
	variants,
	className
}: {
	children: HTMLAttributes<HTMLParagraphElement>['children'];
	variants?: VariantProps<typeof handDescriptionVariants>;
	className?: string;
}) => {
	// !!!
	return (
		<div className={cx(handDescriptionVariants(variants), className)}>
			<p>{children}</p>
		</div>
	);
};

export default Description;
