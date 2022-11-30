import Link from 'next/link';
import KnockTrademark from '../KnockTrademark';

interface IProps extends Partial<Parameters<typeof Link>[0]> {
	whatKnocks?: string;
}

const Logo = ({ whatKnocks = 'PLUGINS THAT', ...props }: IProps) => {
	return (
		<Link
			{...props}
			href='/'
			className='font-black whitespace-nowrap flex flex-wrap'
			style={{ fontFamily: "'decap_v1regular', sans-serif" }}
		>
			{whatKnocks}&nbsp;
			<KnockTrademark />
		</Link>
	);
};

export default Logo;
