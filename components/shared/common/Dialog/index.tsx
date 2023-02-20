import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';
// import cx from 'classnames'
import { Fragment } from 'react';
import { cva, cx, VariantProps } from 'class-variance-authority';
import { createPortal } from 'react-dom';
import { setCookie } from '@utils/common/storage/cookie/document';

interface Props {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	header?: {
		title: Parameters<typeof DialogPrimitive.Title>[0]['children'];
		description?: Parameters<typeof DialogPrimitive.Description>[0]['children'];
	};
	children: ReactNode;
	contentVariants?: VariantProps<typeof handlerContentVariants>;
	isMarketingPopup?: Boolean;
}

const handlerContentVariants = cva(
	[
		'text-primary-1',
		'fixed z-50',
		'w-[95vw] max-h-[95vh] overflow-y-auto max-w-xl rounded-lg px-10 py-4 md:w-full',
		'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
		'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
	],
	{
		variants: {
			bg: {
				'neutral-800': 'bg-neutral-800',
				'primary-1': 'bg-primary-1',
				'primary-2': 'bg-primary-2'
			}
		},
		defaultVariants: {
			bg: 'neutral-800'
		}
	}
);

const Dialog = ({
	isOpen,
	setIsOpen,
	header,
	children,
	contentVariants,
	isMarketingPopup
}: Props) => {
	if (typeof document === 'undefined') return <></>;
	let expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + 2);

	return createPortal(
		<DialogPrimitive.Root
			open={isOpen}
			onOpenChange={() => {
				setIsOpen(false),
					isMarketingPopup
						? setCookie('hide-marketing-popup', 'true', {
								path: '/',
								expires: expirationDate
						  })
						: '';
			}}
		>
			<Transition.Root show={isOpen}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<DialogPrimitive.Overlay
						forceMount
						className='fixed inset-0 z-20 bg-black/50'
					/>
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0 scale-95'
					enterTo='opacity-100 scale-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100 scale-100'
					leaveTo='opacity-0 scale-95'
				>
					<DialogPrimitive.Content
						forceMount
						className={handlerContentVariants(contentVariants)}
					>
						{header && (
							<header className=' mx-auto my-4'>
								<DialogPrimitive.Title className='text-h3 font-semibold text-neutral-100'>
									{header.title}
								</DialogPrimitive.Title>
								{header.description && (
									<DialogPrimitive.Description className='mt-6 text-base font-normal text-neutral-400'>
										{header.description}
									</DialogPrimitive.Description>
								)}
							</header>
						)}
						{children}

						<DialogPrimitive.Close
							className={cx(
								'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
								'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
							)}
						>
							<IoMdClose className='h-4 w-4 text-neutral-500 hover:text-neutral-400' />
						</DialogPrimitive.Close>
					</DialogPrimitive.Content>
				</Transition.Child>
			</Transition.Root>
		</DialogPrimitive.Root>,
		document.body
	);
};

export default Dialog;

export const CloseDialog = (
	props: Parameters<typeof DialogPrimitive.Close>[0]
) => {
	return (
		<DialogPrimitive.Close
			className={cx(
				'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
				'bg-purple-600 text-neutral-100 hover:bg-purple-600',
				'border border-transparent',
				'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
			)}
			{...props}
		/>
	);
};
