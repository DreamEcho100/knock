import type { IProductByIdPageProps } from '@pages/products/[productId]'

import MdToHTMLFormatter from '@components/shared/common/Format/MdToHTML'

import classes from '@styles/content.module.css'

const DescriptionSection = ({
  description,
}: {
  description: IProductByIdPageProps['product']['description']
}) => {
  return (
    <section className="bg-primary-1 overflow-x-hidden">
      <div
        className={`${classes.contentContainerElements} ${classes.contentContainerV2} flex flex-col text-center container-restrictions-1 leading-10 p-4
				sm:p-20`}
      >
        <MdToHTMLFormatter content={description} />
      </div>
    </section>
  )
}

export default DescriptionSection
