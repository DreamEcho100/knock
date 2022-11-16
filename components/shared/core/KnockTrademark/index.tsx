import CustomNextImage from '@components/shared/common/CustomNextImage';
import { cx } from 'class-variance-authority';

const KnockTrademark = () => {
	return (
		<span className='flex w-fit relative'>
			KNOCK
			<sup
				className={cx(
					'right-0 ml-[-0.25ch] translate-x-1/4',
					'rtl:right-auto rtl:ml-0',
					'rtl:left-0 rtl:mr-[-0.25ch] rtl:-translate-x-1/4'
				)}
			>
				<CustomNextImage
					src='/images/Trademark Artboard 1 copy 3.png'
					width={10}
					height={10}
					priority
					alt='KNOCK logo'
					className='aspect-square w-2 h-2 object-contain'
				/>
			</sup>
		</span>
	);
};

export default KnockTrademark;
