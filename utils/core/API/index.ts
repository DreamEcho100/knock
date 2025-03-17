import axios from 'axios';

export const getBanner = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-banner`,
		{
			headers: { 'Content-Type': 'application/json' },
		},
	);

	return response.data.banner;
};

export const getUpSellingPopup = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-upselling-popup`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return response.data;
};

export const getMainSection = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-main-section`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return response.data.main;
};

export const getHomePageData = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-homepage`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return response.data;
};

export const getKnockPageData = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-knockpage`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return response.data;
};

export const getPrivacyPolicy = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-privacy-policy`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return response.data.PrivacyPolicy;
};

export const getRefundPolicy = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-refund-policy`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return response.data.RefundPolicy;
};

export const getShippingPolicy = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-shipping-policy`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return response.data.ShippingPolicy[0];
};

export const getTermsOfService = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-terms-of-service`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return response.data.termsOfService;
};

export const getDTKPageData = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-DTK`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return response.data;
};

export const getFaqPageData = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-FAQ`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return response.data;
};

export const getKnockClipperPageData = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-knockclipperpage`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return response.data;
};

export const getKnockMainSection = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-knock-main-section`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return response.data;
};

export const getKnockClipperMainSection = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-knock-clipper-main-section`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return response.data;
};

export const getPopup = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-popup`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return response.data.popup;
};

const getAppApiPath = () =>
	typeof window === 'undefined'
		? // !!!
			process.env.NEXT_PUBLIC_APP_DOMAINE
			? `https://${process.env.NEXT_PUBLIC_APP_DOMAINE}/api`
			: process.env.NEXT_PUBLIC_BACKEND_ABSOLUTE_PATH
		: process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH;
