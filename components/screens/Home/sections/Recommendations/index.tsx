import Image from 'next/image'
import Link from 'next/link'

const RecommendationsSection = () => {
  return (
    <section
      className="flex p-4 flex-col items-center
				md:items-stretch md:flex-row
				md:px-8 md:py-12 md:gap-8
				"
    >
      <div
        className="flex justify-center items-center
			md:flex-grow md:w-1/2"
      >
        <Image
          src="/images/Mask group.png"
          alt=""
          width={800}
          height={800}
          className="object-contain"
        />
      </div>
      <div
        className="flex flex-col gap-2items-center text-center mb-12 
				md:p-4 md:items-start md:text-align-initial md:flex-grow md:w-1/2 md:justify-center"
      >
        <h2 className="text-h2 text-primary-1 capitalize">
          TOP MUSIC INDUSTRY PROFESSIONALS CHOICE
        </h2>
        <p>
          <q className="text-primary-2">
            When I put out Drums That Knock, producers loved it, and it blew up.
            It created a new standard. When you hear those hard hitting, punchy
            kicks come through Spotify... that&apos;s Drums That Knock, and
            that&apos;s Plugins that knock.
          </q>
          <br />
          <cite>- Decap</cite>
        </p>
        <Link href="/" className="text-primary-1">
          Read more
        </Link>
      </div>
    </section>
  )
}

export default RecommendationsSection
