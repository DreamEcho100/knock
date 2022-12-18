import { getIdFromGid } from '@utils/core/shopify';

import type { GetServerSideProps } from 'next';

import { getAllProducts } from 'server/controllers/products';

//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = `https://${process.env.REDEEM_DOMAIN}`;

function generateSiteMap({
	products,
	staticPaths
}: {
	products: Awaited<ReturnType<typeof getAllProducts>>;
	staticPaths: string[];
}) {
	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
     </url>
     ${staticPaths
				.map((item) => {
					return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${item}`}</loc>
       </url>
     `;
				})
				.join('')}
				${products
					.map(({ id }) => {
						return `
					<url>
							<loc>${`${EXTERNAL_DATA_URL}/products/${getIdFromGid(id)}`}</loc>
					</url>
				`;
					})
					.join('')}
   </urlset>
 `;
}

function SiteMap() {
	// getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	// We make an API call to gather the URLs for our site
	const products = await getAllProducts({
		typesToExclude: ['Sound Editing Software']
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
		'policies/terms-of-service'
	];

	// We generate the XML sitemap with the products data
	const sitemap = generateSiteMap({ products, staticPaths });

	res.setHeader('Content-Type', 'text/xml');
	// we send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: {}
	};
};

export default SiteMap;
// d----          11/15/2022  8:09 AM                policies
// d----          11/10/2022 11:18 PM                products
// d----           12/8/2022  6:37 PM                boutique
