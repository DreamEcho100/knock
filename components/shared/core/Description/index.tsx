import type { HTMLAttributes } from 'react'

const Description = ({
  children,
}: {
  children: HTMLAttributes<HTMLParagraphElement>['children']
}) => {
  return (
    <div className="text-center leading-12">
      <p className="text-[2.25rem] leading-[1.5]">{children}</p>
    </div>
  )
}

export default Description
