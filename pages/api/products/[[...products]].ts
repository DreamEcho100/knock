import nextConnect from '@utils/common/nextConnect';

import productsController from 'server/controllers/products';

const basePath = '/api/products';

const productsAPIRouteHandler = nextConnect({ attachParams: true })
	.get(`${basePath}/product`, productsController.getOneProduct)
	.get(`${basePath}/'`, productsController.getAllProduct);
export default productsAPIRouteHandler;
