import type { ButtonHTMLAttributes } from 'react'
import twClasses from 'utils/core/tailwind'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, ...props }: IButtonProps) => {
  return (
    <button
      className={`${twClasses.button.default()} ${className || ''} `}
      {...props}
    />
  )
}

export default Button
