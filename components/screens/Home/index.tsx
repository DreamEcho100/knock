import { IHomePageProps } from '@pages/index';
import { useQuery } from '@tanstack/react-query';
import { getHomePageData } from '@utils/core/API';
import {
	AboutSection,
	HeroSection,
	OneProductShowCaseSection,
	LatestSamplesSection
} from './sections';

const HomeScreen = ({ products }: IHomePageProps) => {
	const { data } = useQuery(['home-page-data'], getHomePageData, {
		refetchOnWindowFocus: true
	});

	return (
		<>
			<HeroSection />
			<OneProductShowCaseSection data={data ? data.secondSection : ''} />
			<AboutSection data={data ? data.thirdSection : ''} />
			<LatestSamplesSection
				data={data ? data.forthSection : ''}
				products={products}
			/>
		</>
	);
};

export default HomeScreen;
