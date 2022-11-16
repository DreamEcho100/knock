import { cva, cx, VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

const handDescriptionVariants = cva('text-center max-w-[1024px]', {
	variants: {
		'text-size': {
			h5: 'text-h5',
			h6: 'text-h6',
			dynamic: 'text-h6 sm:text-h5'
		}
	},
	defaultVariants: {
		'text-size': 'h6'
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
