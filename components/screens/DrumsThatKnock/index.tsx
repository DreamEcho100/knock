import { IDrumsThatKnockPageProps } from '@pages/drums-that-knock';
import { NextSeo } from 'next-seo';
import {
	defaultSiteName2,
	defaultSiteName3,
	websiteBasePath
} from 'next-seo.config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
	ArtistsSection,
	DigitalProductsSection,
	HeroSection,
	KnockProductShowcaseSection
} from './sections';

const reviews = [
	{
		image: { src: '/images/people/Dara JT..webp', alt: 'Dara JT.' },
		review:
			"You're a Trendsetter,\nTrailblazer, Innovator, Mogul, and Inspiration to everyone\naround you. Your Drums Will Always stand the test of Time\nfor many generations of creatives. More Blessings on Blessings.",
		reviewedBy: 'Dara JT.'
	},
	{
		image: { src: '/images/people/AN TY.jpg', alt: 'AN TY' },
		review:
			"LEGEND. Not one of my songs I've released\nin the past 5 years has been made without at least one\nelement of any of the DTK.",
		reviewedBy: 'AN TY'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review:
			"Dude, your sound packs to many were like a real inside look into what the words biggest\nproducers are working with and why their music sounded as it did. When you made it\naccessible for everyone to have you've literally bridge a HUGE gap between pros with\nexpensive equipment and kids with laptops to a point where everyone is able to focus\nmore on creativity and not stress out about the quality of your beats. We are forever\nthankful for that",
		reviewedBy: 'From The Crib'
	},
	{
		image: { src: '/images/people/LLusion.jpg', alt: 'LLusion' },
		review:
			'DTK truly got me through some tough times. Still does to this day. About to download X\ntonight and make some crazy shit. Praise DECAP',
		reviewedBy: 'LLusion'
	},
	{
		image: { src: '/images/people/Toasty_MM.jpeg', alt: 'Toasty_MM' },
		review:
			"Helped me elevate my own sound and gave me the confidence to actually send out my\nmusic. Without Decap I would have never to make the music I've made with artists\ntoday. Thank you brother.",
		reviewedBy: 'Toasty_MM'
	},
	{
		image: {
			src: '/images/people/Pri$EGotBeats.jpg',
			alt: 'Pri$EGotBeats'
		},
		review:
			"He (Decap) really does have some of the best sounds in the game, if not the best.\nmean you really don't have to do anything to them, when mixing your beat. Kicks are\npowerful, Snare crack, and the rest is top tier quality. Thanks for all your hard work an\neffort.",
		reviewedBy: 'Pri$EGotBeats'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review:
			'DECAP kits are the best. You know it, I know it; Everybody knows it!',
		reviewedBy: 'Pro Ave'
	},
	{
		image: { src: '/images/people/Flume.jpg', alt: 'Flume' },
		review: 'Thnx for keeping me inspired.',
		reviewedBy: 'Flume'
	},
	{
		image: { src: '/images/people/Ipkuss.jpg', alt: 'Ipkuss' },
		review:
			"Decap is literally helping shape the sound of popular modern production, it's trippy.",
		reviewedBy: 'Ipkuss'
	},
	{
		image: {
			src: '/images/people/KAELIN ELLIS.jpg',
			alt: 'KAELIN ELLIS'
		},
		review: 'Thank you Decap for the drums that knock.',
		reviewedBy: 'KAELIN ELLIS'
	},
	{
		image: { src: '/images/people/THE KOUNT.jpg', alt: 'THE KOUNT' },
		review: 'Decap shit slaps unreasonably hard',
		reviewedBy: 'THE KOUNT'
	},
	{
		image: {
			src: '/images/people/Monte booker.jpg',
			alt: 'Monte booker'
		},
		review:
			'They gotta add in the amount of hours we all use your kits in this.',
		reviewedBy: 'Monte booker'
	},
	{
		image: { src: '/images/people/FrankPole.jpg', alt: 'FrankPole' },
		review: 'DECAP shaped the music industry according to his style Legend.',
		reviewedBy: 'FrankPole'
	},
	{
		image: {
			src: '/images/people/shamtrax music.jpg',
			alt: 'shamtrax music'
		},
		review: 'Refreshing sound design EVERY time!',
		reviewedBy: 'shamtrax music'
	},
	{
		image: { src: '/images/people/Gustavs.jpg', alt: 'Gustavs' },
		review: 'The best drum kits out there. I got all of them!',
		reviewedBy: 'Gustavs'
	},
	{
		image: { src: '/images/people/Spizzyspose.jpg', alt: 'Spizzyspose' },
		review: 'Instant buy',
		reviewedBy: 'Spizzyspose'
	},
	{
		image: { src: '/images/people/Blvkbeats.jpg', alt: 'Blvkbeats' },
		review: 'Best drums in the game',
		reviewedBy: 'Blvkbeats'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review: 'The best drums in the industry period!',
		reviewedBy: 'Luis Garay'
	},
	{
		image: {
			src: '/images/people/Ecklectic official.jpg',
			alt: 'Ecklectic official'
		},
		review: 'Decap with my FAVE kits.',
		reviewedBy: 'Ecklectic official'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review: 'These drums will probably win in a fight against Mike Tyson.',
		reviewedBy: 'Adiktive'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review: 'Nothing beats the joy of getting a Decap drumkit.',
		reviewedBy: 'Naveedsperspective'
	},
	{
		image: {
			src: '/images/people/Amnesiaxbeats.jpg',
			alt: 'Amnesiaxbeats'
		},
		review: 'U have the dopest drums in the game rn. I use them a lot.',
		reviewedBy: 'Amnesiaxbeats'
	},
	{
		image: { src: '/images/people/nata beats.jpg', alt: 'nata beats' },
		review: 'One of the best sound designers in the game!',
		reviewedBy: 'nata beats'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review: 'The best kits around!',
		reviewedBy: 'Strong Maurice'
	},
	{
		image: { src: '/images/people/Wearejayem.webp', alt: 'Wearejayem' },
		review: 'These drums really knock bro!!!!',
		reviewedBy: 'Wearejayem'
	},
	{
		image: { src: '/images/people/Maadrhino.jpg', alt: 'Maadrhino' },
		review: "I'm gonna get all of them!",
		reviewedBy: 'Maadrhino'
	},
	{
		image: { src: '/images/people/vaportwitch.jpg', alt: 'vaportwitch' },
		review: 'Legendary. Changed the game for a generation of producers.',
		reviewedBy: 'vaportwitch'
	},
	{
		image: {
			src: '/images/people/Tradevoorhees.jpg',
			alt: 'Tradevoorhees'
		},
		review:
			'Best drums in the game. real shit. I use your kicks on everything. even my own live\ndrums.',
		reviewedBy: 'Tradevoorhees'
	},
	{
		image: { src: '/images/people/goodxj.jpg', alt: 'goodxj' },
		review: 'Best drums in the game!!! #dtk',
		reviewedBy: 'goodxj'
	},
	{
		image: { src: '/images/people/Moorekismet.jpg', alt: 'Moorekismet' },
		review: 'Take my fucking money',
		reviewedBy: 'Moorekismet'
	},
	{
		image: {
			src: '/images/people/Donelljonesforever.jpg',
			alt: 'Donelljonesforever'
		},
		review: 'I love your drums fam. Consider it bought…',
		reviewedBy: 'Donelljonesforever'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review:
			'Welp, this about to be the drum sounds on every track for the foreseeable future haha',
		reviewedBy: 'Ambedo_bass'
	},
	{
		image: {
			src: '/images/people/of the trees.jpg',
			alt: 'of the trees'
		},
		review: 'best kick samples i always come back to are DECAP',
		reviewedBy: 'of the trees'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review:
			'Goes without saying but DECAP got the best drum kits out no question about it.',
		reviewedBy: 'WIZE'
	},
	{
		image: { src: '/images/people/FrankPole2.jpg', alt: 'FrankPole' },
		review:
			'DECAP is a pioneer in the music industry. All the recent hip-hop/trap songs released in\nrecent years sound like that because of his sample packs',
		reviewedBy: 'FrankPole'
	},
	{
		image: {
			src: '/images/people/DJ Jazzy Jeff.jpg',
			alt: 'DJ Jazzy Jeff'
		},
		review: 'This is a MUST HAVE!!!! WOW!!!',
		reviewedBy: 'DJ Jazzy Jeff'
	}
];

const shortReviews = reviews.filter((review) => review.review.length < 100);

const DrumsThatKnock = ({
	products,
	knockPlugin
}: IDrumsThatKnockPageProps) => {
	const router = useRouter();
	const pageTitle = `DRUMS THAT KNOCK | ${defaultSiteName3} | ${defaultSiteName2}`;
	const pageDescription =
		'Designed from scratch by DECAP. Premium quality, groundbreaking as always.';

	return (
		<>
			<NextSeo
				title={pageTitle}
				description={pageDescription}
				canonical={`${websiteBasePath}${router.pathname}`}
				twitter={{ handle: pageTitle }}
				openGraph={{ title: pageTitle, description: pageDescription }}
			/>
			<HeroSection />
			<DigitalProductsSection products={products} />
			{/* <MerchSection /> */}
			<ArtistsSection reviews={shortReviews} />
			<KnockProductShowcaseSection knockPlugin={knockPlugin} />
		</>
	);
};

export default DrumsThatKnock;
