import Link from 'next/link';
import KnockTrademark from '../KnockTrademark';

const Logo = () => {
	return (
		<Link
			href='/'
			className='font-black whitespace-nowrap flex flex-wrap'
			style={{ fontFamily: "'decap_v1regular', sans-serif" }}
		>
			PLUGINS THAT&nbsp;
			<KnockTrademark />
		</Link>
	);
};

export default Logo;
