import { defaultSiteName3 } from '~/utils/core/next-seo.config';
import { getRefundPolicy } from '~/utils/core/API';
import Wrapper from '../components/Wrapper';

export const revalidate = 360;
export const metadata = {
	title: `Refund Policy | ${defaultSiteName3}`,
	description: 'Refund Policy',
};

export default async function RefundPolicyPage() {
	const data = await getRefundPolicy();

	return (
		<Wrapper header={{ h1Children: 'refund policy' }}>
			<h2>{data.h2}</h2>
			<p>
				<span>{data.p}</span>
			</p>
		</Wrapper>
	);
}
