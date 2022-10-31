import type { ButtonHTMLAttributes } from 'react'
import twClasses from 'utils/core/tailwind'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, ...props }: IProps) => {
  return (
    <button
      className={`${twClasses.button.default()} ${className || ''} `}
      {...props}
    />
  )
}

export default Button
