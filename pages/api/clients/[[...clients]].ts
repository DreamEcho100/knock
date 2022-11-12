import nextConnect from '@utils/common/nextConnect';

import clientsController from 'server/controllers/clients';

const basePath = '/api/clients';

const clientsAPIRouteHandler = nextConnect({ attachParams: true })
	.put(`${basePath}/`, clientsController.updateOne)
	.get(`${basePath}/orders`, clientsController.one.orders.getAll)
	.get(`${basePath}/orders/:orderId`, clientsController.one.orders.getOne)
	.post(`${basePath}/recover-password`, clientsController.recoverPassword)
	.post(`${basePath}/addresses/add-one`, clientsController.address.addOne)
	.put(`${basePath}/addresses/default`, clientsController.address.default)
	.put(`${basePath}/addresses/edit-one`, clientsController.address.editOne)
	.delete(
		`${basePath}/addresses/delete-one`,
		clientsController.address.deleteOne
	);
export default clientsAPIRouteHandler;
