import { cva, VariantProps } from 'class-variance-authority';
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
		'text-size': 'dynamic'
	}
});

const Description = ({
	children,
	variants
}: {
	children: HTMLAttributes<HTMLParagraphElement>['children'];
	variants?: VariantProps<typeof handDescriptionVariants>;
}) => {
	// !!!
	return (
		<div className={handDescriptionVariants(variants)}>
			<p>{children}</p>
		</div>
	);
};

export default Description;
