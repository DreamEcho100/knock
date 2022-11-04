import type { Dispatch, ReactNode, SetStateAction } from 'react'

import { Transition } from '@headlessui/react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io'
// import cx from 'classnames'
import { Fragment } from 'react'
import { cx } from 'class-variance-authority'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
  header?: {
    title: string
    description?: Parameters<typeof DialogPrimitive.Description>[0]['children']
  }
  children: ReactNode
}

const Dialog = ({ isOpen, setIsOpen, header, children }: Props) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <Transition.Root show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPrimitive.Overlay
            forceMount
            className="fixed inset-0 z-20 bg-black/50"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPrimitive.Content
            forceMount
            className={cx(
              'fixed z-50',
              'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
              'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              'bg-white dark:bg-gray-800',
              'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
            )}
          >
            {header && (
              <header>
                <DialogPrimitive.Title className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {header.title}
                </DialogPrimitive.Title>
                {header.description && (
                  <DialogPrimitive.Description className="mt-2 text-base font-normal text-gray-700 dark:text-gray-400">
                    {header.description}
                  </DialogPrimitive.Description>
                )}
              </header>
            )}
            {children}

            <DialogPrimitive.Close
              className={cx(
                'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
                'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
              )}
            >
              <IoMdClose className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Root>
  )
}

export default Dialog

export const CloseDialog = (
  props: Parameters<typeof DialogPrimitive.Close>[0],
) => {
  return (
    <DialogPrimitive.Close
      className={cx(
        'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
        'bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-gray-100 dark:hover:bg-purple-600',
        'border border-transparent',
        'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
      )}
      {...props}
    />
  )
}
