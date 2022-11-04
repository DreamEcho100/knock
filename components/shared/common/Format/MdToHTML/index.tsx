import Link from 'next/link';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Options } from 'react-markdown/lib/ast-to-react';

// import helpersClasses from '@styles/helpers.module.css'
import CustomNextImage from '@components/shared/common/CustomNextImage';

// import { imagesWeservNlLoader } from '@commonLibIndependent/image'

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
					target='_blank'
					rel='noopener noreferrer'
				>
					{children}
				</a>
			);
		}
	};

	return <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>;
};

export default MdToHTMLFormatter;
