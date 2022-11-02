import Button from '@components/shared/core/Button'
import React from 'react'

type Props = {}

const VideosSection = (props: Props) => {
  return (
    <section className="bg-primary-1 text-primary-2">
      <div
        className="container-restrictions-2
					flex flex-col gap-16 py-20"
      >
        <header className="text-center">
          <h2 className="text-h2 text-primary-1 font-bold uppercase">
            take your drums to the next level
          </h2>
        </header>
        <div
          className="flex flex-col items-center justify-center gap-8
					lg:flex-row"
        >
          <iframe
            width="400"
            height="200"
            src="https://www.youtube.com/embed/4fiC6Zi0Wnw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="overflow-hidden rounded-2xl"
          ></iframe>
          <iframe
            width="400"
            height="200"
            src="https://www.youtube.com/embed/4fiC6Zi0Wnw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="overflow-hidden rounded-2xl"
          ></iframe>
        </div>
        <div className="flex items-center justify-center mt-8">
          <Button className="capitalize">add to cart</Button>
        </div>
      </div>
    </section>
  )
}

export default VideosSection
