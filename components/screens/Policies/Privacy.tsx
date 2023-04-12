import { useQuery } from '@tanstack/react-query';
import { getPrivacyPolicy } from '@utils/core/API';
import { type CSSProperties } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Wrapper from './components/Wrapper';

const PrivatePoliciesScreen = () => {
	const { data } = useQuery(['privacy-page'], getPrivacyPolicy, {
		refetchOnWindowFocus: true
	});
	return (
		<Wrapper
			sectionProps={{
				style: {
					'--ul-li-style': 'url(/svgs/gray-circle.svg)'
				} as CSSProperties
			}}
			header={{
				pChildren: (
					<>
						{data ? (
							<>
								{data.head}
								<br />
								{data.head2}
							</>
						) : (
							<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
								<Skeleton
									count={1}
									height={60}
									className={` z-10 fixed mt-5 h-14 right-0 left-0 w-full flex items-center justify-center`}
								/>
							</SkeletonTheme>
						)}
					</>
				),
				h1Children: 'Privacy policy'
			}}
			head={{
				title: 'Privacy Policy',
				description:
					"This Privacy Policy describes how (the 'Site' or 'we') \n collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site."
			}}
		>
			{data ? (
				<h2>{data.collecting[0].h2}</h2>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={60}
						className={` z-10 fixed mt-5  h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
			{data ? (
				<p>{data.collecting[0].p}</p>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={60}
						className={` z-10 fixed mt-5  h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
			{data ? (
				<p>
					<u>{data.collecting[0].u}</u>
				</p>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={60}
						className={` z-10 fixed  mt-5 h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
			{data ? (
				<ul>
					{data.collecting[0].li.map((el: any) => (
						<li key={el.id}>
							<strong>{el.strong}</strong>
							{el.text}
						</li>
					))}
				</ul>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={3}
						height={60}
						className={` z-10 fixed mt-5  h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
			{data ? (
				<p>
					<u>{data.collecting[0].u2}</u>
				</p>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={60}
						className={` z-10 fixed mt-5 h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}

			{data ? (
				<ul>
					{data.collecting[0].li2.map((el: any) => (
						<li key={el.id}>
							<strong>{el.strong}</strong>
							<span>&nbsp;</span>
							{el.text}
						</li>
					))}
				</ul>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={60}
						className={` z-10 fixed mt-5 h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
			<p>&nbsp;</p>
			{data ? (
				<>
					<h3>{data.minors[0].h3}</h3>
					<p>{data.minors[0].p}</p>
					<h2>{data.sharing[0].h2}</h2>
					<p>{data.sharing[0].p}</p>
				</>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={3}
						height={60}
						className={` z-10 fixed mt-5  h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
			{data ? (
				<ul>
					{data.sharing[0].ul.map((el: any) => (
						<li key={el.id}>
							{el.li}
							<span>&nbsp;</span>
							<a rel='noreferrer noopener' href={el.a} target='_blank'>
								{el.a}
							</a>
						</li>
					))}
				</ul>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={60}
						className={` z-10 fixed  mt-5 h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
			{data ? (
				<>
					<h3>{data.behavioural[0].h3}</h3>
					<p>{data.behavioural[0].p[0].text}</p>
				</>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={60}
						className={` z-10 fixed mt-5  h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
			{data ? (
				<ul>
					{data.behavioural[0].ul.map((el: any) => (
						<li key={el.id}>
							{el.li || ''}
							<span>&nbsp;</span>
							{el.a ? (
								<a rel='noreferrer noopener' href={el.a} target='_blank'>
									{el.a}
								</a>
							) : (
								''
							)}
						</li>
					))}
				</ul>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={60}
						className={` z-10 fixed  mt-5 h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
			{data ? (
				<p>
					{data.behavioural[0].p[1].text}
					<span>&nbsp;</span>
					<a
						rel='noreferrer noopener'
						href={data.behavioural[0].p[1].a}
						target='_blank'
					>
						{data.behavioural[0].p[1].a}{' '}
					</a>
				</p>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={60}
						className={` z-10 fixed mt-5 h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
			{data ? (
				<>
					<p>{data.behavioural[0].p2}</p>
					<ul>
						{data.behavioural[0].ul2.map((el: any) => (
							<li key={el.id}>
								<em>
									{el.em} -<span>&nbsp;</span>
								</em>
								<a rel='noreferrer noopener' href={el.li} target='_blank'>
									{el.li}
								</a>
							</li>
						))}
					</ul>
					<p>
						{data.behavioural[0].p[2].text}
						<span>&nbsp;</span>
						<a
							rel='noreferrer noopener'
							href={data.behavioural[0].p[2].a}
							target='_blank'
						>
							{data.behavioural[0].p[2].a}{' '}
						</a>
					</p>
					<h2>{data.personal[0].h2}</h2>
					<p>{data.personal[0].p}</p>
					<p>&nbsp;</p>
					<h3>{data.lawfulBasis[0].h3}</h3>
					<p>{data.lawfulBasis[0].p}</p>
					<ul>
						{data.lawfulBasis[0].ul.map((el: any) => (
							<li key={el.id}>{el.li}</li>
						))}
					</ul>

					<h3>{data.retention[0].h3}</h3>
					<p>{data.retention[0].p}</p>
					<h3>{data.automatic[0].h3}</h3>
					{data.automatic[0].p.map((el: any) => (
						<p key={el.id}>{el.text}</p>
					))}
					<ul>
						{data.automatic[0].ul.map((el: any) => (
							<li key={el.id}>{el.text}</li>
						))}
					</ul>
					<h2>{data.yourRights[0].h2}</h2>
					<h3>{data.yourRights[0].h3}</h3>
					{data.yourRights[0].p.map((el: any) => (
						<p key={el.id}>
							{el.text}
							<span>&nbsp;</span>
							{el.em ? <em>[{el.em}].</em> : ''}
							{el.a ? (
								<a rel='noreferrer noopener' href={el.a} target='_blank'>
									{el.a}
								</a>
							) : (
								''
							)}
						</p>
					))}
					<p>
						<br />
					</p>
					<h3>{data.ccpa[0].h3}</h3>
					{data.ccpa[0].p.map((el: any) => (
						<p key={el.id}>{el.text}</p>
					))}
					<h2>{data.cookies[0].h2}</h2>
					{data.cookies[0].p.map((el: any) => (
						<p key={el.id}>{el.text}</p>
					))}
					<h3>{data.necessary[0].h3}</h3>
					<table>
						<thead>
							<tr>
								<th>
									<strong>{data.necessary[0].table[0].strong}</strong>
								</th>
								<th>
									<strong>{data.necessary[0].table[0].strong2}</strong>
								</th>
							</tr>
						</thead>

						<tbody>
							{data.necessary[0].table
								.filter((el: { id: number }) => el.id !== 1)
								.map((el: any) => (
									<tr key={el.id}>
										<td>
											<em>{el.em}</em>
										</td>
										<td>{el.td}</td>
									</tr>
								))}
						</tbody>
					</table>
					<h3>{data.analytics[0].h3}</h3>
					<table>
						<tbody>
							<tr>
								<th>
									<strong>{data.analytics[0].table[0].strong}</strong>
								</th>
								<th>
									<strong>{data.analytics[0].table[0].strong2}</strong>
								</th>
							</tr>
							{data.analytics[0].table
								.filter((el: { id: number }) => el.id !== 1)
								.map((el: any) => (
									<tr key={el.id}>
										<td>
											<em>{el.em}</em>
										</td>
										<td>{el.td}</td>
									</tr>
								))}
						</tbody>
					</table>
					<p>
						<em>[{data.analytics[0].em}]</em>
					</p>
					{data.analytics[0].p.map((el: any) => (
						<p key={el.id}>
							{el.p}
							<span>&nbsp;</span>
							{el.a ? (
								<a rel='noreferrer noopener' href={el.a} target='_blank'>
									www.allaboutcookies.org
								</a>
							) : (
								''
							)}
						</p>
					))}
					<h3>{data.doNotTrack[0].h3}</h3>
					<p>{data.doNotTrack[0].p}</p>
					<h2>{data.changes[0].h2}</h2>
					<p>{data.changes[0].p}</p>
					<h2>{data.contact[0].h2}</h2>
					{data.contact[0].p.map((el: any) => (
						<p key={el.id}>{el.text}</p>
					))}
					<em>{data.contact[0].em}</em>

					<span></span>
					{data.contact[0].p2.map((el: any) => (
						<p key={el.id}>
							{el.text}
							<span>&nbsp;</span>
							<em>[{el.em}</em>
							<span>&nbsp;</span>
							<a rel='noreferrer noopener' href={el.a} target='_blank'>
								{el.a}
							</a>
							<em>]</em>
						</p>
					))}
				</>
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={1}
						height={60}
						className={` z-10 fixed mt-5 h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
		</Wrapper>
	);
};

export default PrivatePoliciesScreen;
