import Image from 'next/image'

const Logo = () => {
  return (
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
  )
}

export default Logo
