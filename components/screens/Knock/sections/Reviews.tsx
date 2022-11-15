import Reviews from '@components/shared/core/Reviews';

const ReviewsSection = ({ reviews }: Parameters<typeof Reviews>['0']) => {
	return (
		<section className='bg-primary-1 section-p-x-v1'>
			<Reviews reviews={reviews} />
		</section>
	);
};

export default ReviewsSection;
