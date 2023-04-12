import type { GetServerSideProps, NextPage } from 'next';

import ShippingPolicyScreen from '@components/screens/Policies/Shipping';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getShippingPolicy } from '@utils/core/API';

const ShippingPolicyPage: NextPage = () => {
	return <ShippingPolicyScreen />;
};

export default ShippingPolicyPage;

export const getServerSideProps: GetServerSideProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['shipping-policy'], getShippingPolicy);

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	};
};
