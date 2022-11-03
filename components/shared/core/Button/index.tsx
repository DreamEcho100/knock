import Link from 'next/link'
import type { ButtonHTMLAttributes } from 'react'
import twClasses from 'utils/core/tailwind'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isALink?: null
}

export type _ILinkProps = Parameters<typeof Link>['0']
export interface ILinkProps extends _ILinkProps {
  href: _ILinkProps['href']
}

const Button = (props: IButtonProps | ILinkProps) => {
  if ('href' in props)
    return (
      <Link
        {...props}
        className={`${twClasses.button.default()} ${props.className || ''} `}
      />
    )

  return (
    <button
      {...props}
      className={`${twClasses.button.default()} ${props.className || ''} `}
    />
  )
}

export default Button
