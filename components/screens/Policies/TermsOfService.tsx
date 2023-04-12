import { useQuery } from '@tanstack/react-query';
import { getTermsOfService } from '@utils/core/API';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Wrapper from './components/Wrapper';
import { Fragment } from 'react';

const TermsOfServiceScreen = () => {
	const { data } = useQuery(['terms'], getTermsOfService, {
		refetchOnWindowFocus: true
	});
	return (
		<Wrapper
			header={{
				h1Children: 'Terms Of Service'
			}}
			head={{
				title: 'Terms Of Service',
				description: 'Our Terms Of Service'
			}}
		>
			{data ? (
				data?.map((item: any) => (
					<Fragment key={item.id}>
						{item.id === 1 ? ' ' : <br />}
						<div className='flex gap-2'>
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
				))
			) : (
				<SkeletonTheme baseColor='#000' highlightColor='#7d7b78'>
					<Skeleton
						count={5}
						height={60}
						className={`z-10 fixed mt-5 h-14 right-0 left-0 w-full flex items-center justify-center`}
					/>
				</SkeletonTheme>
			)}
		</Wrapper>
	);
};

export default TermsOfServiceScreen;
