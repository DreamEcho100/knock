import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

import nc from 'next-connect';

type TReq = NextApiRequest; // & IncomingMessage;
type TRes = NextApiResponse; // & ServerResponse;
type TNext = NextApiHandler; // & ServerResponse;

const onError = (err: Error, req: TReq, res: TRes, next: TNext) => {
	const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
	const statusMessage = res.statusMessage
		? res.statusMessage
		: err instanceof Error
		? err.message
		: err;

	if (process.env.NODE_ENV === 'development') {
		console.error(`Status code: ${statusCode}`);
		console.error(`Name: ${err.name}`);
		console.error(`Message: ${statusMessage}`);
		console.error(`Stack: ${err.stack}`);
	}

	return res.status(statusCode).json({
		success: false,
		message: statusMessage
	});
};

const onNoMatch = (req: TReq, res: TRes) => {
	res.status(404).end('Page is not found!');
};

interface INextConnectOptions {
	attachParams?: boolean;
	onError?: typeof onError;
	onNoMatch?: typeof onNoMatch;
}

const nextConnect = (
	options: INextConnectOptions = {
		onError,
		onNoMatch
	}
) => nc<TReq, NextApiResponse>(options);

export default nextConnect;
