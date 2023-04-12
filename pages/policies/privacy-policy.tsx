import type { GetServerSideProps, NextPage } from 'next';

import PrivacyPolicyScreen from '@components/screens/Policies/Privacy';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getPrivacyPolicy } from '@utils/core/API';

const PrivacyPolicyPage: NextPage = () => {
	return <PrivacyPolicyScreen />;
};

export default PrivacyPolicyPage;

export const getServerSideProps: GetServerSideProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['privacy-page'], getPrivacyPolicy);

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	};
};
