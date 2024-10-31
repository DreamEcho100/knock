import { type ICustomNextImageProps } from '~/app/_components/shared/common/CustomNextImage';
import TwoCardContainer from '~/app/_components/shared/core/TwoCardContainer';
import { type HTMLAttributes } from 'react';

const SystemRequirementsSection = ({
	items1,
	items2,
	items1HeaderText,
	items2HeaderText,
	items1ListProps = {},
	items2ListProps = {},
	backgroundImg = {},
	data,
}: {
	items1: {
		id: number;
		li: string;
	}[];
	items2: {
		id: number;
		li: string;
	}[];
	items1HeaderText?: string;
	items2HeaderText?: string;
	items1ListProps?: HTMLAttributes<HTMLUListElement>;
	items2ListProps?: HTMLAttributes<HTMLUListElement>;
	backgroundImg?: Partial<ICustomNextImageProps> | false;
	data: any;
}) => {
	return (
		<section className="bg-primary-1 section-p-x-v1">
			<div className="flex flex-col gap-2 sm:gap-6">
				<header className="p-4 text-primary-2 text-center flex flex-col justify-center items-center gap-4 sm:gap-6">
					<h2 className="text-h4 text-primary-1 uppercase font-semibold">
						{data.h2}
					</h2>
					<p className="text-h5">{data.p}</p>
				</header>

				<TwoCardContainer
					items1={items1}
					items2={items2}
					items1HeaderText={items1HeaderText}
					items2HeaderText={items2HeaderText}
					items1ListProps={items1ListProps}
					items2ListProps={items2ListProps}
					backgroundImg={backgroundImg}
					data={data}
				/>
			</div>
		</section>
	);
};

export default SystemRequirementsSection;
