import type { Dispatch, FormEvent, SetStateAction } from 'react'

import { useState } from 'react'
import Dialog from '@components/shared/common/Dialog'
import { BsFillPersonFill } from 'react-icons/bs'
import { cx } from 'class-variance-authority'
import { useMutation } from '@tanstack/react-query'
import Button from '@components/shared/core/Button'

interface IProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const SwitchHeader = ({
  setType,
  type,
}: {
  setType: Dispatch<SetStateAction<'register' | 'login'>>
  type: 'register' | 'login'
}) => {
  return (
    <span className="flex">
      <button
        className={type === 'login' ? 'font-bold text-primary-1' : ''}
        onClick={() => setType('login')}
      >
        login
      </button>
      &nbsp;
      <button
        className={type === 'register' ? 'font-bold text-primary-1' : ''}
        onClick={() => setType('register')}
      >
        register
      </button>
    </span>
  )
}

const UserRegister = ({ isOpen, setIsOpen }: IProps) => {
  const [type, setType] = useState<'register' | 'login'>('register')

  return (
    <>
      <button
        title="profile"
        className="flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <BsFillPersonFill />
      </button>
      {type === 'register' ? (
        <RegisterType
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setType={setType}
          type={type}
        />
      ) : (
        <LoginType
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setType={setType}
          type={type}
        />
      )}
    </>
  )
}

export default UserRegister

const RegisterType = ({
  isOpen,
  setIsOpen,
  setType,
  type,
}: IProps & {
  setType: Dispatch<SetStateAction<'register' | 'login'>>
  type: 'register' | 'login'
}) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })

  const registerMutation = useMutation({
    mutationFn: (event: FormEvent) => {
      event.preventDefault()

      return fetch(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/auth/register`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formValues),
      }).then((response) => response.json())
    },
    onSuccess: (result) => {
      console.log('result', result)
      setIsOpen(false)
    },
  })

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={{
        title: registerMutation.isSuccess
          ? 'Registered successfully'
          : 'Register',
        description: registerMutation.isSuccess ? (
          <>
            Please check your email, then{' '}
            <button className="font-bold text-primary-1">login</button>
          </>
        ) : (
          <SwitchHeader setType={setType} type={type} />
        ),
      }}
    >
      {!registerMutation.isSuccess && (
        <form className="mt-2 space-y-2" onSubmit={registerMutation.mutate}>
          <fieldset>
            <label
              htmlFor="firstName"
              className="text-xs font-medium text-gray-700 dark:text-gray-400"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              onChange={(event) => {
                setFormValues((prev) => ({
                  ...prev,
                  firstName: event.target.value,
                }))
              }}
              value={formValues.firstName}
              type="text"
              placeholder="Tim"
              autoComplete="first-name"
              className={cx(
                'mt-1 block w-full px-2 py-1',
                'text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600',
                'border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800',
                'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
              )}
              minLength={3}
            />
          </fieldset>
          <fieldset>
            <label
              htmlFor="lastName"
              className="text-xs font-medium text-gray-700 dark:text-gray-400"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              onChange={(event) => {
                setFormValues((prev) => ({
                  ...prev,
                  lastName: event.target.value,
                }))
              }}
              value={formValues.lastName}
              type="text"
              required
              placeholder="Cook"
              autoComplete="last-name"
              className={cx(
                'mt-1 block w-full px-2 py-1',
                'text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600',
                'border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800',
                'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
              )}
              minLength={3}
            />
          </fieldset>
          <fieldset>
            <label
              htmlFor="email"
              className="text-xs font-medium text-gray-700 dark:text-gray-400"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              onChange={(event) => {
                setFormValues((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }}
              value={formValues.email}
              type="email"
              required
              placeholder="Cook"
              autoComplete="email"
              className={cx(
                'mt-1 block w-full px-2 py-1',
                'text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600',
                'border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800',
                'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
              )}
            />
          </fieldset>
          <fieldset>
            <label
              htmlFor="password"
              className="text-xs font-medium text-gray-700 dark:text-gray-400"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              onChange={(event) => {
                setFormValues((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }}
              value={formValues.password}
              type="password"
              required
              placeholder="Cook"
              autoComplete="password"
              className={cx(
                'mt-1 block w-full px-2 py-1',
                'text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600',
                'border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800',
                'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
              )}
              minLength={3}
            />
          </fieldset>
          <div className="mt-4 flex justify-end">
            {/* <CloseDialog disabled={registerMutation.isLoading}>Submit</CloseDialog> */}
            <Button type="submit" disabled={registerMutation.isLoading}>
              Submit
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  )
}

const LoginType = ({
  isOpen,
  setIsOpen,
  setType,
  type,
}: IProps & {
  setType: Dispatch<SetStateAction<'register' | 'login'>>
  type: 'register' | 'login'
}) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const loginMutation = useMutation({
    mutationFn: (event: FormEvent) => {
      event.preventDefault()

      return fetch(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/auth/login`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formValues),
      }).then((response) => response.json())
    },
    onSuccess: (result) => {
      console.log('result', result)
      setIsOpen(false)
    },
  })

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={{
        title: loginMutation.isSuccess ? 'Logined successfully' : 'Login',
        description: loginMutation.isSuccess ? (
          <>Getting your user data...</>
        ) : (
          <SwitchHeader setType={setType} type={type} />
        ),
      }}
    >
      {!loginMutation.isSuccess && (
        <form className="mt-2 space-y-2" onSubmit={loginMutation.mutate}>
          <fieldset>
            <label
              htmlFor="email"
              className="text-xs font-medium text-gray-700 dark:text-gray-400"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              onChange={(event) => {
                setFormValues((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }}
              value={formValues.email}
              type="email"
              required
              placeholder="Cook"
              autoComplete="email"
              className={cx(
                'mt-1 block w-full px-2 py-1',
                'text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600',
                'border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800',
                'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
              )}
            />
          </fieldset>
          <fieldset>
            <label
              htmlFor="password"
              className="text-xs font-medium text-gray-700 dark:text-gray-400"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              onChange={(event) => {
                setFormValues((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }}
              value={formValues.password}
              type="password"
              required
              placeholder="Cook"
              autoComplete="password"
              className={cx(
                'mt-1 block w-full px-2 py-1',
                'text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600',
                'border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800',
                'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
              )}
              minLength={3}
            />
          </fieldset>
          <div className="mt-4 flex justify-end">
            {/* <CloseDialog disabled={loginMutation.isLoading}>Submit</CloseDialog> */}
            <Button type="submit" disabled={loginMutation.isLoading}>
              Submit
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  )
}
