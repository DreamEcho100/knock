import { cva } from 'class-variance-authority';

export const cardClasses = cva(
	`bg-primary-2 max-w-[16rem] shadow-lg shadow-black overflow-hidden flex flex-col
		transition-all duration-500 group
		focus-within:rounded-none`,
	{
		variants: {
			intent: {
				allCorners: 'rounded-2xl',
				bottomCorners: 'rounded-b-2xl',
				topCorners: 'rounded-t-2xl'
			}
		},
		defaultVariants: {
			intent: 'allCorners'
		}
	}
);
