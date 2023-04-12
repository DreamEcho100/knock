import CustomNextImage from '@components/shared/common/CustomNextImage';
import CustomNextSeo from '@components/shared/common/CustomNextSeo';
import type { GetServerSideProps, NextPage } from 'next';
import { defaultSiteName3 } from '@utils/core/next-seo.config';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { getFaqPageData } from '@utils/core/API';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const FAQSPages: NextPage = () => {
	const pageTitle = `FAQs | ${defaultSiteName3}`;
	const pageDescription = 'Frequently asked questions about us.';

	const { data } = useQuery(['faq'], getFaqPageData, {
		refetchOnWindowFocus: true
	});

	const array = [1, 2, 3, 4, 5, 6, 7, 8];

	return (
		<>
			<CustomNextSeo pageTitle={pageTitle} pageDescription={pageDescription} />

			<section className='bg-primary-1 section-p-v1 flex flex-col'>
				<div className='max-w-full md:max-w-[800px] mx-auto text-primary-4'>
					<header>
						<h1 className='text-h2 capitalize mt-10 md:mt-0 font-semibold text-primary-1'>
							FAQs
						</h1>
					</header>
					<ul className='flex flex-col gap-8 my-8 border-[0.125rem] border-bg-secondary-1 px-8 sm:px-20 py-12 rounded-2xl leading-[2] text-[rgb(200, 200, 200)]'>
						{data ? (
							data?.FAQpage.map((item: any) => {
								return (
									<li key={item.id} className='flex flex-col py-1rounded'>
										<span className='flex flex-col text-[80%]'>
											<h3 className='text-h6 uppercase relative text-primary-1 mb-1'>
												<CustomNextImage
													src='/svgs/purple-circle.svg'
													width={20}
													height={20}
													className='w-[0.6rem] h-[0.6rem] absolute top-1/2 left-0 -translate-x-[150%] -translate-y-[50%]
													rtl:right-0 rtl:left-auto rtl:translate-x-[150%]'
												/>
												{item ? (
													item.h2
												) : (
													<div className='w-[50%] h-[30px]  md:w-[40%] '>
														<SkeletonTheme
															baseColor='#000'
															highlightColor='#7d7b78'
														>
															<Skeleton
																width={'100%'}
																count={1}
																height={'100%'}
																className={'rounded-3xl  '}
															/>
														</SkeletonTheme>
													</div>
												)}
											</h3>
											{item.answer_type === 'opening_and_lists' ? (
												<>
													<p>
														{item ? (
															item.p
														) : (
															<div className='w-[100%] h-[20px]  md:w-[100%] '>
																<SkeletonTheme
																	baseColor='#000'
																	highlightColor='#7d7b78'
																>
																	<Skeleton
																		width={'100%'}
																		count={1}
																		height={'100%'}
																		className={'rounded-3xl  '}
																	/>
																</SkeletonTheme>
															</div>
														)}
													</p>
													<div className='flex flex-wrap gap-4 mt-2'>
														<div>
															<p>
																{item ? (
																	<strong>{item.h3}</strong>
																) : (
																	<div className='w-[30%] h-[15px]  md:w-[40%] '>
																		<SkeletonTheme
																			baseColor='#000'
																			highlightColor='#7d7b78'
																		>
																			<Skeleton
																				width={'100%'}
																				count={1}
																				height={'100%'}
																				className={'rounded-3xl  '}
																			/>
																		</SkeletonTheme>
																	</div>
																)}
															</p>
															<ul>
																{item.faq_list.length ? (
																	item.faq_list.map((ListElem: any) => (
																		<li key={ListElem.id}>{ListElem.li}</li>
																	))
																) : (
																	<div className='w-[200px] md:w-[500px]  '>
																		<SkeletonTheme
																			baseColor='#000'
																			highlightColor='#7d7b78'
																		>
																			<Skeleton
																				width={'100%'}
																				count={1}
																				height={'100%'}
																				className={'rounded-3xl mt-5 '}
																			/>
																		</SkeletonTheme>
																	</div>
																)}
															</ul>
														</div>
													</div>
												</>
											) : (
												<>
													{item ? (
														<p>{item.p}</p>
													) : (
														<div className='w-[60%] h-[20px]  md:w-[60%] '>
															<SkeletonTheme
																baseColor='#000'
																highlightColor='#7d7b78'
															>
																<Skeleton
																	width={'100%'}
																	count={1}
																	height={'100%'}
																	className={'rounded-3xl mt-5 '}
																/>
															</SkeletonTheme>
														</div>
													)}
												</>
											)}
										</span>
									</li>
								);
							})
						) : (
							<>
								{array.map((el) => (
									<div key={el} className='w-[200px] h-[40px]  md:w-[500px] '>
										<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
											<Skeleton
												width={'100%'}
												count={1}
												height={'100%'}
												className={'rounded-3xl'}
											/>
										</SkeletonTheme>
									</div>
								))}
							</>
						)}
					</ul>
				</div>
			</section>
		</>
	);
};

export default FAQSPages;

export const getServerSideProps: GetServerSideProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['faq'], getFaqPageData);

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	};
};
