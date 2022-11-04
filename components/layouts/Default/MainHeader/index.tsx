import Logo from '@components/shared/core/Logo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiShoppingBag } from 'react-icons/hi'
import { commonClasses } from '..'
import UserRegister from './components/UserRegister'

const linkClasses = ({
  isActive,
  keepCase,
}: {
  isActive?: boolean
  keepCase?: boolean
} = {}) => `border-b border-transparent outline-none
duration-150 transition-all
${keepCase ? '' : 'uppercase'}
${
  isActive
    ? 'text-bg-secondary-1 focus:border-b-bg-secondary-1'
    : 'text-primary-2 focus:border-b-text-primary-1 hover:text-primary-1'
}`

const MainHeader = () => {
  const router = useRouter()

  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
  const [isSmallScreenNaveOpen, setIsSmallScreenNaveOpen] = useState(false)
  const headerLinks = [
    { href: '/knock-plugin', text: 'knock' },
    { href: '/knock_clipper', text: 'KNOCK Clipper', keepCase: true },
    { href: '/drums-that-knock', text: 'drums that knock' },
    { href: '/faqs', text: 'FAQs', keepCase: true },
    { href: '/contact-us', text: 'contact' },
  ]

  return (
    <header
      id="main-header"
      className={`${commonClasses} bg-primary-1 z-10 fixed top-0 right-0 left-0 w-full flex flex-col`}
    >
      <div
        className="relative w-full mx-auto
						lg:px-20"
      >
        <div className="relative z-10 h-20 flex justify-between px-4 sm:px-8 gap-2 sm:gap-4 text-primary-2">
          <div className="flex items-center justify-center text-primary-1">
            <Logo />
          </div>
          <nav className="hidden lg:flex">
            <ul className="text-center flex items-center justify-center gap-10 font-bold">
              {headerLinks.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className={linkClasses({
                      isActive: link.href === router.pathname,
                      keepCase: link.keepCase,
                    })}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="flex items-center justify-center gap-2 sm:gap-4">
            <li className="block lg:hidden">
              <button
                onClick={() => setIsSmallScreenNaveOpen((prev) => !prev)}
                title={`press or click to ${
                  isSmallScreenNaveOpen ? 'hide' : 'show'
                } the nav menu`}
                className="flex items-center justify-center"
              >
                <GiHamburgerMenu />
              </button>
            </li>
            <li>
              <UserRegister
                isOpen={isRegisterDialogOpen}
                setIsOpen={setIsRegisterDialogOpen}
              />
            </li>
            <li>
              <button title="cart" className="flex items-center justify-center">
                <HiShoppingBag />
              </button>
            </li>
          </ul>
        </div>
        <div
          className={`mt-20 bg-primary-1 block lg:hidden overflow-hidden absolute top-0 right-0 left-0 w-full
				${
          isSmallScreenNaveOpen
            ? // ? 'scale-y-100'
              // : 'scale-y-0 opacity-0 pointer-events-none'
              'translate-y-0'
            : '-translate-y-full opacity-0 pointer-events-none' // mt-0
        }
				origin-top
				transition-all duration-300`}
        >
          <nav className="flex">
            <ul
              className="flex flex-col gap-2 font-bold p-4 w-full
									sm:gap-4"
            >
              {headerLinks.map((link) => (
                <li key={link.text} className="w-full">
                  <Link
                    href={link.href}
                    className={`${linkClasses({
                      isActive: link.href === router.pathname,
                      keepCase: link.keepCase,
                    })} block w-fit`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default MainHeader
