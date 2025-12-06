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
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-upselling-popup`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	const data = await response.json();

	return data;
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
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-homepage`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				timeout: 20000,
			},
		);

		return response.data;
	} catch (error) {
		console.error('Error fetching home page data:', error);
		return null;
	}
};

export const getKnockPageData = async () => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-knockpage`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				timeout: 20000,
			},
		);

		return response.data;
	} catch (error) {
		console.error('Error fetching knock page data:', error);
		return null;
	}
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
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-DTK`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				timeout: 20000,
			},
		);

		return response.data;
	} catch (error) {
		console.error('Error fetching DTK page data:', error);
		return null;
	}
};

export const getFaqPageData = async () => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-FAQ`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				timeout: 20000,
			},
		);

		return response.data;
	} catch (error) {
		console.error('Error fetching FAQ page data:', error);
		return null;
	}
};

export const getKnockClipperPageData = async () => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-knockclipperpage`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				timeout: 20000,
			},
		);

		return response.data;
	} catch (error) {
		console.error('Error fetching knock clipper page data:', error);
		return null;
	}
};

export const getKnockMainSection = async () => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-knock-main-section`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				timeout: 20000,
			},
		);

		return response.data;
	} catch (error) {
		console.error('Error fetching knock main section data:', error);
		return null;
	}
};

export const getKnockClipperMainSection = async () => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-knock-clipper-main-section`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				timeout: 20000,
			},
		);

		return response.data;
	} catch (error) {
		console.error('Error fetching knock clipper main section data:', error);
		return null;
	}
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
