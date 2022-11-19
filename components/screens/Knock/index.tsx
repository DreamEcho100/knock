import type { IKnockPluginPageProps } from '@pages/knock';
import Head from 'next/head';
import { SystemRequirementsSection } from '../KnockClipper/sections';
import {
	DescriptionSection,
	EasyToUseSection,
	HeroSection,
	ShapesYourDrumsSection,
	DrumsThatKnockSection,
	ReviewsSection,
	VideosSection
} from './sections';

const reviews = [
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review:
			"This Knock plug in is essential for all drum buses. I use Knock for the drum bus, and RC 20 for\nthe melody bus and I don't need anything more.",
		reviewedBy: 'Demetrious White'
	},
	{
		image: {
			src: '/images/people/Carlito Olivero.jpg',
			alt: 'Carlito Olivero'
		},
		review:
			"Easily one of the most genius plugins ever made. I know about a year late but bro. THANK\nYOU! You've just improved my workflow by so much. Can't wait to see what you come up with\nnext, perhaps a Fx plug-in for Melodie's?",
		reviewedBy: 'Carlito Olivero'
	},
	{
		image: { src: '/images/people/A.J. Hall.jpeg', alt: 'A.J. Hall' },
		review: 'Thanks bro! Knock has permanent residence on my master channel.',
		reviewedBy: 'A.J. Hall'
	},
	{
		image: { src: '/images/people/Cameron Butler.jpg', alt: 'Cameron Butler' },
		review:
			'I highly recommend the KNOCK plugin. drums gon feel like they physically coming out\nof the speakers',
		reviewedBy: 'Cameron Butler'
	},
	{
		image: { src: '/images/people/Rocky Blaq.jpg', alt: 'Rocky Blaq' },
		review:
			'One of the best plugins I ever got.... this is definitely my Top 3 go-to for drums! Stay\ntuned for a video recap!',
		reviewedBy: 'Rocky Blaq'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review:
			'Shout out to DECAP for making one of the best plug-ins of all time. I literally use it on\nevery beat.',
		reviewedBy: 'ZayTooLit Back Up'
	},
	{
		image: { src: '/images/people/Tim Kelley.jpg', alt: 'Tim Kelley' },
		review:
			'This plug is unreal everybody should have it that mix or produce! Good job famo',
		reviewedBy: 'Tim Kelley'
	},
	{
		image: { src: '/images/people/Skratch Bastid.jpg', alt: 'Skratch Bastid' },
		review: 'Fire plugin',
		reviewedBy: 'Skratch Bastid'
	},
	{
		image: {
			src: '/images/people/Vincent Van den Ende.jpg',
			alt: 'Vincent Van den Ende'
		},
		review: 'One of my favourites!!!!',
		reviewedBy: 'Vincent Van den Ende'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review: 'One of my go to plugs for beats and sound design! Excellence!',
		reviewedBy: 'Tone Jonez'
	},
	{
		image: { src: '/images/people/ILIASSOPDEBEAT.jpg', alt: 'ILIASSOPDEBEAT' },
		review: "Best plugin for mixing kicks/808's",
		reviewedBy: 'ILIASSOPDEBEAT'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review:
			"when I tell you that it's worth every penny.... Bro. It takes stock sounds to a new level.\nJust imagine what it could do for your sounds in your library.",
		reviewedBy: 'Xtradaking'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review:
			'DECAP did 1 plugin and that sht already in GOAT status.thats power.',
		reviewedBy: 'VOICE NOTE PAPI'
	},
	{
		image: {
			src: '/images/people/Karat Gold Music.jpg',
			alt: 'Karat Gold Music'
		},
		review: "Maaan, it's exactly how it's supposed to be. Great plugin!",
		reviewedBy: 'Karat Gold Music'
	},
	{
		image: { src: '/images/people/M-phazes.jpg', alt: 'M-phazes' },
		review: 'YOU KILLED THIS SHIT BRO!! PLUG-IN IS WILD!',
		reviewedBy: 'M-phazes'
	},
	{
		image: { src: '/images/people/Dibia$e.jpg', alt: 'Dibia$e' },
		review:
			"That plug in the KNOCK from DECAP is 🔥🔥🔥. I'm gonna have some demos soon.\nThis is definitely a must have in the arsenal.",
		reviewedBy: 'Dibia$e'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review:
			'Finally getting a chance to play with DECAP\'s new plugin "KNOCK" and it does exactly\nwhat the title says. Super useful for shaping individual sounds and gonna be using this a\nlot on the drum buss. Definitely get that if you haven\'t yet.',
		reviewedBy: 'GOD.DAMN.CHAN'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review:
			'I love how useful it is and how it doesn\'t use much CPU. It allows producers to use it on\nmany tracks. making them "knock" and sound cohesive together at the same time. Big\nstep up from the stock Drum Buss plugin.',
		reviewedBy: 'walterdeans'
	},
	{
		image: { src: '/images/people/Mars Today.jpg', alt: 'Mars Today' },
		review:
			'Just copped the homie DECAP\'s new "Knock" plugin. Here is my 4 word review: It\'s\nreally really good.',
		reviewedBy: 'Mars Today'
	},
	{
		image: { src: '/images/icon1.png', priority: true, alt: '' },
		review:
			"Y'all betta grab that! It's like hot sauce I been putting it on everything lol!",
		reviewedBy: 'Tone Jonez'
	}
];
// const shortReviews = reviews.filter((review) => review.review.length < 100);

const KnockScreen = ({ knockPlugin }: IKnockPluginPageProps) => {
	return (
		<>
			<Head>
				<title>KNOCK Plugin | PLUGINS THAT KNOCK</title>
				<meta
					name='description'
					content='This is the last plugin you will ever need to make your drums KNOCK and punch through your mix. This plugin was meticulously crafted by platinum producer &amp; award winning sound designer, DECAP. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics o'
				/>
			</Head>
			<HeroSection knockPlugin={knockPlugin} />
			<DescriptionSection />
			<ShapesYourDrumsSection />
			<EasyToUseSection knockPlugin={knockPlugin} />
			<DrumsThatKnockSection knockPlugin={knockPlugin} />
			<ReviewsSection reviews={reviews} />

			<SystemRequirementsSection />
			<section aria-hidden className='section-pb-v1 bg-primary-1'></section>

			<VideosSection knockPlugin={knockPlugin} />
		</>
	);
};

export default KnockScreen;
