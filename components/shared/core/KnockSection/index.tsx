import type { IButtonProps } from '@components/shared/core/Button'

import Button from '@components/shared/core/Button'
import Image from 'next/image'
import KnockTrademark from '../KnockTrademark'

const KnockSection = ({
  buttonProps,
  description,
  title,
  pMaxW = 'small',
  imageSrc = '/images/534aaf62a986c03ee09ee62a138d3845.gif',
}: {
  title?: string
  description: string
  buttonProps: IButtonProps
  pMaxW?: 'small' | 'medium' | 'large'
  imageSrc?: string
}) => {
  return (
    <section className="bg-primary-1">
      <div
        className=" overflow-hidden
				px-8 pt-24 pb-16 flex items-center justify-center flex-col text-center"
      >
        <div className="relative flex items-center justify-center max-w-[900px]">
          <Image
            src="/images/Group 179.png"
            alt=""
            width={800}
            height={800}
            priority
            className="pointer-events-none absolute top-0 right-0 left-0 bottom-0 w-full h-full object-contain scale-150"
            style={{ transform: 'translate(8%, -2%) scale(2)' }}
          />

          <Image
            src={imageSrc}
            alt="knock plugin animation"
            width={800}
            height={800}
            priority
            unoptimized
            className="object-cover mb-6 w-11/12 relative"
          />
        </div>
        {
          <h2 className="text-h2 font-bold text-primary-1 mt-4 mb-4 flex flex-wrap">
            {title || (
              <>
                <KnockTrademark />
                PLUGIN
              </>
            )}
          </h2>
        }
        <p
          className={`mb-6 text-[1.75rem] leading-10 ${
            pMaxW === 'large' ? 'max-w-[800px]' : 'max-w-[350px]'
          }`}
        >
          {description}
        </p>
        <Button className="capitalize text-[1.375rem]" {...buttonProps} />
      </div>
    </section>
  )
}

export default KnockSection
