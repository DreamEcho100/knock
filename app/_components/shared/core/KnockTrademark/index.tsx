import { cx } from 'class-variance-authority';

export default function KnockTrademark({ tradeMarkPrefix: tradeMark }: { tradeMarkPrefix?: string }) {
	return (
		<span className="flex w-fit relative">
			{tradeMark ?? 'KNOCK'}
			<sup
				className={cx(
					'right-0 ml-[-0.25ch] translate-x-1/4',
					'rtl:right-auto rtl:ml-0',
					'rtl:left-0 rtl:mr-[-0.25ch] rtl:-translate-x-1/4',
				)}
			>
				&reg;
			</sup>
		</span>
	);
}
