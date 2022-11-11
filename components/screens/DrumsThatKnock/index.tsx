import { IDrumsThatKnockPageProps } from '@pages/drums-that-knock';
import {
	ArtistsSection,
	DigitalProductsSection,
	HeroSection,
	KnockProductShowcaseSection,
	ReviewsSection
} from './sections';

const reviews = [
	{
		review:
			"This Knock plug in is essential for all drum buses. I use Knock for the drum bus, and RC 20 for\nthe melody bus and I don't need anything more.",
		reviewedBy: 'Demetrious White'
	},
	{
		review:
			"Easily one of the most genius plugins ever made. I know about a year late but bro. THANK\nYOU! You've just improved my workflow by so much. Can't wait to see what you come up with\nnext, perhaps a Fx plug-in for Melodie's?",
		reviewedBy: 'Carlito Olivero'
	},
	{
		review: 'Thanks bro! Knock has permanent residence on my master channel.',
		reviewedBy: 'A.J. Hall'
	},
	{
		review:
			'I highly recommend the KNOCK plugin. drums gon feel like they physically coming out\nof the speakers',
		reviewedBy: 'Cameron Butler'
	},
	{
		review:
			'One of the best plugins I ever got.... this is definitely my Top 3 go-to for drums! Stay\ntuned for a video recap!',
		reviewedBy: 'Rocky Blaq'
	},
	{
		review:
			'Shout out to DECAP for making one of the best plug-ins of all time. I literally use it on\nevery beat.',
		reviewedBy: 'ZayTooLit Back Up'
	},
	{
		review:
			'This plug is unreal everybody should have it that mix or produce! Good job famo',
		reviewedBy: 'Tim Kelley'
	},
	{ review: 'Fire plugin', reviewedBy: 'Skratch Bastid' },
	{ review: 'One of my favourites!!!!', reviewedBy: 'Vincent Van den Ende' },
	{
		review: 'One of my go to plugs for beats and sound design! Excellence!',
		reviewedBy: 'Tone Jonez'
	},
	{
		review: "Best plugin for mixing kicks/808's",
		reviewedBy: 'ILIASSOPDEBEAT'
	},
	{
		review:
			"when I tell you that it's worth every penny.... Bro. It takes stock sounds to a new level.\nJust imagine what it could do for your sounds in your library.",
		reviewedBy: 'Xtradaking'
	},
	{
		review:
			'DECAP did 1 plugin and that sht already in GOAT status.thats power.',
		reviewedBy: 'VOICE NOTE PAPI'
	},
	{
		review: "Maaan, it's exactly how it's supposed to be. Great plugin!",
		reviewedBy: 'Karat Gold Music'
	},
	{
		review: 'YOU KILLED THIS SHIT BRO!! PLUG-IN IS WILD!',
		reviewedBy: 'M-phazes'
	},
	{
		review:
			"That plug in the KNOCK from DECAP is 🔥🔥🔥. I'm gonna have some demos soon.\nThis is definitely a must have in the arsenal.",
		reviewedBy: 'Dibia$e'
	},
	{
		review:
			'Finally getting a chance to play with DECAP\'s new plugin "KNOCK" and it does exactly\nwhat the title says. Super useful for shaping individual sounds and gonna be using this a\nlot on the drum buss. Definitely get that if you haven\'t yet.',
		reviewedBy: 'GOD.DAMN.CHAN'
	},
	{
		review:
			'I love how useful it is and how it doesn\'t use much CPU. It allows producers to use it on\nmany tracks. making them "knock" and sound cohesive together at the same time. Big\nstep up from the stock Drum Buss plugin.',
		reviewedBy: 'walterdeans'
	},
	{
		review:
			'Just copped the homie DECAP\'s new "Knock" plugin. Here is my 4 word review: It\'s\nreally really good.',
		reviewedBy: 'Mars Today'
	},
	{
		review:
			"Y'all betta grab that! It's like hot sauce I been putting it on everything lol!",
		reviewedBy: 'Tone Jonez'
	}
];

const shortReviews = reviews.filter((review) => review.review.length < 100);

const DrumsThatKnock = ({
	products,
	knockPlugin
}: IDrumsThatKnockPageProps) => {
	return (
		<>
			<HeroSection />
			<DigitalProductsSection products={products} />
			{/* <MerchSection /> */}
			<ArtistsSection />
			<ReviewsSection reviews={shortReviews} />
			<KnockProductShowcaseSection knockPlugin={knockPlugin} />
		</>
	);
};

export default DrumsThatKnock;
