import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

import gql from 'graphql-tag';

import { print } from 'graphql';

const deleteAddress = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = req.body;

	const customer = gql`
		mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
			customerAddressDelete(
				customerAccessToken: $customerAccessToken
				id: $id
			) {
				customerUserErrors {
					code
					field
					message
				}
				deletedCustomerAddressId
			}
		}
	`;
	const response = await axios.post(
		'https://pluginsthatknock.com/api/2022-10/graphql.json',
		{
			query: print(customer),
			variables: {
				customerAccessToken: data.customerAccessToken,
				id: data.addressId
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN
			}
		}
	);

	if (response.data.errors) {
		if (response.data.errors[0].extensions.code === 'ACCESS_DENIED') {
			throw new Error('Access denied verify your api key');
		}
		throw new Error('Customer address not found');
	}

	if (!response.data.data.customerAddressDelete.deletedCustomerAddressId) {
		throw new Error('Customer address not found');
	}

	return res.status(200).json({
		success: true,
		message: 'Customer address delete successfully'
	});
};

const addAddress = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = req.body;

	if (!data.address.address1) {
		throw new Error('Please enter an address');
	}
	if (!data.address.city) {
		throw new Error('Please enter an city');
	}
	if (!data.address.country) {
		throw new Error('Please enter an country');
	}
	if (!data.address.province) {
		throw new Error('Please enter an province');
	}
	if (!data.address.zip) {
		throw new Error('Please enter an zip');
	}
	if (!data.address.phone) {
		throw new Error('Please enter an phone');
	}

	const customer = gql`
		mutation customerAddressCreate(
			$address: MailingAddressInput!
			$customerAccessToken: String!
		) {
			customerAddressCreate(
				address: $address
				customerAccessToken: $customerAccessToken
			) {
				customerAddress {
					id
					address1
					address2
					city
					company
					firstName
					lastName
					phone
					province
					zip
				}
				customerUserErrors {
					code
					field
					message
				}
			}
		}
	`;
	const response = await axios.post(
		'https://pluginsthatknock.com/api/2022-10/graphql.json',
		{
			query: print(customer),
			variables: {
				address: {
					address1: data.address.address1,
					address2: data.address.address2,
					city: data.address.city,
					company: data.address.company,
					country: data.address.country,
					firstName: data.address.firstName,
					lastName: data.address.lastName,
					phone: data.address.phone,
					province: data.address.province,
					zip: data.address.zip
				},
				customerAccessToken: data.customerAccessToken
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN
			}
		}
	);

	if (!response.data.data.customerAddressCreate) {
		throw new Error('Access token is not valid');
	}

	if (response.data.data.customerAddressCreate.customerAddress) {
		return res.status(200).json({
			success: true,
			message: 'Address added successfully'
		});
	} else {
		throw new Error(
			response.data.data.customerAddressCreate.customerUserErrors[0].message
		);
	}
};

const defaultAddress = async (req: NextApiRequest, res: NextApiResponse) => {
	const { addressId, customerAccessToken } = req.body;

	const customer = gql`
		mutation customerDefaultAddressUpdate(
			$addressId: ID!
			$customerAccessToken: String!
		) {
			customerDefaultAddressUpdate(
				addressId: $addressId
				customerAccessToken: $customerAccessToken
			) {
				customer {
					id
					firstName
					lastName
				}
				customerUserErrors {
					code
					field
					message
				}
			}
		}
	`;

	const response = await axios.post(
		'https://pluginsthatknock.com/api/2022-10/graphql.json',
		{
			query: print(customer),
			variables: {
				addressId,
				customerAccessToken
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN
			}
		}
	);

	if (response.data.errors) {
		if (response.data.errors[0].extensions.code === 'ACCESS_DENIED') {
			throw new Error('Access denied verify your api key');
		}
		throw new Error('Customer address not found');
	}

	if (!response.data.data.customerDefaultAddressUpdate.customer) {
		throw new Error('Customer address not found');
	}

	return res.status(200).json({
		success: true,
		message: 'Customer address is now setted up default successfully'
	});
};

const editAddress = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = req.body;

	const customer = gql`
		mutation customerAddressUpdate(
			$address: MailingAddressInput!
			$customerAccessToken: String!
			$id: ID!
		) {
			customerAddressUpdate(
				address: $address
				customerAccessToken: $customerAccessToken
				id: $id
			) {
				customerAddress {
					id
					address1
					address2
					city
					company
					firstName
					lastName
					phone
					province
					zip
				}
				customerUserErrors {
					code
					field
					message
				}
			}
		}
	`;

	const response = await axios.post(
		'https://pluginsthatknock.com/api/2022-10/graphql.json',
		{
			query: print(customer),
			variables: {
				address: {
					address1: data.address.address1,
					address2: data.address.address2,
					city: data.address.city,
					company: data.address.company,
					country: data.address.country,
					firstName: data.address.firstName,
					lastName: data.address.lastName,
					phone: data.address.phone,
					province: data.address.province,
					zip: data.address.zip
				},
				customerAccessToken: data.customerAccessToken,
				id: data.id
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN
			}
		}
	);

	if (response.data.errors) {
		if (response.data.errors[0].extensions.code === 'ACCESS_DENIED') {
			throw new Error('Access denied verify your api key');
		}

		throw new Error('Address not found');
	}

	if (!response.data.data.customerAddressUpdate.customerAddress) {
		throw new Error(
			response.data.data.customerAddressUpdate.customerUserErrors[0].message
		);
	}

	return res.status(200).json({
		success: true,
		message: 'Address edited successfully'
	});
};

const recoverPassword = async (req: NextApiRequest, res: NextApiResponse) => {
	const { email } = req.body;

	const customer = gql`
		mutation customerRecover($email: String!) {
			customerRecover(email: $email) {
				customerUserErrors {
					code
					field
					message
				}
			}
		}
	`;
	const response = await axios.post(
		'https://pluginsthatknock.com/api/2022-10/graphql.json',
		{
			query: print(customer),
			variables: {
				email
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN
			}
		}
	);
};

const clientsController = {
	address: {
		deleteOne: deleteAddress,
		addOne: addAddress,
		default: defaultAddress,
		editOne: editAddress
	},
	recoverPassword
};

export default clientsController;
