import {
	type NextApiRequest,
	type NextApiResponse,
	// type NextApiHandler,
} from 'next';

import { createRouter } from 'next-connect';
import { NodeRouter } from 'next-connect/dist/types/node';

type TReq = NextApiRequest & { params: Record<string, any> }; // & IncomingMessage;
type TRes = NextApiResponse; // & ServerResponse;
// type TNext = NextApiHandler; // & ServerResponse;

const onNoMatch = (req: TReq, res: TRes) => {
	res.status(404).end('Page is not found!');
};

interface INextConnectOptions {
	attachParams?: boolean;
	// onError?: typeof onError;
	onNoMatch?: typeof onNoMatch;
}

const nextConnect = (
	cb: (router: NodeRouter<TReq, NextApiResponse>) => void,
) => {
	const router = createRouter<TReq, NextApiResponse>();

	cb(router);

	return router.handler({
		onError: (err, req, res) => {
			console.error('err', err);
			const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
			let statusMessage: string | any[] = res.statusMessage
				? res.statusMessage
				: err instanceof Error
				? err.message
				: String(err);

			if (Array.isArray(statusMessage))
				statusMessage = statusMessage.map((item) => item.message).join(', ');
			if (
				statusMessage.trim().startsWith('[') &&
				statusMessage.trim().endsWith(']')
			)
				statusMessage = JSON.parse(statusMessage)
					.map((item: Record<string, any>) =>
						typeof item === 'string'
							? item
							: typeof item === 'object' && 'message' in item
							? item.message
							: JSON.stringify(item),
					)
					.join(', ');

			if (process.env.NODE_ENV === 'development' && err instanceof Error) {
				console.log('\n');
				console.log('----------------------------------------');
				console.error(`Status code: ${statusCode}`);
				console.error(`Name: ${err.name}`);
				console.error(`Message: ${statusMessage.toString()}`);
				console.error(`Stack: ${err.stack}`);
				console.log('----------------------------------------');
				console.log('\n');
			}

			return res.status(statusCode).json({
				success: false,
				message: statusMessage,
			});
		},
		onNoMatch,
	});
};

// <TReq, NextApiResponse>

export default nextConnect;

/*
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { createRouter } from 'next-connect';

import nc from 'next-connect';

type TReq = NextRequest; // NextApiRequest; // & IncomingMessage;
type TRes = NextResponse; // NextApiResponse; // & ServerResponse;
type TNext = NextApiHandler; // & ServerResponse;

const onError = (err: Error, req: TReq, res: TRes, next: TNext) => {
	console.error('err', err);
	const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
	let statusMessage: string | any[] = res.statusMessage
		? res.statusMessage
		: err instanceof Error
		? err.message
		: err;

	if (Array.isArray(statusMessage))
		statusMessage = statusMessage.map((item) => item.message).join(', ');
	if (
		statusMessage.trim().startsWith('[') &&
		statusMessage.trim().endsWith(']')
	)
		statusMessage = JSON.parse(statusMessage)
			.map((item: Record<string, any>) =>
				typeof item === 'string'
					? item
					: typeof item === 'object' && 'message' in item
					? item.message
					: JSON.stringify(item)
			)
			.join(', ');

	if (process.env.NODE_ENV === 'development') {
		console.log('\n');
		console.log('----------------------------------------');
		console.error(`Status code: ${statusCode}`);
		console.error(`Name: ${err.name}`);
		console.error(`Message: ${statusMessage}`);
		console.error(`Stack: ${err.stack}`);
		console.log('----------------------------------------');
		console.log('\n');
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

const nextConnect = (options: INextConnectOptions) =>
	createRouter({
		onError,
		onNoMatch,
		...options
	});
// <TReq, NextApiResponse>

export default nextConnect;
*/
