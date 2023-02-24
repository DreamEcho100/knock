import { NextSeo } from 'next-seo';
import { websiteBasePath } from '@utils/core/next-seo.config';
import { useRouter } from 'next/router';

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
	const router = useRouter();
	const canonical =
		typeof _canonical === 'boolean' && !_canonical
			? undefined
			: typeof _canonical === 'string'
			? _canonical
			: (() => {
					let pathname = router.pathname;

					Object.entries(router.query).forEach((item) => {
						const key = item[0];
						const value = item[1];
						if (typeof value === 'string')
							pathname = pathname.replace(`[${key}]`, value);
					});

					return `${websiteBasePath}${pathname}`;
			  })();

	return (
		<NextSeo
			title={pageTitle}
			description={pageDescription}
			canonical={canonical}
			twitter={{ handle: pageTitle }}
			openGraph={{ title: pageTitle, description: pageDescription }}
			{...props}
		/>
	);
};

export default CustomNextSeo;
