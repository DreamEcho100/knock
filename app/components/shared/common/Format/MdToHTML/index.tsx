import Link from 'next/link';
import { type FC } from 'react';
import ReactMarkdown, { type Options } from 'react-markdown';

import CustomNextImage from '~/app/components/shared/common/CustomNextImage';

interface Props {
	content: string;
}

type TCustomComponents = Options['components'];

const MdToHTMLFormatter: FC<Props> = ({ content }) => {
	const customComponents: TCustomComponents = {
		img(image) {
			if (!image.src || !image.alt) return <></>;

			return (
				<CustomNextImage
					// src={imagesWeservNlLoader({
					// 	url: image.src,
					// 	w: 800,
					// })}
					src={image.src}
					alt={image.alt}
					width={800}
					height={500}
				/>
			);
		},

		a({ href, children }) {
			if (!href) return <></>;

			if (href.startsWith('/') || href.startsWith('https://lognmaze.com')) {
				return (
					<Link
						href={href}
						prefetch={false}
						// className={helpersClasses.textGlowSpecial}
					>
						{children}
					</Link>
				);
			}

			return (
				<a
					// className={helpersClasses.textGlowSpecial}
					href={href}
					target="_blank"
					rel="noopener noreferrer"
				>
					{children}
				</a>
			);
		},
	};

	return <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>;
};

export default MdToHTMLFormatter;
