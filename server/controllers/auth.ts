import type { NextApiRequest, NextApiResponse } from 'next';

import validator from 'validator';

import axios from 'axios';

import gql from 'graphql-tag';

import { print } from 'graphql';

import API_URL from './apiUrl';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = req.body;

	const customer = gql`
		mutation customerAccessTokenCreate(
			$input: CustomerAccessTokenCreateInput!
		) {
			customerAccessTokenCreate(input: $input) {
				customerUserErrors {
					code
					field
					message
				}
				customerAccessToken {
					accessToken
					expiresAt
				}
			}
		}
	`;

	const response = await axios.post(
		API_URL,
		{
			query: print(customer),
			variables: {
				input: {
					email: data.email,
					password: data.password
				}
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

	if (!response.data.data.customerAccessTokenCreate.customerAccessToken) {
		res.statusCode = 404;
		throw new Error('Please check your email and password');
	}

	return res.status(200).json({
		success: true,
		message: 'Connected successfully!',
		user: response.data.data.customerAccessTokenCreate.customerAccessToken
	});
};

const activate = async (req: NextApiRequest, res: NextApiResponse) => {
	const { id, activationToken, password } = req.body;

	const customer = gql`
		mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
			customerActivate(id: $id, input: $input) {
				customerUserErrors {
					code
					field
					message
				}
				customer {
					id
				}
			}
		}
	`;

	const response = await axios.post(
		API_URL,
		{
			query: print(customer),
			variables: {
				id,
				input: {
					activationToken,
					password
				}
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

	if (
		response.data.data.customerActivate.customerUserErrors[0].code ===
		'ALREADY_ENABLED'
	) {
		throw new Error(
			response.data.data.customerActivate.customerUserErrors[0].message
		);
	}

	return res.status(200).json({
		success: true,
		message: 'We have sent you an email to confirm'
	});
};

const checkToken = async (req: NextApiRequest, res: NextApiResponse) => {
	const accessToken = req.headers.accesstoken;

	if (accessToken) {
		const { data } = await axios.post(
			API_URL,
			{
				query: `
          query {
          customer(customerAccessToken: ${JSON.stringify(accessToken)}) {
            id
            firstName
            lastName
            acceptsMarketing
            email
            phone
            createdAt
            defaultAddress {id address1 address2  city company country zip province phone}
            addresses(first:250) {
               edges{
                 node{
                   id
                   address1
                   address2
                   city
                   company
                   country
                   firstName
                   lastName
                   province
                   zip
                   phone
                 }
               }
            }
            orders(first:250) {
              edges {
                node{
                  id
                  orderNumber
                  email
                  name
                  phone
                  totalPrice {
                    amount
                    currencyCode
                  }
                  totalShippingPrice {
                    amount
                    currencyCode
                  }
                  totalTax {
                    amount
                    currencyCode
                  }
                  totalRefunded{
                    amount
                    currencyCode
                  }
                  lineItems(first:250){
                      edges{
                        node{
                          currentQuantity
                          quantity
                          title
						  originalTotalPrice { 
							amount
							currencyCode
						  }
                          variant {
                            id
                            image {
                              id
                              height
                              width
                              url
                              altText
                            }
                            price {
                              amount
                              currencyCode
                            }
                            product {
                              id
                              handle
                              title
                              totalInventory
                              availableForSale
                              description
                              images(first:250){
                                edges { 
                                  node {
                                      id
                                      width
                                      height
                                      url
                                  }
                                }
                              }
                              updatedAt
                              createdAt
                            }
                            quantityAvailable
                            title
                          }
                        }
                      }
                  }
                  processedAt
                }
              }
            }
            
          }
        }
         `
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'X-Shopify-Storefront-Access-Token':
						process.env.SHOPIFY_STOREFRONT_API_TOKEN
				}
			}
		);

		if (!data.data.customer) {
			throw new Error('Customer not found');
		}

		return res.status(200).json({
			success: true,
			message: '',
			user: data.data.customer
		});
	} else {
		throw new Error();
	}
};

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
	let accessToken = req.headers.accesstoken;

	const deletedAccessToken = gql`
		mutation customerAccessTokenDelete($customerAccessToken: String!) {
			customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
				deletedAccessToken
				deletedCustomerAccessTokenId
				userErrors {
					field
					message
				}
			}
		}
	`;

	const response = await axios.post(
		API_URL,
		{
			query: print(deletedAccessToken),
			variables: {
				customerAccessToken: accessToken
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
	if (!response.data.data.customerAccessTokenDelete) {
		throw new Error('Access Token not valid');
	}

	return res.status(200).json({
		success: true,
		message: 'Logout successfully!'
	});
};

const register = async (req: NextApiRequest, res: NextApiResponse) => {
	let data = req.body;

	const createCustomer = gql`
		mutation customerCreate($input: CustomerCreateInput!) {
			customerCreate(input: $input) {
				customerUserErrors {
					code
					field
					message
				}
				customer {
					id
					firstName
					lastName
					acceptsMarketing
					defaultAddress {
						address1
						address2
						city
						company
						country
						province
						zip
					}
					createdAt
				}
			}
		}
	`;

	if (!data.email) {
		throw new Error('Please enter an email');
	}
	if (!data.password) {
		throw new Error('Please enter an password');
	}

	if (data.password.length < 8) {
		throw new Error(
			'Please enter an password must be greater than 8 characters'
		);
	}

	if (!validator.isEmail(data.email)) {
		throw new Error('Please enter a valid email');
	}

	const response = await axios.post(
		API_URL,
		{
			query: print(createCustomer),
			variables: {
				input: {
					email: data.email,
					password: data.password,
					firstName: data.firstName,
					lastName: data.lastName
				}
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

	if (!response.data.data.customerCreate) {
		throw new Error(
			'Account already exists check your email for confirmation '
		);
	}

	if (
		response.data.data.customerCreate?.customerUserErrors[0] &&
		response.data.data.customerCreate?.customerUserErrors[0].code === 'TAKEN'
	) {
		throw new Error('Account already exists check your email for confirmation');
	}

	return res.status(201).json({
		success: true,
		message: `Account created successfully!`,
		response: response.data.data.customerCreate.customer
	});
};

const authController = {
	login,
	activate,
	checkToken,
	logout,
	register
};

export default authController;
