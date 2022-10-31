import Image from 'next/image'
import type { ReactNode } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa'
import { HiShoppingBag } from 'react-icons/hi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useId, useState } from 'react'
import Link from 'next/link'
import Button from '@components/shared/core/Button'

const commonClasses = 'leading-relaxed sm:text-[1.2rem] text-primary-2 mx-auto'

const linkClasses = `text-primary-2 border-b border-transparent
duration-150 transition-all
focus:border-b-text-primary-1 hover:text-primary-1`

const MainHeader = () => {
  const [isSmallScreenNaveOpen, setIsSmallScreenNaveOpen] = useState(false)
  const headerLinks = [
    { href: '/', text: 'knock' },
    { href: '/', text: 'knock clippr' },
    { href: '/drums-that-knock', text: 'drums that knock' },
    { href: '/', text: 'faq' },
    { href: '/contact-us', text: 'contact' },
  ]

  return (
    <header
      id="main-header"
      className={`${commonClasses} bg-primary-1 z-10 fixed top-0 right-0 left-0 w-full flex flex-col`}
    >
      <div className="relative w-full max-w-[1920px] mx-auto">
        <div className="relative z-10 h-20 flex justify-between px-4 sm:px-8 gap-2 sm:gap-4 text-primary-2">
          <div className="flex items-center justify-center text-primary-1">
            <p
              className="font-black whitespace-nowrap flex"
              style={{ fontFamily: 'decap_v1regular' }}
            >
              PLUGINS THAT KNOCK
              <sup>
                <Image
                  src="/images/Trademark Artboard 1 copy 3.png"
                  width={10}
                  height={10}
                  priority
                  alt="KNOCK logo"
                  className="aspect-square w-2 h-2"
                />
              </sup>
            </p>
          </div>
          <nav className="hidden lg:flex">
            <ul className="flex items-center justify-center gap-10 font-bold uppercase">
              {headerLinks.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} className={linkClasses}>
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
              <button
                title="profile"
                className="flex items-center justify-center"
              >
                <BsFillPersonFill />
              </button>
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
              className="flex flex-col gap-2 font-bold uppercase p-4 w-full
									sm:gap-4"
            >
              {headerLinks.map((link) => (
                <li key={link.text} className="w-full">
                  <Link
                    href={link.href}
                    className={`${linkClasses} block w-fit`}
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

const LinksListContainer = ({
  headerText,
  links,
  linksListClassName = 'capitalize',
}: {
  headerText: string
  links: { href: string; text: string }[]
  linksListClassName?: string
}) => {
  return (
    <nav className="flex flex-col gap-2 p-2">
      <h3 className="capitalize font-semibold text-h3 text-primary-1">
        {headerText}
      </h3>
      <ul className={linksListClassName}>
        {links.map((item) => (
          <li key={item.text}>
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const Footer = () => {
  const formId = useId()

  return (
    <footer
      id="main-footer"
      className={`${commonClasses} max-w-[1920px] max-w bg-primary-1`}
    >
      <div className="section-content flex flex-col m-auto text-primary-2 p-4 py-8">
        <div className="flex gap-2 flex-wrap w-full">
          <div className="w-full flex lg:flex-grow flex-wrap justify-between p-2 gap-4">
            <LinksListContainer
              headerText="useful links"
              links={[
                { href: '/', text: 'Support' },
                { href: '/', text: 'terms of service' },
                { href: '/', text: 'privacy policy' },
                { href: '/', text: 'refund policy' },
                { href: '/', text: 'shipping policy' },
                { href: '/', text: 'My account' },
              ]}
            />
            {/* <LinksListContainer
              headerText="plug-ins"
              links={[
                { href: '/', text: 'knock plugin' },
                { href: '/', text: 'knock compress' },
              ]}
            />
            <LinksListContainer
              linksListClassName=""
              headerText="sample packs"
              links={[
                { href: '/', text: 'Drums that knock X' },
                { href: '/', text: 'Drums that knock vol.9' },
                { href: '/', text: 'Drums that knock vol.8' },
                { href: '/', text: 'Drums that knock vol.7' },
                { href: '/', text: 'All sample packs' },
              ]}
            /> */}
            <div className="flex flex-col p-2 max-w-[550px]">
              <header className="flex gap-2 items-center flex-wrap justify-between">
                <p className="text-white font-bold">
                  Follow us on social media
                </p>
                <ul className="flex gap-2">
                  <li>
                    <a
                      href="#"
                      rel="noopener noreferrer"
                      title="instagram"
                      className="text-gray-400"
                    >
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      rel="noopener noreferrer"
                      title="facebook"
                      className="text-gray-400"
                    >
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      rel="noopener noreferrer"
                      title="twitter"
                      className="text-gray-400"
                    >
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      rel="noopener noreferrer"
                      title="youtube"
                      className="text-gray-400"
                    >
                      <FaYoutube />
                    </a>
                  </li>
                </ul>
              </header>
              <div className="flex flex-col gap-4">
                <h2 className="text-h2 font-bold text-white uppercase">
                  subscribe
                </h2>
                <p>Promotion, new products and sales. Directly to your inbox</p>
              </div>
              <form className="flex gap-8 my-4">
                <div className="flex bg-primary-3 text-primary-1 w-full max-w-[90%] rounded-3xl overflow-hidden">
                  <input
                    type="email"
                    placeholder="Email address"
                    id={`email-${formId}`}
                    className="w-full bg-transparent px-4 py-2 outline-none
											placeholder:text-text-primary-1"
                  />
                  <Button type="submit" className="uppercase">
                    subscribe
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-end mx-1 my-4">
          <div className="px-1">
            <Image src="/logo.png" width={100} height={50} alt="KNOCK logo" />
            <small className="capitalize">
              copyright &copy; plugins that knock
            </small>
          </div>
          <div className="px-1">
            <Image
              src="/images/payment_cards.png"
              alt="payment cards"
              width={400}
              height={50}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MainHeader />
      <main
        className={`${commonClasses} bg-primary-2 mt-20 max-w-[1920px] w-full h-fit flex flex-col`}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}

export default DefaultLayout
