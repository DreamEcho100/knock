import type { IButtonProps } from '@components/shared/core/Button'
import type { ICustomNextImageProps } from '@components/shared/common/CustomNextImage'
import type { HTMLAttributes } from 'react'

import CustomNextImage from '@components/shared/common/CustomNextImage'
import Button from '@components/shared/core/Button'

interface IProps {
  textContainer: {
    h2: HTMLAttributes<HTMLHeadingElement>
    p: HTMLAttributes<HTMLParagraphElement>
    button: IButtonProps
  }
  imageContainer: {
    mainImg: ICustomNextImageProps
    backgroundImg?: Partial<ICustomNextImageProps> | false
  }
  wrapper?: HTMLAttributes<HTMLDivElement>
}

const ProductShowcase = ({
  textContainer: { h2 = {}, p = {}, button = {} },
  imageContainer: { mainImg, backgroundImg = {} },
  wrapper: { className: wrapperClassName = '', ...wrapper } = {},
}: IProps) => {
  const { className: backgroundImgClassName = '', ...backgroundImgProps } =
    backgroundImg || {}

  return (
    <div
      {...wrapper}
      className={`
					flex flex-col
					lg:flex-row ${wrapperClassName}`}
    >
      <div
        className="w-full flex flex-col items-center justify-center text-center gap-8 px-8 pb-4
							sm:pb-20
							lg:w-1/2 lg:text-align-initial lg:items-start lg:py-8"
      >
        <h2 className="text-h2 font-bold uppercase flex flex-wrap" {...h2} />
        <p className="md:max-w-[450px]" {...p} />

        <Button className="capitalize" {...button} />
      </div>
      <div
        className="w-full relative p-4
							 lg:w-1/2 lg:p-0"
      >
        {backgroundImg && (
          <div className="absolute w-full h-full">
            <CustomNextImage
              src="/images/Rectangle 47.png"
              alt=""
              width={800}
              height={500}
              className={`${backgroundImgClassName} mx-auto w-full h-full object-cover scale-150 translate-y-[12.5%]`}
              {...backgroundImgProps}
            />
          </div>
        )}
        <CustomNextImage
          width={800}
          height={500}
          className="relative mx-auto w-full h-full object-contain"
          {...mainImg}
        />
      </div>
    </div>
  )
}

export default ProductShowcase
