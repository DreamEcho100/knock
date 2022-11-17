import CustomNextImage from '@components/shared/common/CustomNextImage';
import type { NextPage } from 'next';
import Head from 'next/head';

const faqs: (
	| {
			question: string;
			answer: string;
			__answer_type?: undefined;
	  }
	| {
			question: string;
			answer: {
				opening: string;
				list: {
					title: string;
					items: string[];
				}[];
			};
			__answer_type: 'opening_and_lists';
	  }
)[] = [
	{
		question: 'DOES KNOCK COME WITH PRESETS?',
		answer: 'Yes! KNOCK comes bundled with factory presets crafted by DECAP.'
	},
	{
		question: 'ARE YOUR PLUGINS COMPATIBLE WITH MY DAW?',
		answer:
			'Our plugins are compatible with every DAW that supports VST3, AU or AAX plugin formats. Please note that VST2 is not supported. This includes the latest versions of: Ableton Live, FL Studio, Pro Tools, Logic, Bitwig Studio, Reaper, Studio One, and others.'
	},
	{
		question: 'WHAT ARE THE SYSTEM REQUIREMENTS / COMPATIBILITY?',
		answer: {
			opening:
				'KNOCK is supported by all major DAWs in 64-bit VST3, AU and AAX format.',
			list: [
				{
					title: 'OS/Processor:',
					items: [
						'Mac: Intel Core i5, i7, i9, Xeon, Apple M1 - OSX 10.12+ - AU, VST3, AAX',
						'Windows: Intel Core i5, i7, i9, Xeon (all Gen 5 and above), AMD Quad Core - WIN 8.1, 10 - 64 bit  VST3, AAX',
						'HDD Space requirements: Minimum of 500MB - 8GB RAM required, 16GB recommended'
					]
				}
			]
		},
		__answer_type: 'opening_and_lists'
	},
	{
		question: 'DO YOU OFFER A DEMO VERSION?',
		answer: 'At the moment, there are no demo versions.'
	},
	{
		question: 'DOES KNOCK SUPPORT MAC OS BIG SUR & APPLE M1 CHIPS?',
		answer:
			'Our plugins are fully compatible with both Mac OS Ventura and Apple M1 & M2 processors.'
	},
	{
		question: 'DOES KNOCK SUPPORT PRO TOOLS / AAX?',
		answer: 'Yes! Our plugins are compatible with Pro Tools / AAX.'
	}
];

const FAQSPages: NextPage = () => {
	return (
		<>
			<Head>
				<title>FAQs | KNOCK Plugin - Make Your Drums Knock</title>
				<meta
					name='description'
					content='Frequently asked questions about us'
				/>
			</Head>
			<section className='bg-primary-1 section-p-v1 flex flex-col break-all'>
				<div className='max-w-full md:max-w-[800px] mx-auto text-primary-4'>
					<header>
						<h1 className='text-h2 capitalize font-semibold text-primary-1'>
							FAQs
						</h1>
					</header>
					<ul className='flex flex-col gap-8 my-8 border-[0.125rem] border-bg-secondary-1 px-8 sm:px-20 py-12 rounded-2xl leading-[2] text-[rgb(200, 200, 200)]'>
						{faqs.map((item) => {
							return (
								<li key={item.question} className='flex flex-col py-1rounded'>
									<span className='flex flex-col text-[80%]'>
										<h3 className='text-h6 uppercase relative text-primary-1 mb-1'>
											<CustomNextImage
												src='/svgs/purple-circle.svg'
												width={20}
												height={20}
												className='w-[0.6rem] h-[0.6rem] absolute top-1/2 left-0 -translate-x-[150%] -translate-y-[50%]
													rtl:right-0 rtl:left-auto rtl:translate-x-[150%]'
											/>
											{item.question}
										</h3>
										{item.__answer_type === 'opening_and_lists' ? (
											<>
												<p>{item.answer.opening}</p>
												<div className='flex flex-wrap gap-4 mt-2'>
													{item.answer.list.map((ListElem, ListElemIndex) => (
														<div key={ListElemIndex}>
															<p>
																<strong>{ListElem.title}</strong>
															</p>
															<ul>
																{ListElem.items.map(
																	(subListElem, subListElemIndex) => (
																		<li key={subListElemIndex}>
																			{subListElem}
																		</li>
																	)
																)}
															</ul>
														</div>
													))}
												</div>
											</>
										) : (
											<p>{item.answer}</p>
										)}
									</span>
								</li>
							);
						})}
					</ul>
				</div>
			</section>
		</>
	);
};

export default FAQSPages;
