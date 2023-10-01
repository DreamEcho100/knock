import { getAllProducts } from '~/server/controllers/products';

import { type MetadataRoute } from 'next';

const EXTERNAL_DATA_URL = `https://${process.env.REDEEM_DOMAIN}`;

type Sitemap = {
	url: string;
	lastModified?: string | Date;
	changeFrequency?:
		| 'always'
		| 'hourly'
		| 'daily'
		| 'weekly'
		| 'monthly'
		| 'yearly'
		| 'never';
	priority?: number;
}[];

function generateSitemap({
	products,
	staticPaths,
}: {
	products: Awaited<ReturnType<typeof getAllProducts>>;
	staticPaths: string[];
}) {
	const sitemap: Sitemap = [];

	sitemap.push({
		url: EXTERNAL_DATA_URL,
		lastModified: new Date(),
		changeFrequency: 'yearly',
		priority: 1,
	});

	staticPaths.forEach((item) => {
		sitemap.push({
			url: `${EXTERNAL_DATA_URL}/${item}`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		});
	});

	products.map((item) => {
		return sitemap.push({
			url: `${EXTERNAL_DATA_URL}/products/${item.handle}`,
			lastModified: new Date(item.updatedAt),
			changeFrequency: 'weekly',
			priority: 1,
		});
	});

	return sitemap;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const products = await getAllProducts({
		typesToExclude: ['Sound Editing Software'],
	});

	const staticPaths = [
		'contact-us',
		'drums-that-knock',
		'faqs',
		'knock-clipper',
		'knock',
		'policies/privacy-policy',
		'policies/refund-policy',
		'policies/shipping-policy',
		'policies/terms-of-service',
	];

	const sitemap = generateSitemap({ products, staticPaths });

	return sitemap;
}
