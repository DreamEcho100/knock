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
    backgroundImg?: Partial<ICustomNextImageProps>
  }
  wrapper?: HTMLAttributes<HTMLDivElement>
}

const ProductShowcase = ({
  textContainer: { h2 = {}, p = {}, button = {} },
  imageContainer: { mainImg, backgroundImg = {} },
  wrapper: { className: wrapperClassName = '', ...wrapper } = {},
}: IProps) => {
  const {
    className: backgroundImgClassName = '',
    ...backgroundImgProps
  } = backgroundImg

  return (
    <div
      className={`
					flex flex-col
					lg:flex-row md:px-20 ${wrapperClassName}`}
      {...wrapper}
    >
      <div
        className="w-full flex flex-col items-center p-4 text-center gap-8
							sm:px-8
							lg:w-1/2 lg:text-align-initial lg:items-start"
      >
        <h2 className="text-h2 font-bold uppercase" {...h2} />
        <p className="max-w-[450px]" {...p} />

        <Button className="capitalize" {...button} />
      </div>
      <div
        className="w-full relative overflow-hidden
							 lg:w-1/2"
      >
        <div className="absolute">
          <CustomNextImage
            src="/images/Rectangle 47.png"
            alt=""
            width={800}
            height={500}
            className={`${backgroundImgClassName} mx-auto w-full h-full object-cover -translate-y-[10%]`}
            {...backgroundImg}
          />
        </div>
        <CustomNextImage
          width={800}
          height={500}
          className="mx-auto w-full h-full object-cover"
          {...mainImg}
        />
      </div>
    </div>
  )
}

export default ProductShowcase
