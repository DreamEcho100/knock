import nextConnect from '@utils/common/nextConnect';

import productsController from 'server/controllers/products';

const basePath = '/api/products';

const productsAPIRouteHandler = nextConnect({ attachParams: true })
	.get(`${basePath}/`, productsController.getAllProducts)
	.get(`${basePath}/product`, productsController.getOneProduct);

export default productsAPIRouteHandler;
