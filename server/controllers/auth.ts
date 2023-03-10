import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

import gql from 'graphql-tag';

import { print } from 'graphql';

import { z } from 'zod';
//const Multipassify = require('multipassify');

const login = async (req: NextApiRequest, res: NextApiResponse) => {
	const input = z
		.object({
			email: z.string().email(),
			password: z.string().min(5)
		})
		.parse(req.body);

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
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
		{
			query: print(customer),
			variables: {
				input: {
					email: input.email,
					password: input.password
				}
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN,
				'accept-encoding': 'null'
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
	const input = z
		.object({
			activationUrl: z.string(),
			password: z.string().min(8)
		})
		.parse(req.body);

	const customer = gql`
		mutation customerActivateByUrl($activationUrl: URL!, $password: String!) {
			customerActivateByUrl(
				activationUrl: $activationUrl
				password: $password
			) {
				customer {
					id
				}
				customerAccessToken {
					accessToken
					expiresAt
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
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
		{
			query: print(customer),
			variables: {
				activationUrl: input.activationUrl,
				password: input.password
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN,
				'accept-encoding': 'null'
			}
		}
	);

	if (response.data.data.customerActivateByUrl.customerUserErrors.length) {
		throw new Error(
			response.data.data.customerActivateByUrl.customerUserErrors[0].message
		);
	}

	return res.status(200).json({
		success: true,
		message: "You're account is activated successfully",
		user: response.data.data.customerActivateByUrl
	});
};

const checkToken = async (
	req: NextApiRequest & { params: Record<string, any> },
	res: NextApiResponse
) => {
	const accessToken = req.headers.accesstoken;

	//const {checkoutId , checkoutKey} = req.params
	if (accessToken) {
		const { data } = await axios.post(
			`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
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
				  cancelReason
				  canceledAt
				  edited
				  financialStatus
				  fulfillmentStatus
				  statusUrl
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
						process.env.SHOPIFY_STOREFRONT_API_TOKEN,
					'accept-encoding': 'null'
				}
			}
		);

		if (!data.data.customer) {
			throw new Error('Customer not found');
		}

		// Construct the Multipassify encoder
		//	const multipassify = new Multipassify(process.env.SHOPIFY_MULTIPASS_TOKEN);

		//let customerData = {email: data.data.customer.email , return_to:`https://${process.env.DOMAINE}/60096020703/checkouts/$${checkoutId}?key=${checkoutKey}`};
		//multipassify.encode(customerData);
		//const checkoutUrl = multipassify.generateUrl(customerData,process.env.DOMAINE);

		return res.status(200).json({
			success: true,
			message: '',
			user: data.data.customer
			//checkoutUrl
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
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
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
					process.env.SHOPIFY_STOREFRONT_API_TOKEN,
				'accept-encoding': 'null'
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
	const input = z
		.object({
			acceptsMarketing: z.boolean(),
			email: z.string().email(),
			phone: z.string().optional(),
			password: z.string().min(8),
			firstName: z.string().min(2),
			lastName: z.string().min(2)
		})
		.parse(req.body);

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

	const response = await axios.post(
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
		{
			query: print(createCustomer),
			variables: {
				input: {
					acceptsMarketing: input.acceptsMarketing,
					email: input.email,
					password: input.password,
					firstName: input.firstName,
					lastName: input.lastName,
					phone: input.phone
				}
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN,
				'accept-encoding': 'null'
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
