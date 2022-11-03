import type { HTMLAttributes } from 'react'

const Description = ({
  children,
}: {
  children: HTMLAttributes<HTMLParagraphElement>['children']
}) => {
  // !!!
  return (
    <div className="text-center leading-12 max-w-[900px]">
      <p className="text-[2rem] leading-[1.5]">{children}</p>
    </div>
  )
}

export default Description
