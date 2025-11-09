import type { CSSProperties } from 'react';
import Reviews from '~/app/_components/shared/core/Reviews';

export default function ReviewsSection({
	reviews,
}: Parameters<typeof Reviews>['0']) {
	return (
		<section
			className="bg-primary-1 section-p-v1"
			style={{ '--pt-multi': 0.5, '--pb-multi': 0.2 } as CSSProperties}
		>
			<Reviews reviews={reviews} />
		</section>
	);
}
