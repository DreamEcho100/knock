import type { CSSProperties } from 'react';
import Reviews from '@components/shared/core/Reviews';

const ReviewsSection = ({ reviews }: Parameters<typeof Reviews>['0']) => {
	return (
		<section
			className='bg-primary-1 section-p-v1'
			style={{ '--pt-multi': 0.5, '--pb-multi': 0.2 } as CSSProperties}
		>
			<Reviews reviews={reviews} />
		</section>
	);
};

export default ReviewsSection;
