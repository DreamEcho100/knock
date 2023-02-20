import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<meta charSet='UTF-8' />
				<link rel='preload' href='/svg/bbblurry.svg' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700;900&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<body
				className='dark'
				style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
