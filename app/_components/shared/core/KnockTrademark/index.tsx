import { cx } from 'class-variance-authority';

export default function KnockTrademark({
	tradeMarkPrefix: tradeMark,
}: {
	tradeMarkPrefix?: string;
}) {
	return (
		<span className="w-fit relative">
			{tradeMark ?? 'KNOCK'}
			<sup>&reg;</sup>
		</span>
	);
}
