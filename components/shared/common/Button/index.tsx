import type { ButtonHTMLAttributes } from 'react'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, ...props }: IProps) => {
  return (
    <button
      className={`w-fit px-6 py-1 rounded-3xl text-white bg-purple-600 font-bold text-[1rem]
			duration-300 transition-all
			hover:bg-purple-800
			focus:ring focus:ring-purple-500
			${className || ''}
			`}
      {...props}
    />
  )
}

export default Button
