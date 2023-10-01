import nextConnect from '~/utils/common/nextConnect';

import productsController from 'server/controllers/products';

const basePath = '/api/products';

const productsAPIRouteHandler = nextConnect((router) =>
	router
		.get(`${basePath}/`, productsController.getAllProducts)
		.get(`${basePath}/product`, productsController.getOneProductByHandle),
);

export default productsAPIRouteHandler;
