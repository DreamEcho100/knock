import nextConnect from '@utils/common/nextConnect';

import checkoutsController from 'server/controllers/checkouts';

const basePath = '/api/checkouts';

const checkoutsAPIRouteHandler = nextConnect({ attachParams: true })
	.get(`${basePath}/get-one`, checkoutsController.getAll)
	.get(`${basePath}/create-one`, checkoutsController.createOne)
	.post(`${basePath}/associate`, checkoutsController.associateClient)
	.post(`${basePath}/disassociate`, checkoutsController.disassociateClient)
	.post(`${basePath}/products`, checkoutsController.addOne)
	.delete(`${basePath}/products`, checkoutsController.removeOne)
	.put(`${basePath}/products`, checkoutsController.updateOne);
export default checkoutsAPIRouteHandler;
