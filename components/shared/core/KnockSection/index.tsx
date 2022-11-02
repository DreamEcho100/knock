import type { IButtonProps } from '@components/shared/core/Button'

import Button from '@components/shared/core/Button'
import Image from 'next/image'

const KnockSection = ({
  buttonProps,
  description,
  title,
  pMaxW = 'small',
}: {
  title?: string
  description: string
  buttonProps: IButtonProps
  pMaxW?: 'small' | 'medium' | 'large'
}) => {
  return (
    <section className="bg-primary-1">
      <div
        className="container-restrictions-1 overflow-hidden
				px-8 pt-24 pb-16 flex items-center justify-center flex-col text-center"
      >
        <div className="relative flex items-center justify-center max-w-[900px]">
          <Image
            src="/images/Group 179.png"
            alt=""
            width={800}
            height={800}
            priority
            className="pointer-events-none absolute top-0 right-0 left-0 bottom-0 w-full h-full object-contain"
            style={{ transform: 'translate(8%, -2%) scale(2)' }}
          />

          <Image
            src="/images/534aaf62a986c03ee09ee62a138d3845.gif"
            alt="knock plugin animation"
            width={800}
            height={800}
            priority
            unoptimized
            className="object-cover mb-6 w-11/12 relative"
          />
        </div>
        <h2 className="text-h2 font-bold text-primary-1 mt-12 mb-4">
          {title || 'KNOCK PLUGIN'}
        </h2>
        <p
          className={`mb-6 leading-10 ${
            pMaxW === 'large' ? 'max-w-[700px]' : 'max-w-[350px]'
          }`}
        >
          {description}
        </p>
        <Button className="capitalize" {...buttonProps} />
      </div>
    </section>
  )
}

export default KnockSection
