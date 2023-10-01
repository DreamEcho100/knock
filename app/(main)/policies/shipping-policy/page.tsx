import { defaultSiteName3 } from '~/utils/core/next-seo.config';
import { getShippingPolicy } from '~/utils/core/API';
import Wrapper from '../components/Wrapper';
import { type CSSProperties } from 'react';

export const revalidate = 360;
export const metadata = {
	title: `Shipping Policy | ${defaultSiteName3}`,
	description:
		'This Shipping Policy describes is for the Digital Products and the Physical Products',
};

export default async function ShippingPolicyPage() {
	const data = await getShippingPolicy();

	return (
		<Wrapper
			header={{
				h1Children: 'Shipping Policy',
			}}
			sectionProps={{
				style: {
					'--ul-li-style': 'url(/svgs/gray-circle.svg)',
				} as CSSProperties,
			}}
		>
			<h2>{data.h2}</h2>
			<p>{data.p}</p>
			<h2>{data.h2s}</h2>
			<p>{data.p2}</p>
			<ul>
				{data.ul.map((el: { id: any; li: string }) => (
					<div
						key={el.id}
						className="grid items-center	"
						style={{ gridTemplateColumns: '5fr .5fr' }}
					>
						<li key={el.id}>{el.li}</li>
					</div>
				))}
			</ul>
		</Wrapper>
	);
}
