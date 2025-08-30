import Link from 'next/link';
import KnockTrademark from '../KnockTrademark';

interface IProps extends Partial<Parameters<typeof Link>[0]> {
	whatKnocks: string;
}

const Logo = ({ whatKnocks, ...props }: IProps) => {
	return (
		<Link
			{...props}
			href="/"
			className="font-black whitespace-nowrap flex flex-wrap font-decapv16"
		>
			{whatKnocks.split(" ").map((word, i, arr) => {
					if (i === arr.length - 1) {
						return <KnockTrademark tradeMarkPrefix={word} />
					}

					return <>{word}&nbsp;</>
				})}
		</Link>
	);
};

export default Logo;
