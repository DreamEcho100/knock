import { cva, cx } from 'class-variance-authority';

export const cardClasses = cva(
	`bg-primary-2 shadow-lg shadow-black overflow-hidden flex flex-col
		transition-all duration-500 group
		focus-within:rounded-none`,
	{
		variants: {
			w: {
				full: 'w-full'
			},
			'max-w': {
				default: 'max-w-[15rem] sm:max-w-[18rem] md:max-w-[20rem]'
			},
			intent: {
				allCorners: 'rounded-2xl',
				bottomCorners: 'rounded-b-2xl',
				topCorners: 'rounded-t-2xl',
				none: ''
			}
		},
		defaultVariants: {
			intent: 'allCorners',
			'max-w': 'default'
		}
	}
);

export const buttonClasses = cva(
	`font-semibold outline-none disabled:cursor-not-allowed
	duration-300 transition-all`,
	{
		variants: {
			w: {
				fit: 'w-fit',
				full: 'w-full'
			},
			p: {
				wide: 'px-4 py-[0.125rem]',
				wider: 'px-8 py-[0.25rem]',
				'extra-wide': 'px-10 py-[0.125rem]',
				none: ''
			},
			rounded: {
				'3xl': 'rounded-3xl',
				none: 'rounded-none'
			},
			theme: {
				default: cx(
					'text-white bg-secondary-1',
					'hover:bg-purple-800',
					'focus:ring focus:ring-bg-secondary-1'
				),
				none: ''
			},
			display: {
				'flex-xy-center': 'flex items-center justify-center'
			}
		},
		// compoundVariants: [{ display: 'flex-center' }],
		defaultVariants: {
			w: 'fit',
			p: 'wider',
			rounded: '3xl',
			theme: 'default'
		}
	}
);
