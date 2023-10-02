import { type PropsWithChildren } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBanner } from '~/utils/core/API';
import { commonClasses } from '..';
import { useSharedCustomerState } from '~/app/components/providers/CustomerContext';

export default function MainContent(props: PropsWithChildren) {
	const [
		{
			isVisible: { banner: isBannerVisible },
		},
	] = useSharedCustomerState();
	const banner = useQuery(['banner-data'], getBanner, {
		refetchOnWindowFocus: true,
	});

	return (
		<main
			className={`${commonClasses} relative bg-primary-2 ${
				banner.data?.disable
					? 'mt-[40px]'
					: `${isBannerVisible ? 'mt-[100px]' : 'mt-[5px]'}`
			}  w-full flex flex-col`}
		>
			{props.children}
		</main>
	);
}
