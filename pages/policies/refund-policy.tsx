import type { GetServerSideProps, NextPage } from 'next';

import RefundPolicyScreen from '@components/screens/Policies/Refund';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getRefundPolicy } from '@utils/core/API';

const RefundPolicyPage: NextPage = () => {
	return <RefundPolicyScreen />;
};

export default RefundPolicyPage;

export const getServerSideProps: GetServerSideProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['refund-policy'], getRefundPolicy);

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	};
};
