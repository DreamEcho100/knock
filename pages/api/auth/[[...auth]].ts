import nextConnect from '@utils/common/nextConnect';

import authController from 'server/controllers/auth';

const basePath = '/api/auth';

const usersAPIRouteHandler = nextConnect({
	attachParams: true
})
	.get(`${basePath}/check-token`, authController.checkToken)
	.get(`${basePath}/logout`, authController.logout)
	.post(`${basePath}/activate`, authController.activate)
	.post(`${basePath}/login`, authController.login)
	.post(`${basePath}/register`, authController.register);
export default usersAPIRouteHandler;
