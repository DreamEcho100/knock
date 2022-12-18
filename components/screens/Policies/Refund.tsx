import { defaultSiteName3 } from 'next-seo.config';
import Wrapper from './components/Wrapper';

const RefundPolicyScreen = () => {
	return (
		<Wrapper
			header={{
				h1Children: 'refund policy'
			}}
			head={{
				title: `Refund Policy | ${defaultSiteName3}`,
				description: 'Refund Policy'
			}}
		>
			<h2>What&apos;s your return policy?</h2>
			<p>
				<span>
					We don&apos;t offer returns and exchanges, but if there&apos;s
					something wrong with your order, please let us know by contacting us
					at support@pluginsthatknock.com
				</span>
			</p>
		</Wrapper>
	);
};

export default RefundPolicyScreen;
