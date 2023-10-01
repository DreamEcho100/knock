'use client';
import { NextSeo } from 'next-seo';

const CustomNextSeo = ({
	pageTitle,
	pageDescription,
	canonical: _canonical,
	...props
}: Omit<Parameters<typeof NextSeo>[0], 'canonical'> & {
	pageTitle?: string;
	pageDescription?: string;
	canonical?: string | false;
}) => {
	return (
		<NextSeo
			title={pageTitle}
			description={pageDescription}
			twitter={{ handle: pageTitle }}
			openGraph={{ title: pageTitle, description: pageDescription }}
			{...props}
		/>
	);
};

export default CustomNextSeo;
