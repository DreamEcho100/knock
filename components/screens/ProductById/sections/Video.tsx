import type { IProductByIdPageProps } from '@pages/products/[productId]'
import Image from 'next/image'

const VideoSection = ({
  video,
}: {
  video: IProductByIdPageProps['product']['video']
}) => {
  return (
    <section className="relative bg-primary-1">
      <Image
        src="/images/Rectangle 46.png"
        alt=""
        width={200}
        height={200}
        className="pointer-events-none aspect-square absolute w-1/2 top-0 right-0 scale-150 -translate-y-[5%] -translate-x-1/4"
      />
      <div className="relative  mx-8 my-24 flex flex-col gap-8">
        <header className="text-center">
          <h2 className="text-h3 font-bold text-primary-1 capitalize">
            watch {video.title}
          </h2>
        </header>
        <div className="flex items-center justify-center">
          {/* <video src={video.src} poster={video.posterSrc} controls></video> */}
          <iframe
            width="400"
            height="200"
            src={video.src}
            title={video.title || 'YouTube video player'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="overflow-hidden rounded-2xl"
          ></iframe>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
