import { getTermsOfService } from '~/utils/core/API';
import Wrapper from '../components/Wrapper';
import { Fragment } from 'react';

export const revalidate = 360;
export const metadata = {
	title: 'Terms Of Service',
	description: 'Our Terms Of Service',
};

export default async function TermsOfServicePage() {
	const data = await getTermsOfService();

	return (
		<Wrapper
			header={{
				h1Children: 'Terms Of Service',
			}}
		>
			{data?.map((item: any) => (
				<Fragment key={item.id}>
					{item.id === 1 ? ' ' : <br />}
					<div className="flex gap-2">
						<strong>{item.h3} </strong>
					</div>

					{item.p.map((el: any) => (
						<Fragment key={el.id}>
							{el.id === 2 || el.id === 3 || el.id === 4 || el.id === 5 ? (
								<br />
							) : (
								''
							)}
							{el.text}
							<br />
						</Fragment>
					))}
				</Fragment>
			))}
		</Wrapper>
	);
}
