import nextConnect from '@utils/common/nextConnect';

import checkoutsController from 'server/controllers/checkouts';

const basePath = '/api/checkouts';

const checkoutsAPIRouteHandler = nextConnect({ attachParams: true })
	.get(`${basePath}/get-one`, checkoutsController.getAll)
	.get(`${basePath}/create`, checkoutsController.createOne)
	.post(`${basePath}/add-one`, checkoutsController.addOne)
	.delete(`${basePath}/delete-one`, checkoutsController.removeOne)
	.put(`${basePath}/update-one`, checkoutsController.updateOne);
export default checkoutsAPIRouteHandler;
