import type { GetServerSideProps, NextPage } from 'next';

import TermsOfServiceScreen from '@components/screens/Policies/TermsOfService';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getTermsOfService } from '@utils/core/API';

const TermsOfServicePage: NextPage = () => {
	return <TermsOfServiceScreen />;
};

export default TermsOfServicePage;


export const getServerSideProps: GetServerSideProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['terms'], getTermsOfService);

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	};
};