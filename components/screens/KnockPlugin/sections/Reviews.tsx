import { Navigation, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const reviews = [
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review:
			"You're a Trendsetter,\nTrailblazer, Innovator, Mogul, and Inspiration to everyone\naround you. Your Drums Will Always stand the test of Time\nfor many generations of creatives. More Blessings on Blessings.",
		reviewBy: 'Dara JT.'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review:
			"LEGEND. Not one of my songs I've released\nin the past 5 years has been made without at least one\nelement of any of the DTK.",
		reviewBy: 'AN TY'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review:
			"Dude, your sound packs to many were like a real inside look into what the words biggest\nproducers are working with and why their music sounded as it did. When you made it\naccessible for everyone to have you've literally bridge a HUGE gap between pros with\nexpensive equipment and kids with laptops to a point where everyone is able to focus\nmore on creativity and not stress out about the quality of your beats. We are forever\nthankful for that",
		reviewBy: 'From The Crib'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review:
			'DTK truly got me through some tough times. Still does to this day. About to download X\ntonight and make some crazy shit. Praise DECAP',
		reviewBy: 'LLusion'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review:
			"Helped me elevate my own sound and gave me the confidence to actually send out my\nmusic. Without Decap I would have never to make the music I've made with artists\ntoday. Thank you brother.",
		reviewBy: 'Toasty_MM'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review:
			"He (Decap) really does have some of the best sounds in the game, if not the best.\nmean you really don't have to do anything to them, when mixing your beat. Kicks are\npowerful, Snare crack, and the rest is top tier quality. Thanks for all your hard work an\neffort.",
		reviewBy: 'Pri$EGotBeats'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review:
			'DECAP kits are the best. You know it, I know it; Everybody knows it!',
		reviewBy: 'Pro Ave'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'Thnx for keeping me inspired.',
		reviewBy: 'Flume'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review:
			"Decap is literally helping shape the sound of popular modern production, it's trippy.",
		reviewBy: 'Ipkuss'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'Thank you Decap for the drums that knock.',
		reviewBy: 'KAELIN ELLIS'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'Decap shit slaps unreasonably hard',
		reviewBy: 'THE KOUNT'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review:
			'They gotta add in the amount of hours we all use your kits in this.',
		reviewBy: 'Monte booker'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'DECAP shaped the music industry according to his style Legend.',
		reviewBy: 'FrankPole'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'Refreshing sound design EVERY time!',
		reviewBy: 'shamtrax music'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'The best drum kits out there. I got all of them!',
		reviewBy: 'Gustavs'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'Instant buy',
		reviewBy: 'Spizzyspose'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'Best drums in the game',
		reviewBy: 'Blvkbeats'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'The best drums in the industry period!',
		reviewBy: 'Luis Garay'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'Decap with my FAVE kits.',
		reviewBy: 'Ecklectic official'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'These drums will probably win in a fight against Mike Tyson.',
		reviewBy: 'Adiktive'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'Nothing beats the joy of getting a Decap drumkit.',
		reviewBy: 'Naveedsperspective'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'U have the dopest drums in the game rn. I use them a lot.',
		reviewBy: 'Amnesiaxbeats'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'One of the best sound designers in the game!',
		reviewBy: 'nata beats'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'The best kits around!',
		reviewBy: 'Strong Maurice'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'These drums really knock bro!!!!',
		reviewBy: 'Wearejayem'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: "I'm gonna get all of them!",
		reviewBy: 'Maadrhino'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'Legendary. Changed the game for a generation of producers.',
		reviewBy: 'vaportwitch'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review:
			'Best drums in the game. real shit. I use your kicks on everything. even my own live\ndrums.',
		reviewBy: 'Tradevoorhees'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'Best drums in the game!!! #dtk',
		reviewBy: 'goodxj'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'Take my fucking money',
		reviewBy: 'Moorekismet'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'I love your drums fam. Consider it bought…',
		reviewBy: 'Donelljonesforever'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review:
			'Welp, this about to be the drum sounds on every track for the foreseeable future haha',
		reviewBy: 'Ambedo_bass'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'best kick samples i always come back to are DECAP',
		reviewBy: 'of the trees'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review:
			'Goes without saying but DECAP got the best drum kits out no question about it.',
		reviewBy: 'WIZE'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review:
			'DECAP is a pioneer in the music industry. All the recent hip-hop/trap songs released in\nrecent years sound like that because of his sample packs',
		reviewBy: 'FrankPole'
	},
	{
		image: { src: '/images/artists/Baby Keem.png', alt: 'Baby Keem' },
		review: 'This is a MUST HAVE!!!! WOW!!!',
		reviewBy: 'DJ Jazzy Jeff'
	}
];

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CustomNextImage from '@components/shared/common/CustomNextImage';
import { cx } from 'class-variance-authority';

const ReviewsSection = () => {
	return (
		<section className='bg-primary-1 section-p-x-v1'>
			<div className='container-restrictions-2 max-w-screen-lg mx-auto'>
				<Swiper
					modules={[Navigation, A11y, Autoplay]}
					slidesPerView={1}
					navigation
					spaceBetween={20}
					// scrollbar={{ draggable: true }}
					autoplay={{
						delay: 15000
					}}
					className='swiper-wrapper-items-center'
				>
					{reviews.map((item, index) => (
						<SwiperSlide
							key={index}
							className='h-full px-2 flex items-center justify-center'
						>
							<div className='flex relative'>
								<div
									className='rounded-2xl px-6 sm:px-10 py-12 bg-primary-5 flex 	flex-col
												sm:pr-[5.5rem] sm:mr-[5.5rem] sm:py-16'
								>
									<q>{item.review}</q>
									<span className='border-b-[0.0125rem] border-text-primary-4 w-12 mb-2 mt-3'></span>
									<div className='flex items-end gap-4'>
										<cite
											className='flex items-end'
											style={{ fontStyle: 'normal' }}
										>
											{item.reviewBy}
										</cite>
										<CustomNextImage
											src={item.image.src}
											alt={item.image.alt}
											width={250}
											height={250}
											className='block sm:hidden rounded-full aspect-square w-8 h-8'
										/>
									</div>
								</div>
								<div
									className={cx(
										'hidden absolute top-1/2 -translate-y-1/2 right-0',
										'sm:block sm:w-40 sm:h-40'
									)}
								>
									<CustomNextImage
										src={item.image.src}
										alt={item.image.alt}
										width={250}
										height={250}
										className='rounded-full aspect-square w-full h-full'
									/>
								</div>
								<div
									className={cx(
										'w-16 h-16 absolute top-8 -translate-y-full left-8',
										'sm:w-20 sm:h-20 sm:top-10'
									)}
								>
									<CustomNextImage
										src='/svgs/double-quates.svg'
										alt={item.image.alt}
										width={250}
										height={250}
										className='aspect-square w-full h-full'
									/>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default ReviewsSection;
