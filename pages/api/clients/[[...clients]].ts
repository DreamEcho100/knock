import nextConnect from '@utils/common/nextConnect';

import clientsController from 'server/controllers/clients';

const basePath = '/api/clients';

const clientsAPIRouteHandler = nextConnect({ attachParams: true })
	.post(`${basePath}/addresses/add-one`, clientsController.address.addOne)
	.put(`${basePath}/addresses/default`, clientsController.address.default)
	.put(`${basePath}/addresses/edit-one`, clientsController.address.editOne)
	.delete(
		`${basePath}/addresses/delete-one`,
		clientsController.address.deleteOne
	)
	.post(`${basePath}/recover-password`, clientsController.recoverPassword);
export default clientsAPIRouteHandler;
