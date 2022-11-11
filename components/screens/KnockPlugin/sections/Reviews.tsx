import { Navigation, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const reviews = [
	{
		image: { src: '/images/testimonials/Dara JT..webp', alt: 'Dara JT.' },
		review:
			"You're a Trendsetter,\nTrailblazer, Innovator, Mogul, and Inspiration to everyone\naround you. Your Drums Will Always stand the test of Time\nfor many generations of creatives. More Blessings on Blessings.",
		reviewBy: 'Dara JT.'
	},
	{
		image: { src: '/images/testimonials/AN TY.jpg', alt: 'AN TY' },
		review:
			"LEGEND. Not one of my songs I've released\nin the past 5 years has been made without at least one\nelement of any of the DTK.",
		reviewBy: 'AN TY'
	},
	{
		image: { src: '/images/testimonials/icon1.png', alt: '' },
		review:
			"Dude, your sound packs to many were like a real inside look into what the words biggest\nproducers are working with and why their music sounded as it did. When you made it\naccessible for everyone to have you've literally bridge a HUGE gap between pros with\nexpensive equipment and kids with laptops to a point where everyone is able to focus\nmore on creativity and not stress out about the quality of your beats. We are forever\nthankful for that",
		reviewBy: 'From The Crib'
	},
	{
		image: { src: '/images/testimonials/LLusion.jpg', alt: 'LLusion' },
		review:
			'DTK truly got me through some tough times. Still does to this day. About to download X\ntonight and make some crazy shit. Praise DECAP',
		reviewBy: 'LLusion'
	},
	{
		image: { src: '/images/testimonials/Toasty_MM.jpeg', alt: 'Toasty_MM' },
		review:
			"Helped me elevate my own sound and gave me the confidence to actually send out my\nmusic. Without Decap I would have never to make the music I've made with artists\ntoday. Thank you brother.",
		reviewBy: 'Toasty_MM'
	},
	{
		image: {
			src: '/images/testimonials/Pri$EGotBeats.jpg',
			alt: 'Pri$EGotBeats'
		},
		review:
			"He (Decap) really does have some of the best sounds in the game, if not the best.\nmean you really don't have to do anything to them, when mixing your beat. Kicks are\npowerful, Snare crack, and the rest is top tier quality. Thanks for all your hard work an\neffort.",
		reviewBy: 'Pri$EGotBeats'
	},
	{
		image: { src: '/images/testimonials/icon1.png', alt: '' },
		review:
			'DECAP kits are the best. You know it, I know it; Everybody knows it!',
		reviewBy: 'Pro Ave'
	},
	{
		image: { src: '/images/testimonials/Flume.jpg', alt: 'Flume' },
		review: 'Thnx for keeping me inspired.',
		reviewBy: 'Flume'
	},
	{
		image: { src: '/images/testimonials/Ipkuss.jpg', alt: 'Ipkuss' },
		review:
			"Decap is literally helping shape the sound of popular modern production, it's trippy.",
		reviewBy: 'Ipkuss'
	},
	{
		image: {
			src: '/images/testimonials/KAELIN ELLIS.jpg',
			alt: 'KAELIN ELLIS'
		},
		review: 'Thank you Decap for the drums that knock.',
		reviewBy: 'KAELIN ELLIS'
	},
	{
		image: { src: '/images/testimonials/THE KOUNT.jpg', alt: 'THE KOUNT' },
		review: 'Decap shit slaps unreasonably hard',
		reviewBy: 'THE KOUNT'
	},
	{
		image: {
			src: '/images/testimonials/Monte booker.jpg',
			alt: 'Monte booker'
		},
		review:
			'They gotta add in the amount of hours we all use your kits in this.',
		reviewBy: 'Monte booker'
	},
	{
		image: { src: '/images/testimonials/FrankPole.jpg', alt: 'FrankPole' },
		review: 'DECAP shaped the music industry according to his style Legend.',
		reviewBy: 'FrankPole'
	},
	{
		image: {
			src: '/images/testimonials/shamtrax music.jpg',
			alt: 'shamtrax music'
		},
		review: 'Refreshing sound design EVERY time!',
		reviewBy: 'shamtrax music'
	},
	{
		image: { src: '/images/testimonials/Gustavs.jpg', alt: 'Gustavs' },
		review: 'The best drum kits out there. I got all of them!',
		reviewBy: 'Gustavs'
	},
	{
		image: { src: '/images/testimonials/Spizzyspose.jpg', alt: 'Spizzyspose' },
		review: 'Instant buy',
		reviewBy: 'Spizzyspose'
	},
	{
		image: { src: '/images/testimonials/Blvkbeats.jpg', alt: 'Blvkbeats' },
		review: 'Best drums in the game',
		reviewBy: 'Blvkbeats'
	},
	{
		image: {
			src: '/images/testimonials/Ecklectic official.jpg',
			alt: 'Ecklectic'
		},
		review: 'The best drums in the industry period!',
		reviewBy: 'Luis Garay'
	},
	{
		image: {
			src: '/images/testimonials/Ecklectic official.jpg',
			alt: 'Ecklectic official'
		},
		review: 'Decap with my FAVE kits.',
		reviewBy: 'Ecklectic official'
	},
	{
		image: { src: '/images/testimonials/icon1.png', alt: '' },
		review: 'These drums will probably win in a fight against Mike Tyson.',
		reviewBy: 'Adiktive'
	},
	{
		image: { src: '/images/testimonials/icon1.png', alt: '' },
		review: 'Nothing beats the joy of getting a Decap drumkit.',
		reviewBy: 'Naveedsperspective'
	},
	{
		image: {
			src: '/images/testimonials/Amnesiaxbeats.jpg',
			alt: 'Amnesiaxbeats'
		},
		review: 'U have the dopest drums in the game rn. I use them a lot.',
		reviewBy: 'Amnesiaxbeats'
	},
	{
		image: { src: '/images/testimonials/nata beats.jpg', alt: 'nata beats' },
		review: 'One of the best sound designers in the game!',
		reviewBy: 'nata beats'
	},
	{
		image: { src: '/images/testimonials/icon1.png', alt: '' },
		review: 'The best kits around!',
		reviewBy: 'Strong Maurice'
	},
	{
		image: { src: '/images/testimonials/Wearejayem.webp', alt: 'Wearejayem' },
		review: 'These drums really knock bro!!!!',
		reviewBy: 'Wearejayem'
	},
	{
		image: { src: '/images/testimonials/Maadrhino.jpg', alt: 'Maadrhino' },
		review: "I'm gonna get all of them!",
		reviewBy: 'Maadrhino'
	},
	{
		image: { src: '/images/testimonials/vaportwitch.jpg', alt: 'vaportwitch' },
		review: 'Legendary. Changed the game for a generation of producers.',
		reviewBy: 'vaportwitch'
	},
	{
		image: {
			src: '/images/testimonials/Tradevoorhees.jpg',
			alt: 'Tradevoorhees'
		},
		review:
			'Best drums in the game. real shit. I use your kicks on everything. even my own live\ndrums.',
		reviewBy: 'Tradevoorhees'
	},
	{
		image: { src: '/images/testimonials/goodxj.jpg', alt: 'goodxj' },
		review: 'Best drums in the game!!! #dtk',
		reviewBy: 'goodxj'
	},
	{
		image: { src: '/images/testimonials/Moorekismet.jpg', alt: 'Moorekismet' },
		review: 'Take my fucking money',
		reviewBy: 'Moorekismet'
	},
	{
		image: {
			src: '/images/testimonials/Donelljonesforever.jpg',
			alt: 'Donelljonesforever'
		},
		review: 'I love your drums fam. Consider it bought…',
		reviewBy: 'Donelljonesforever'
	},
	{
		image: { src: '/images/testimonials/icon1.png', alt: '' },
		review:
			'Welp, this about to be the drum sounds on every track for the foreseeable future haha',
		reviewBy: 'Ambedo_bass'
	},
	{
		image: {
			src: '/images/testimonials/of the trees.jpg',
			alt: 'of the trees'
		},
		review: 'best kick samples i always come back to are DECAP',
		reviewBy: 'of the trees'
	},
	{
		image: { src: '/images/testimonials/icon1.png', alt: '' },
		review:
			'Goes without saying but DECAP got the best drum kits out no question about it.',
		reviewBy: 'WIZE'
	},
	{
		image: { src: '/images/testimonials/FrankPole2.jpg', alt: 'FrankPole' },
		review:
			'DECAP is a pioneer in the music industry. All the recent hip-hop/trap songs released in\nrecent years sound like that because of his sample packs',
		reviewBy: 'FrankPole'
	},
	{
		image: {
			src: '/images/testimonials/DJ Jazzy Jeff.jpg',
			alt: 'DJ Jazzy Jeff'
		},
		review: 'This is a MUST HAVE!!!! WOW!!!',
		reviewBy: 'DJ Jazzy Jeff'
	}
];

const shortReviews = reviews.filter((review) => review.review.length < 100);

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
					{shortReviews.map((item, index) => (
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
