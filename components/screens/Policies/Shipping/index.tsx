import Wrapper from '../components/Wrapper';

const ShippingPolicyScreen = () => {
	return (
		<Wrapper
			header={{
				h1Children: 'shipping policy'
			}}
		>
			<h2>Digital Products</h2>
			<p>
				You will be emailed a link to download the product you purchased after
				you complete checkout.
			</p>

			<h2>Physical Products</h2>
			<p>
				Usually, it takes 3-7 days to fulfill an order, after which it&apos;s
				shipped out. The shipping time depends on your location, but can be
				estimated as follows:
			</p>
			<ul>
				<li>USA: 3-4 business days</li>
				<li>Europe: 6-8 business days</li>
				<li>Australia: 2-14 business days</li>
				<li>Japan: 4-8 business days</li>
				<li>International: 10-20 business days</li>
				<li>
					Our fulfillment times may be longer than usual and may continue to
					increase until things get back to normal. We&apos;re seeing delays in
					our supply chain, including distributors and shipping carriers as the
					entire industry is grappling with challenges.
				</li>
			</ul>
		</Wrapper>
	);
};

export default ShippingPolicyScreen;
