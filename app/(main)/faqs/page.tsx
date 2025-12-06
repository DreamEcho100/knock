import CustomNextImage from '~/app/_components/shared/common/CustomNextImage';
import { defaultSiteName3 } from '~/utils/core/next-seo.config';
import { getFaqPageData } from '~/utils/core/API';

export const revalidate = 360;
export const metadata = {
	title: `FAQs | ${defaultSiteName3}`,
	description: 'Frequently asked questions about us.',
};

export default async function FAQSPages() {
	const data = await getFaqPageData();

	if (!data || !data.FAQpage) {
		return (
			<section className="bg-primary-1 section-p-v1 flex flex-col">
				<div className="max-w-full md:max-w-[800px] mx-auto text-primary-4">
					<header>
						<h1 className="text-h2 capitalize mt-10 md:mt-0 font-semibold text-primary-1">
							FAQs
						</h1>
					</header>
					<div className="my-8 border-[0.125rem] border-bg-secondary-1 px-8 sm:px-20 py-12 rounded-2xl">
						<p className="text-center">Unable to load FAQ data. Please try again later.</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="bg-primary-1 section-p-v1 flex flex-col">
			<div className="max-w-full md:max-w-[800px] mx-auto text-primary-4">
				<header>
					<h1 className="text-h2 capitalize mt-10 md:mt-0 font-semibold text-primary-1">
						FAQs
					</h1>
				</header>
				<ul className="flex flex-col gap-8 my-8 border-[0.125rem] border-bg-secondary-1 px-8 sm:px-20 py-12 rounded-2xl leading-[2] text-[rgb(200, 200, 200)]">
					{data.FAQpage.map((item: any) => {
						return (
							<li key={item.id} className="flex flex-col py-1rounded">
								<span className="flex flex-col text-[80%]">
									<h3 className="text-h6 uppercase relative text-primary-1 mb-1">
										<CustomNextImage
											src="/svgs/purple-circle.svg"
											width={20}
											height={20}
											className="w-[0.6rem] h-[0.6rem] absolute top-1/2 left-0 -translate-x-[150%] -translate-y-[50%]
													rtl:right-0 rtl:left-auto rtl:translate-x-[150%]"
										/>
										{item.h2}
									</h3>
									{item.answer_type === 'opening_and_lists' ? (
										<>
											<p>{item.p}</p>
											<div className="flex flex-wrap gap-4 mt-2">
												<div>
													<p>
														<strong>{item.h3}</strong>
													</p>
													<ul>
														{item.faq_list.map((ListElem: any) => (
															<li key={ListElem.id}>{ListElem.li}</li>
														))}
													</ul>
												</div>
											</div>
										</>
									) : (
										<p>{item.p}</p>
									)}
								</span>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
