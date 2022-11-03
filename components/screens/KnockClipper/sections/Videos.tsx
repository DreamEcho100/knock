import Button from '@components/shared/core/Button'
import VideosContainer from '@components/shared/core/VideosContainer'
import React from 'react'

type Props = {}

const VideosSection = (props: Props) => {
  return (
    <section
      className="bg-primary-1 text-primary-2 p-8 
				sm:py-20"
    >
      <VideosContainer />
    </section>
  )
}

export default VideosSection
