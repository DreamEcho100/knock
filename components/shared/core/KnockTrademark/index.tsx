import { cx } from 'class-variance-authority';

const KnockTrademark = ({h2}:{h2?:string}) => {
	return (
		<span className='flex w-fit relative'>
		 	 {h2 || 'KNOCK'}
			<sup
				className={cx(
					'right-0 ml-[-0.25ch] translate-x-1/4',
					'rtl:right-auto rtl:ml-0',
					'rtl:left-0 rtl:mr-[-0.25ch] rtl:-translate-x-1/4'
				)}
			>
				&reg;
			</sup>
		</span>
	);
};

export default KnockTrademark;
